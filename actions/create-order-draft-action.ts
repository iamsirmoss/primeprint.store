"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SellableType } from "@/lib/generated/prisma/enums";

type CheckoutItem =
  | { type: "PRODUCT"; productId: string; qty: number }
  | { type: "PACKAGE"; packageId: string; qty: number; billing: "month" | "year" };

type Payload = { items: CheckoutItem[] };

const toCents = (n: number) => Math.round(n * 100);

export async function createOrderDraftAction(payload: Payload) {
  // ✅ auth
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  if (!payload?.items?.length) throw new Error("Cart is empty");

  // ✅ build order items from DB (trust DB, not localStorage)
  let currency = "USD";
  let subtotalCents = 0;

  const orderItems: Array<{
    type: SellableType;
    quantity: number;
    unitPriceCents: number;
    currency: string;
    titleSnapshot: string;
    productId?: string | null;
    packageId?: string | null;
    customization?: any;
  }> = [];

  const productQtyById = new Map<string, number>();

  for (const it of payload.items) {
    if (it.type === "PRODUCT") {
      const qty = Math.max(1, Math.floor(it.qty || 1));
      productQtyById.set(it.productId, (productQtyById.get(it.productId) ?? 0) + qty);
    }
  }

  for (const it of payload.items) {
    const qty = Math.max(1, Math.floor(it.qty || 1));

    if (it.type === "PRODUCT") {
      const p = await prisma.product.findUnique({
        where: { id: it.productId },
        select: {
          id: true,
          title: true,
          price: true,
          currency: true,
          isActive: true,
          stockQty: true, // ✅ ADD
        },
      });

      if (!p || !p.isActive) throw new Error("A product is not available.");

      // ✅ STOCK CHECK
      const requested = productQtyById.get(it.productId) ?? qty;
      const available = p.stockQty ?? 0;

      if (available < requested) {
        throw new Error(
          `"${p.title}" has only ${available} left (you requested ${requested}).`
        );
      }

      currency = p.currency ?? "USD";
      const unitPriceCents = toCents(p.price);
      subtotalCents += unitPriceCents * qty;

      orderItems.push({
        type: SellableType.PRODUCT,
        quantity: qty,
        unitPriceCents,
        currency,
        titleSnapshot: p.title,
        productId: p.id,
        packageId: null,
      });
    }

    if (it.type === "PACKAGE") {
      const pkg = await prisma.package.findUnique({
        where: { id: it.packageId },
        select: {
          id: true,
          name: true,
          currency: true,
          priceByMonth: true,
          priceByYear: true,
          isActive: true,
        },
      });
      if (!pkg || !pkg.isActive) throw new Error("A package is not available.");

      currency = pkg.currency ?? "USD";

      const price =
        it.billing === "month" ? pkg.priceByMonth : pkg.priceByYear;

      if (!price || price <= 0) throw new Error("Package price invalid.");

      const unitPriceCents = toCents(price);
      subtotalCents += unitPriceCents * qty;

      orderItems.push({
        type: SellableType.PACKAGE,
        quantity: qty,
        unitPriceCents,
        currency,
        titleSnapshot: `${pkg.name} (${it.billing === "month" ? "Monthly" : "Yearly"})`,
        productId: null,
        packageId: pkg.id,
        customization: { billing: it.billing },
      });
    }
  }

  // ✅ for now: no tax/discount
  const taxCents = 0;
  const discountCents = 0;
  const totalCents = subtotalCents + taxCents - discountCents;

  // ✅ create order draft
  const order = await prisma.order.create({
    data: {
      userId,
      status: "PENDING",
      currency,
      subtotalCents,
      taxCents,
      discountCents,
      totalCents,
      items: {
        create: orderItems.map((x) => ({
          type: x.type,
          quantity: x.quantity,
          unitPriceCents: x.unitPriceCents,
          currency: x.currency,
          productId: x.productId ?? null,
          packageId: x.packageId ?? null,
          titleSnapshot: x.titleSnapshot,
          customization: x.customization ?? undefined,
        })),
      },
    },
    select: { id: true },
  });

  return { orderId: order.id };
}
