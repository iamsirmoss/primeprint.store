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
import Link from "next/link";

function formatMoney(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export default function CartClient() {
  const { items, totals } = useCart();

  const currencyKeys = Object.keys(totals);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-gray-500">Your cart is empty.</p>
        <Link href="/shop">
          <button className="mt-4 cursor-pointer rounded-2xl bg-red-500 px-10 py-3 text-lg font-medium text-white shadow transition-all duration-300 hover:bg-blue-400">
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
    <div className="grid gap-6 py-20 md:grid-cols-[1fr_580px]">
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
              className="flex gap-4 rounded-2xl bg-slate-100 p-4 transition-all duration-500 hover:shadow-md"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={it.image || "/images/placeholder.png"}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    {isPkg && (
                      <p className="mb-1 text-xs capitalize text-slate-500">
                        {it.serviceSlug} • {it.subServiceTitle}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="font-semibold capitalize text-black">
                        {title}
                      </div>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${badgeClass(
                          isPkg
                        )}`}
                      >
                        {isPkg ? "PACKAGE" : "PRODUCT"}
                      </span>

                      {isPkg && (
                        <span className="rounded-full border border-gray-200 bg-white px-2 py-1 text-[10px] font-semibold text-gray-700">
                          {it.billing === "month" ? "MONTHLY" : "YEARLY"}
                        </span>
                      )}
                    </div>

                    {isPkg ? (
                      <>
                        <div className="mt-1 text-sm text-gray-500">
                          {it.tier} •{" "}
                          {it.billing === "month" ? "Monthly" : "Yearly"}
                        </div>

                        <div className="mt-1 text-sm text-gray-500">
                          {formatMoney(unitPrice, currency)}
                        </div>
                        {/* {it.serviceSlug && (
                          <div className="mt-2">
                            <Link
                              href={`/service/sub-service/${it.serviceSlug}`}
                              className="text-xs font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
                            >
                              View package
                            </Link>
                          </div>
                        )} */}
                      </>
                    ) : (
                      <>
                        <div className="mt-1 text-sm text-gray-500">
                          {formatMoney(unitPrice, currency)}
                        </div>

                        {it.sku ? (
                          <div className="mt-1 text-xs text-gray-500">
                            SKU: <span className="font-medium">{it.sku}</span>
                          </div>
                        ) : null}

                        {/* {"slug" in it && it.slug ? (
                          <div className="mt-2">
                            <Link
                              href={`/product/${it.slug}`}
                              className="text-xs font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
                            >
                              View product
                            </Link>
                          </div>
                        ) : null} */}
                      </>
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
                    className="rounded-md bg-white p-2"
                    aria-label="Remove"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4 text-red-500 transition-all duration-300 hover:text-black" />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-2xl border bg-white px-2 py-1">
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

                    <span className="min-w-8 text-center font-semibold">
                      {it.qty}
                    </span>

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

                  <div className="font-bold text-black">
                    {formatMoney(unitPrice * it.qty, currency)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="h-fit rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-bold">Summary</h2>

        <div className="mt-4 space-y-2 text-sm">
          {currencyKeys.map((cur) => (
            <div key={cur} className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-black">
                {formatMoney(totals[cur], cur)}
              </span>
            </div>
          ))}
        </div>

        <Link href="/checkout">
          <button className="mt-5 w-full cursor-pointer rounded-2xl bg-black py-3 text-sm font-semibold text-white transition-all duration-500 hover:bg-black/75">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}