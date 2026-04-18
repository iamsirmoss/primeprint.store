// components/Admin/orders/OrdersTable.tsx
"use client";

import Link from "next/link";
import CardBox from "@/components/Admin/shared/CardBox";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrdersTableProps {
  orders: Array<{
    id: string;
    orderNumber: string;
    customerName?: string | null;
    customerEmail?: string | null;
    status: string;
    totalCents: number;
    currency: string;
    createdAt: Date | string;
    items: Array<{ id: string; quantity: number }>;
    user?: {
      name?: string | null;
      email?: string | null;
    } | null;
  }>;
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <CardBox className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Orders List</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="text-left border-b">
              <th className="py-3 pr-4">Order</th>
              <th className="py-3 pr-4">Customer</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Items</th>
              <th className="py-3 pr-4">Total</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-muted-foreground">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0">
                  <td className="py-3 pr-4 font-medium">{order.orderNumber}</td>

                  <td className="py-3 pr-4">
                    <div className="space-y-1">
                      <p>{order.customerName || order.user?.name || "Guest"}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.customerEmail || order.user?.email || "No email"}
                      </p>
                    </div>
                  </td>

                  <td className="py-3 pr-4">
                    <OrderStatusBadge status={order.status as any} />
                  </td>

                  <td className="py-3 pr-4">{order.items.length}</td>

                  <td className="py-3 pr-4">
                    {formatCurrency(order.totalCents, order.currency)}
                  </td>

                  <td className="py-3 pr-4">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(order.createdAt))}
                  </td>

                  <td className="py-3 pr-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      View
                    </Link>
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

export default OrdersTable;