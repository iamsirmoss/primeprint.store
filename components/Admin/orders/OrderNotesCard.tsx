// components/Admin/orders/OrderNotesCard.tsx
"use client";

import CardBox from "@/components/Admin/shared/CardBox";

interface OrderNotesCardProps {
  notes?: string | null;
  invoicePdfUrl?: string | null;
  invoiceSentAt?: Date | string | null;
  couponUsages?: Array<{
    id: string;
    discountCents: number;
    coupon: {
      code: string;
      name: string;
    };
  }>;
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

const OrderNotesCard = ({
  notes,
  invoicePdfUrl,
  invoiceSentAt,
  couponUsages = [],
}: OrderNotesCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <h2 className="text-lg font-semibold mb-4">Notes & Invoice</h2>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground">Notes</p>
          <p className="mt-1 font-medium whitespace-pre-wrap">
            {notes || "No notes available."}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Invoice PDF</p>
          {invoicePdfUrl ? (
            <a
              href={invoicePdfUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block text-primary hover:underline break-all"
            >
              {invoicePdfUrl}
            </a>
          ) : (
            <p className="mt-1 font-medium">No invoice file</p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground">Invoice Sent At</p>
          <p className="mt-1 font-medium">
            {invoiceSentAt
              ? new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(invoiceSentAt))
              : "Not sent"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground mb-2">Coupons</p>
          {couponUsages.length === 0 ? (
            <p className="font-medium">No coupon used</p>
          ) : (
            <div className="space-y-2">
              {couponUsages.map((usage) => (
                <div key={usage.id} className="rounded-lg border p-3">
                  <p className="font-medium">
                    {usage.coupon.code} — {usage.coupon.name}
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Discount: {formatCurrency(usage.discountCents)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CardBox>
  );
};

export default OrderNotesCard;