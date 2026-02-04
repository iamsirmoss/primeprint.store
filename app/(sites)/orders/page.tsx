import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format((cents || 0) / 100);
}

export default async function OrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      status: true,
      currency: true,
      totalCents: true,
      createdAt: true,
      paidAt: true,
      items: { select: { id: true }, take: 1 },
      _count: { select: { items: true } },
    },
    take: 25,
  });

  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-20 min-h-screen">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl xs:text-3xl lg:text-5xl font-bold">My orders</h1>
          <p className="mt-2 text-sm text-gray-500">
            Your recent orders and payment status.
          </p>
        </div>

        <Link
          href="/cart"
          className="rounded-lg border px-5 py-3 font-semibold hover:bg-gray-100 transition-all duration-300"
        >
          Go to cart
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-xl border bg-white p-10 text-center text-gray-600">
          No orders yet.
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {orders.map((o) => (
            <Link
              key={o.id}
              href={`/order/${o.id}`}
              className="block rounded-xl border bg-white p-5 hover:shadow-sm hover:border-gray-400 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-semibold">
                    Order <span className="font-mono text-sm">{o.id}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {new Date(o.createdAt).toLocaleString()}
                    {" • "}
                    {o._count.items} item(s)
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold">
                    {formatMoney(o.totalCents, o.currency)}
                  </div>
                  <div className="mt-1 text-sm">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        o.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : o.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
