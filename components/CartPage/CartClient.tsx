"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
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
      <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-white/70 px-6 py-16 text-center backdrop-blur-xl">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 shadow-inner">
          <ShoppingBag className="h-9 w-9 text-blue-600" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          Your cart is empty
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
          You haven&apos;t added any products or packages yet. Start browsing
          and add what you need to continue.
        </p>

        <Link href="/shop">
          <button className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30">
            Go to shop
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    );
  }

  const badgeClass = (isPkg: boolean) =>
    isPkg
      ? "border border-slate-900/10 bg-slate-900 text-white"
      : "border border-blue-200 bg-blue-50 text-blue-700";

  return (
    <div className="grid gap-8 py-4 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_430px]">
      {/* Items */}
      <div className="space-y-5">
        {items.map((it) => {
          const isPkg = isPackageItem(it);

          const key = isPkg ? `${it.packageId}-${it.billing}` : it.productId;
          const title = isPkg ? it.name : it.title;
          const currency = it.currency ?? "USD";
          const unitPrice = isPkg ? it.unitPrice : it.price;

          return (
            <div
              key={key}
              className="group rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 sm:h-28 sm:w-28">
                  <Image
                    src={it.image || "/images/placeholder.png"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="112px"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      {isPkg && (
                        <p className="mb-1 text-xs font-medium capitalize tracking-wide text-slate-500">
                          {it.serviceSlug} • {it.subServiceTitle}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold capitalize text-slate-900 md:text-lg">
                          {title}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${badgeClass(
                            isPkg
                          )}`}
                        >
                          {isPkg ? "PACKAGE" : "PRODUCT"}
                        </span>

                        {isPkg && (
                          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold tracking-wide text-slate-600">
                            {it.billing === "month" ? "MONTHLY" : "YEARLY"}
                          </span>
                        )}
                      </div>

                      {isPkg ? (
                        <>
                          <div className="mt-2 text-sm text-slate-500">
                            {it.tier} •{" "}
                            {it.billing === "month" ? "Monthly billing" : "Yearly billing"}
                          </div>

                          <div className="mt-2 text-sm font-medium text-slate-700">
                            {formatMoney(unitPrice, currency)}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mt-2 text-sm font-medium text-slate-700">
                            {formatMoney(unitPrice, currency)}
                          </div>

                          {it.sku ? (
                            <div className="mt-1 text-xs text-slate-500">
                              SKU: <span className="font-semibold">{it.sku}</span>
                            </div>
                          ) : null}
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove"
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-2 py-1.5 shadow-sm">
                      <button
                        type="button"
                        onClick={() => {
                          if (isPkg) decPackageQty(it.packageId, it.billing);
                          else decQty(it.productId);
                        }}
                        className="rounded-xl p-2 text-slate-600 transition hover:bg-white hover:text-slate-900"
                        aria-label="Decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-10 text-center text-sm font-bold text-slate-900">
                        {it.qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          if (isPkg) incPackageQty(it.packageId, it.billing);
                          else incQty(it.productId);
                        }}
                        className="rounded-xl p-2 text-slate-600 transition hover:bg-white hover:text-slate-900"
                        aria-label="Increase"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Total
                      </p>
                      <div className="text-lg font-extrabold text-slate-900 md:text-xl">
                        {formatMoney(unitPrice * it.qty, currency)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="h-fit rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-lg backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
            <p className="mt-1 text-sm text-slate-500">
              Review your totals before checkout.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        <div className="mt-6 space-y-3 rounded-2xl bg-slate-50/80 p-4">
          {currencyKeys.map((cur) => (
            <div key={cur} className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-bold text-slate-900">
                {formatMoney(totals[cur], cur)}
              </span>
            </div>
          ))}

          <div className="border-t border-slate-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Estimated total</span>
              <span className="text-base font-extrabold text-slate-900">
                {currencyKeys.length === 1
                  ? formatMoney(totals[currencyKeys[0]], currencyKeys[0])
                  : "Calculated at checkout"}
              </span>
            </div>
          </div>
        </div>

        <Link href="/checkout">
          <button className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-red-500 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600">
            Proceed to checkout
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>

        <Link href="/shop">
          <button className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-200 hover:text-blue-600">
            Continue shopping
          </button>
        </Link>

        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
          <p className="text-sm font-medium text-blue-900">
            Need to make changes?
          </p>
          <p className="mt-1 text-xs leading-5 text-blue-700">
            You can update quantities or remove items before completing your
            order.
          </p>
        </div>
      </div>
    </div>
  );
}