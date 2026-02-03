"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/hooks/use-cart";
import { isPackageItem } from "@/lib/cart";
import { createOrderDraftAction } from "@/actions/create-order-draft-action";
import { startStripeCheckoutAction } from "@/actions/start-stripe-checkout-action";

export default function CheckoutClient({ userEmail }: { userEmail: string }) {
  const { items, totals, count } = useCart();
  const [loading, setLoading] = useState(false);

  const currencyKeys = Object.keys(totals);

  // ✅ Build payload for server action (trust DB on server)
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

      // 1) create draft order in DB
      const { orderId } = await createOrderDraftAction(payload);

      // 2) redirect to Stripe Checkout (server action)
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
      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_540px]">
      {/* Left: Items */}
      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-lg font-bold">Your items</h2>
        <p className="text-sm text-gray-500 mt-1">{count} item(s)</p>

        <div className="mt-4 space-y-3">
          {items.map((it) => {
            const pkg = isPackageItem(it);
            const title = pkg ? it.name : it.title;
            const unit = pkg ? it.unitPrice : it.price;
            const cur = it.currency ?? "USD";

            return (
              <div
                key={pkg ? `${it.packageId}-${it.billing}` : `${it.productId}-${it.slug}`}
                className="flex items-start justify-between gap-3 rounded-lg border p-4"
              >
                <div>
                  <div className="font-semibold capitalize">{title}</div>
                  {pkg && (
                      <p className="text-xs text-slate-500 mb-2 capitalize">
                        {it.serviceSlug} • {it.subServiceTitle}
                      </p>
                  )}
                  <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-2">
                    <span className="rounded-full border px-2 py-1">
                      {pkg ? "PACKAGE" : "PRODUCT"}
                    </span>
                    {pkg && (
                      <span className="rounded-full border px-2 py-1">
                        {it.tier} • {it.billing === "month" ? "Monthly" : "Yearly"}
                      </span>
                    )}
                    <span className="rounded-full border px-2 py-1">
                      Qty: {it.qty}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    {unit.toFixed(2)} {cur} / unit
                  </div>
                </div>

                <div className="font-bold whitespace-nowrap">
                  {(unit * it.qty).toFixed(2)} {cur}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Summary */}
      <div className="h-fit rounded-xl border bg-white p-5">
        <h2 className="text-lg font-bold">Summary</h2>

        <div className="mt-4 space-y-2 text-sm">
          {currencyKeys.map((cur) => (
            <div key={cur} className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal ({cur})</span>
              <span className="font-semibold">
                {totals[cur].toFixed(2)} {cur}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
          Email : <span className="font-semibold">{userEmail || "—"}</span>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className={`mt-5 w-full rounded-md py-3 text-sm font-semibold text-white transition-all duration-300 cursor-pointer ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-black/75"
          }`}
        >
          {loading ? "Redirecting..." : "Pay with Stripe"}
        </button>

        <p className="mt-2 text-xs text-gray-500">
          Secure checkout powered by Stripe.
        </p>
      </div>
    </div>
  );
}
