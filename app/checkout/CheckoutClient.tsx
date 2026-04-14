"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  PackageCheck,
} from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { isPackageItem } from "@/lib/cart";
import { createOrderDraftAction } from "@/actions/create-order-draft-action";
import { startStripeCheckoutAction } from "@/actions/start-stripe-checkout-action";

function formatMoney(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export default function CheckoutClient({ userEmail }: { userEmail: string }) {
  const { items, totals, count } = useCart();
  const [loading, setLoading] = useState(false);

  const currencyKeys = Object.keys(totals);

  const payload = useMemo(() => {
    return {
      items: items.map((it) => {
        if (isPackageItem(it)) {
          return {
            type: "PACKAGE" as const,
            packageId: it.packageId,
            qty: it.qty,
            billing: it.billing,
          };
        }

        return {
          type: "PRODUCT" as const,
          productId: it.productId,
          qty: it.qty,
        };
      }),
    };
  }, [items]);

  async function handleCheckout() {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const { orderId } = await createOrderDraftAction(payload);

      const fd = new FormData();
      fd.set("orderId", orderId);
      await startStripeCheckoutAction(fd);
    } catch (e: any) {
      toast.error(e?.message ?? "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-white/70 px-6 py-16 text-center backdrop-blur-xl">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 shadow-inner">
          <ShoppingBag className="h-9 w-9 text-blue-600" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          Your cart is empty
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
          Add some products or service packages before proceeding to checkout.
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

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_430px]">
      {/* Left: Items */}
      <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 md:text-xl">
              Your items
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review your order before secure payment.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
            <PackageCheck className="h-4 w-4" />
            {count} item{count > 1 ? "s" : ""}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {items.map((it) => {
            const pkg = isPackageItem(it);
            const title = pkg ? it.name : it.title;
            const unit = pkg ? it.unitPrice : it.price;
            const cur = it.currency ?? "USD";

            return (
              <div
                key={pkg ? `${it.packageId}-${it.billing}` : `${it.productId}-${it.slug}`}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:border-slate-200 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold capitalize text-slate-900 md:text-base">
                        {title}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${
                          pkg
                            ? "bg-slate-900 text-white"
                            : "border border-blue-200 bg-blue-50 text-blue-700"
                        }`}
                      >
                        {pkg ? "PACKAGE" : "PRODUCT"}
                      </span>
                    </div>

                    {pkg && (
                      <p className="mt-1 text-xs capitalize text-slate-500 md:text-sm">
                        {it.serviceSlug} • {it.subServiceTitle}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] md:text-xs">
                      {pkg && (
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600">
                          {it.tier} • {it.billing === "month" ? "Monthly" : "Yearly"}
                        </span>
                      )}

                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600">
                        Qty: {it.qty}
                      </span>

                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600">
                        {formatMoney(unit, cur)} / unit
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Total
                    </p>
                    <div className="mt-1 whitespace-nowrap text-sm font-extrabold text-slate-900 md:text-base">
                      {formatMoney(unit * it.qty, cur)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Summary */}
      <div className="h-fit rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-lg backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
            <p className="mt-1 text-sm text-slate-500">
              Secure checkout powered by Stripe.
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
              <span className="text-sm font-semibold text-slate-700">
                Estimated total
              </span>
              <span className="text-base font-extrabold text-slate-900">
                {currencyKeys.length === 1
                  ? formatMoney(totals[currencyKeys[0]], currencyKeys[0])
                  : "Calculated at checkout"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Account email
          </p>
          <p className="mt-1 break-all text-sm font-medium text-slate-800">
            {userEmail || "—"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
            loading
              ? "cursor-not-allowed bg-slate-400"
              : "cursor-pointer bg-slate-900 hover:-translate-y-0.5 hover:bg-slate-800"
          }`}
        >
          <CreditCard className="h-4 w-4" />
          {loading ? "Redirecting..." : "Pay with Stripe"}
        </button>

        <Link href="/cart">
          <button className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-200 hover:text-blue-600">
            Back to cart
          </button>
        </Link>

        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
          <p className="text-sm font-medium text-blue-900">
            Safe and secure payment
          </p>
          <p className="mt-1 text-xs leading-5 text-blue-700">
            You will be redirected to Stripe to complete your payment securely.
          </p>
        </div>
      </div>
    </div>
  );
}