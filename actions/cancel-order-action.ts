"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function cancelOrderAction(formData: FormData): Promise<void> {
  const orderId = String(formData.get("orderId") || "");
  if (!orderId) throw new Error("Missing orderId");

  // auth
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true, userId: true, status: true },
  });

  if (!order) throw new Error("Order not found");
  if (order.userId !== userId) throw new Error("Unauthorized");
  if (order.status === "PAID") throw new Error("You can’t cancel a paid order.");

  // ✅ cancel only if not already canceled
  if (order.status !== "CANCELED") {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELED" },
    });
  }

  // ✅ redirect back (ou vers /orders)
  redirect(`/order/${orderId}?canceled=1`);
}
