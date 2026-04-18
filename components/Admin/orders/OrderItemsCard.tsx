// components/Admin/orders/OrderItemsCard.tsx
"use client";

import CardBox from "@/components/Admin/shared/CardBox";
import FulfillmentBadge from "./FulfillmentBadge";
import ProofStatusBadge from "./ProofStatusBadge";

interface OrderItemsCardProps {
  items: Array<{
    id: string;
    type: string;
    quantity: number;
    unitPriceCents: number;
    totalPriceCents: number;
    currency: string;
    titleSnapshot: string;
    skuSnapshot?: string | null;
    uploadedFiles: string[];
    fulfillmentStatus: any;
    product?: {
      title?: string | null;
    } | null;
    productVariant?: {
      name?: string | null;
      sku?: string | null;
    } | null;
    package?: {
      name?: string | null;
    } | null;
    proofApprovals?: Array<{
      id: string;
      status: any;
      fileUrl: string;
      customerNote?: string | null;
      message?: string | null;
      createdAt: Date | string;
    }>;
  }>;
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

const OrderItemsCard = ({ items }: OrderItemsCardProps) => {
  return (
    <CardBox className="p-5">
      <h2 className="text-lg font-semibold mb-4">Order Items</h2>

      <div className="space-y-5">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items found.</p>
        ) : (
          items.map((item, index) => {
            const latestProof = item.proofApprovals?.[0];

            return (
              <div
                key={item.id}
                className={`rounded-xl border p-4 ${index !== items.length - 1 ? "" : ""}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-2 min-w-0">
                    <h3 className="font-semibold wrap-break-word">
                      {item.titleSnapshot ||
                        item.product?.title ||
                        item.package?.name ||
                        "Untitled Item"}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs rounded-md bg-muted px-2 py-1">
                        {item.type}
                      </span>
                      <FulfillmentBadge status={item.fulfillmentStatus} />
                      {latestProof ? (
                        <ProofStatusBadge status={latestProof.status} />
                      ) : null}
                    </div>

                    {item.productVariant?.name ? (
                      <p className="text-sm text-muted-foreground">
                        Variant: {item.productVariant.name}
                      </p>
                    ) : null}

                    {item.skuSnapshot || item.productVariant?.sku ? (
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.skuSnapshot || item.productVariant?.sku}
                      </p>
                    ) : null}

                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} • Unit:{" "}
                      {formatCurrency(item.unitPriceCents, item.currency)}
                    </p>

                    <p className="text-sm font-medium">
                      Line Total: {formatCurrency(item.totalPriceCents, item.currency)}
                    </p>
                  </div>

                  <div className="text-sm space-y-2 lg:text-right">
                    <div>
                      <p className="text-muted-foreground">Uploads</p>
                      <p className="font-medium">{item.uploadedFiles.length}</p>
                    </div>

                    {latestProof ? (
                      <div>
                        <p className="text-muted-foreground">Latest Proof</p>
                        <p className="font-medium">{latestProof.status}</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {item.uploadedFiles.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Uploaded Files</p>
                    <div className="space-y-2">
                      {item.uploadedFiles.map((fileUrl, fileIndex) => (
                        <a
                          key={`${item.id}-file-${fileIndex}`}
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-sm text-primary hover:underline break-all"
                        >
                          {fileUrl}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}

                {latestProof ? (
                  <div className="mt-4 rounded-lg bg-muted/50 p-3 space-y-2">
                    <p className="text-sm font-medium">Latest Proof Details</p>

                    <a
                      href={latestProof.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sm text-primary hover:underline break-all"
                    >
                      {latestProof.fileUrl}
                    </a>

                    {latestProof.message ? (
                      <p className="text-sm text-muted-foreground">
                        Admin note: {latestProof.message}
                      </p>
                    ) : null}

                    {latestProof.customerNote ? (
                      <p className="text-sm text-muted-foreground">
                        Customer note: {latestProof.customerNote}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </CardBox>
  );
};

export default OrderItemsCard;