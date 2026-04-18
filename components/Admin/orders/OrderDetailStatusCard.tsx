// components/Admin/orders/OrderDetailStatusCard.tsx
"use client";

import CardBox from "@/components/Admin/shared/CardBox";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderDetailStatusCardProps {
  orderNumber: string;
  status: string;
  totalCents: number;
  currency: string;
  paymentProvider?: string | null;
  paymentRef?: string | null;
  invoiceNumber?: string | null;
  paidAt?: Date | string | null;
  createdAt: Date | string;
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

const OrderDetailStatusCard = ({
  orderNumber,
  status,
  totalCents,
  currency,
  paymentProvider,
  paymentRef,
  invoiceNumber,
  paidAt,
  createdAt,
}: OrderDetailStatusCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Order Number</p>
          <h2 className="text-2xl font-bold mt-1">{orderNumber}</h2>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <div className="mt-2">
            <OrderStatusBadge status={status as any} />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <h3 className="text-xl font-semibold mt-1">
            {formatCurrency(totalCents, currency)}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Created At</p>
            <p className="mt-1 font-medium">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(createdAt))}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Paid At</p>
            <p className="mt-1 font-medium">
              {paidAt
                ? new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(paidAt))
                : "Not paid yet"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Payment Provider</p>
            <p className="mt-1 font-medium">{paymentProvider || "N/A"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Payment Ref</p>
            <p className="mt-1 font-medium break-all">{paymentRef || "N/A"}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-muted-foreground">Invoice Number</p>
            <p className="mt-1 font-medium">{invoiceNumber || "N/A"}</p>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default OrderDetailStatusCard;