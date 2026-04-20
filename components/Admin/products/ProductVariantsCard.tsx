"use client";

import CardBox from "@/components/Admin/shared/CardBox";

interface VariantItem {
  id: string;
  name: string;
  sku: string | null;
  priceCents: number | null;
  stockQty: number | null;
  isDefault: boolean;
  isActive: boolean;
}

interface ProductVariantsCardProps {
  currency: string;
  variants: VariantItem[];
}

function formatCurrency(cents: number | null | undefined, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format((cents ?? 0) / 100);
}

const ProductVariantsCard = ({
  currency,
  variants,
}: ProductVariantsCardProps) => {
  return (
    <CardBox className="p-5">
      <h2 className="text-lg font-semibold mb-4">Variants</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 pr-4">Name</th>
              <th className="text-left py-3 pr-4">SKU</th>
              <th className="text-left py-3 pr-4">Price</th>
              <th className="text-left py-3 pr-4">Stock</th>
              <th className="text-left py-3 pr-4">Default</th>
              <th className="text-left py-3">Active</th>
            </tr>
          </thead>

          <tbody>
            {variants.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-muted-foreground">
                  No variants found.
                </td>
              </tr>
            ) : (
              variants.map((variant) => (
                <tr key={variant.id} className="border-b last:border-b-0">
                  <td className="py-3 pr-4 font-medium">{variant.name}</td>
                  <td className="py-3 pr-4">{variant.sku || "—"}</td>
                  <td className="py-3 pr-4">
                    {formatCurrency(variant.priceCents, currency)}
                  </td>
                  <td className="py-3 pr-4">{variant.stockQty ?? "∞"}</td>
                  <td className="py-3 pr-4">
                    {variant.isDefault ? "Yes" : "No"}
                  </td>
                  <td className="py-3">{variant.isActive ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </CardBox>
  );
};

export default ProductVariantsCard;