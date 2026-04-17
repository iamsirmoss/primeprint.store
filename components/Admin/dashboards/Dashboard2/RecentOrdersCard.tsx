"use client";

import CardBox from "../../shared/CardBox";

interface RecentOrderItem {
  id: string;
  orderNumber: string;
  customerName?: string | null;
  user?: {
    name?: string | null;
  } | null;
  status: string;
  totalCents: number;
  currency: string;
  createdAt: Date;
}

interface RecentOrdersCardProps {
  orders: RecentOrderItem[];
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

const RecentOrdersCard = ({ orders }: RecentOrdersCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-3 pr-4">Order</th>
              <th className="py-3 pr-4">Customer</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Total</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-slate-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0">
                  <td className="py-3 pr-4 font-medium">{order.orderNumber}</td>
                  <td className="py-3 pr-4">
                    {order.customerName || order.user?.name || "Guest"}
                  </td>
                  <td className="py-3 pr-4">{order.status}</td>
                  <td className="py-3 pr-4">
                    {formatCurrency(order.totalCents, order.currency)}
                  </td>
                  <td className="py-3">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(order.createdAt))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </CardBox>
  );
};

export default RecentOrdersCard;