"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import {
  decQty,
  incQty,
  removeFromCart,
  isPackageItem,
  removePackageFromCart,
  incPackageQty,
  decPackageQty,
} from "@/lib/cart";
import { createOrderDraftAction } from "@/actions/create-order-draft-action";
import { useRouter } from "next/navigation";
import Link from "next/link";


  export default function CartClient() {

    const { items, totals } = useCart();
    const router = useRouter();

    const currencyKeys = Object.keys(totals);

    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-32">
              <p className="text-gray-500">Your cart is empty.</p>
              <Link href="/shop">
                  <button
                    className="bg-red-500 text-white rounded px-10 py-5 shadow transition-all duration-300 hover:bg-blue-400 cursor-pointer text-lg font-medium mt-4"
                  >
                    Go to shop
                  </button>
              </Link>
        </div>
    );
  }

  const badgeClass = (isPkg: boolean) =>
    isPkg
      ? "bg-black text-white"
      : "bg-white text-gray-800 border border-gray-200";

  return (
    <div className="py-20 grid gap-6 md:grid-cols-[1fr_580px]">
      {/* Items */}
      <div className="space-y-4">
        {items.map((it) => {
          const isPkg = isPackageItem(it);

          const key = isPkg ? `${it.packageId}-${it.billing}` : it.productId;
          const title = isPkg ? it.name : it.title;
          const currency = it.currency ?? "USD";
          const unitPrice = isPkg ? it.unitPrice : it.price;

          return (
            <div
              key={key}
              className="flex gap-4 rounded-lg bg-slate-100 p-4 hover:shadow-md transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={it.image || "/images/placeholder.png"}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                                <div className="font-semibold capitalize">{title}</div>

                                <span
                                  className={`text-[10px] px-2 py-1 rounded-full font-semibold ${badgeClass(isPkg)}`}
                                >
                                  {isPkg ? "PACKAGE" : "PRODUCT"}
                                </span>

                                {isPkg && (
                                  <span className="text-[10px] px-2 py-1 rounded-full font-semibold bg-white text-gray-700 border border-gray-200">
                                    {it.billing === "month" ? "MONTHLY" : "YEARLY"}
                                  </span>
                                )}
                              </div>
                    {isPkg ? (
                      <>
                        <div className="text-sm text-gray-500">
                          {it.tier} • {it.billing === "month" ? "Monthly" : "Yearly"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {unitPrice.toFixed(2)} {currency}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-500">
                        {unitPrice.toFixed(2)} {currency}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (isPkg) {
                        removePackageFromCart(it.packageId, it.billing);
                        toast.success("Package removed from cart");
                      } else {
                        removeFromCart(it.productId);
                        toast.success("Product removed from cart");
                      }
                    }}
                    className="rounded-md p-2 bg-white"
                    aria-label="Remove"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4 text-red-500 hover:text-black transition-all duration-300" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between flex-wrap gap-4">
                  {/* Qty controls */}
                  <div className="inline-flex items-center gap-2 rounded-lg border bg-white px-2 py-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (isPkg) decPackageQty(it.packageId, it.billing);
                        else decQty(it.productId);
                      }}
                      className="rounded-md p-2 hover:bg-gray-100"
                      aria-label="Decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="min-w-8 text-center font-semibold">{it.qty}</span>

                    <button
                      type="button"
                      onClick={() => {
                        if (isPkg) incPackageQty(it.packageId, it.billing);
                        else incQty(it.productId);
                      }}
                      className="rounded-md p-2 hover:bg-gray-100"
                      aria-label="Increase"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="font-bold">
                    {(unitPrice * it.qty).toFixed(2)} {currency}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="h-fit rounded-lg border bg-white p-5">
        <h2 className="text-lg font-bold">Summary</h2>

        <div className="mt-4 space-y-2 text-sm">
          {currencyKeys.map((cur) => (
            <div key={cur} className="flex items-center justify-between">
              <span>Subtotal ({cur})</span>
              <span className="font-semibold">{totals[cur].toFixed(2)} {cur}</span>
            </div>
          ))}
        </div>

        {/* <button
          type="button"
          className="mt-5 w-full rounded bg-black py-3 text-sm font-semibold text-white hover:bg-black/75 transition-all duration-500 cursor-pointer"
          onClick={async () => {
            try {
              const payload = {
                items: items.map((it) =>
                  isPackageItem(it)
                    ? { type: "PACKAGE" as const, packageId: it.packageId, qty: it.qty, billing: it.billing }
                    : { type: "PRODUCT" as const, productId: it.productId, qty: it.qty }
                ),
              };

              const { orderId } = await createOrderDraftAction(payload);

              // ✅ redirige vers une page review avant Stripe
              router.push(`/order/${orderId}`);
              toast.success("Order created ✅");
            } catch (e: any) {
              toast.error(e?.message ?? "Failed to create order");
            }
          }}
        >
          Checkout
        </button> */}
        <Link href="/checkout">
            <button
              className="mt-5 w-full rounded-md bg-black py-3 text-sm font-semibold text-white hover:bg-black/75 transition-all duration-500 cursor-pointer"
            >
              Checkout
            </button>
        </Link>
      </div>
    </div>
  );
}
