"use client";

import CardBox from "@/components/Admin/shared/CardBox";

interface ProductOverviewCardProps {
  title: string;
  slug: string;
  type: string;
  currency: string;
  stockQty: number | null;
  lowStockThreshold: number | null;
  basePriceCents: number | null;
  category?: string | null;
  service?: string | null;
}

function formatCurrency(cents: number | null | undefined, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format((cents ?? 0) / 100);
}

const ProductOverviewCard = ({
  title,
  slug,
  type,
  currency,
  stockQty,
  lowStockThreshold,
  basePriceCents,
  category,
  service,
}: ProductOverviewCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <h2 className="text-lg font-semibold mb-4">Overview</h2>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-muted-foreground">Title</p>
          <p className="font-medium mt-1">{title}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Slug</p>
          <p className="font-medium mt-1 break-all">{slug}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="font-medium mt-1">{type}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Base Price</p>
            <p className="font-medium mt-1">
              {formatCurrency(basePriceCents, currency)}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Stock</p>
            <p className="font-medium mt-1">{stockQty ?? "∞"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Low Stock Threshold</p>
            <p className="font-medium mt-1">{lowStockThreshold ?? "—"}</p>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground">Category</p>
          <p className="font-medium mt-1">{category || "—"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Service</p>
          <p className="font-medium mt-1">{service || "—"}</p>
        </div>
      </div>
    </CardBox>
  );
};

export default ProductOverviewCard;