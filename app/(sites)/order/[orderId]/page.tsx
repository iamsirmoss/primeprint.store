import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { startStripeCheckoutAction } from "@/actions/start-stripe-checkout-action";
import { cancelOrderAction } from "@/actions/cancel-order-action";

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 2,
  }).format((cents || 0) / 100);
}

export default async function OrderReviewPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      status: true,
      currency: true,
      subtotalCents: true,
      taxCents: true,
      discountCents: true,
      totalCents: true,
      createdAt: true,
      items: {
        select: {
          id: true,
          type: true,
          quantity: true,
          unitPriceCents: true,
          currency: true,
          titleSnapshot: true,
          customization: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!order) return notFound();

  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-20 h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl xs:text-3xl lg:text-5xl font-bold">Order review</h1>
        <p className="text-sm text-gray-500">
          Order ID: <span className="font-mono">{order.id}</span> • Status:{" "}
          <span className="font-semibold">{order.status}</span>
        </p>
      </div>

      {order.status === "PAID" && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          ✅ Payment confirmed. Thank you!
        </div>
      )}

      {order.status !== "PAID" && (
        <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
          ⏳ Payment pending. If you just paid, refresh in a few seconds.
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_420px]">
        {/* Items */}
        <div className="rounded-xl border bg-white p-5">
          <h2 className="text-lg font-bold">Items</h2>

          <div className="mt-4 space-y-3">
            {order.items.map((it) => {
              const lineTotal = it.unitPriceCents * it.quantity;
              return (
                <div
                  key={it.id}
                  className="flex items-start justify-between gap-4 rounded-lg border p-4"
                >
                  <div>
                    <p className="font-semibold capitalize">{it.titleSnapshot}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Type: {it.type} • Qty: {it.quantity}
                    </p>

                    {/* Billing display (for packages) */}
                    {it.customization && typeof it.customization === "object" && (
                      <p className="mt-1 text-xs text-gray-500">
                        {("billing" in it.customization && it.customization.billing)
                          ? `Billing: ${String(it.customization.billing).toUpperCase()}`
                          : null}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {formatMoney(it.unitPriceCents, it.currency)} each
                    </p>
                    <p className="mt-1 font-bold">
                      {formatMoney(lineTotal, it.currency)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href="/cart"
              className="w-1/2 rounded-lg border py-3 text-center font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Back to cart
            </Link>

            {order.status === "PAID" ? (
              <button
                type="button"
                className="w-1/2 rounded-lg bg-gray-200 py-3 font-semibold text-gray-600 cursor-not-allowed"
                disabled
              >
                Already paid
              </button>
            ) : order.status === "CANCELED" ? (
              <button
                type="button"
                className="w-1/2 rounded-lg bg-gray-200 py-3 font-semibold text-gray-600 cursor-not-allowed"
                disabled
              >
                Canceled
              </button>
            ) : (
              <div className="w-1/2 flex gap-3">
                {/* ✅ Cancel order */}
                <form action={cancelOrderAction} className="w-1/2">
                  <input type="hidden" name="orderId" value={order.id} />
                  <button
                    type="submit"
                    className="w-full rounded-lg border py-3 font-semibold hover:bg-red-50 border-red-300 transition-all duration-300 cursor-pointer text-red-600"
                  >
                    Cancel
                  </button>
                </form>

                {/* ✅ Stripe checkout */}
                <form action={startStripeCheckoutAction} className="w-1/2">
                  <input type="hidden" name="orderId" value={order.id} />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-black py-3 font-semibold text-white hover:bg-black/75 transition-all duration-300 cursor-pointer"
                  >
                    Pay with Stripe
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border bg-white p-5">
          <h2 className="text-lg font-bold">Summary</h2>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">
                {formatMoney(order.subtotalCents, order.currency)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">
                {formatMoney(order.taxCents, order.currency)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="font-semibold">
                -{formatMoney(order.discountCents, order.currency)}
              </span>
            </div>

            <div className="pt-3 mt-3 border-t flex items-center justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg">
                {formatMoney(order.totalCents, order.currency)}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
