"use client";

import CardBox from "@/components/Admin/shared/CardBox";

interface ProductDescriptionCardProps {
  shortDescription: string | null;
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

const ProductDescriptionCard = ({
  shortDescription,
  description,
  seoTitle,
  seoDescription,
}: ProductDescriptionCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <h2 className="text-lg font-semibold mb-4">Description & SEO</h2>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground">Short Description</p>
          <p className="mt-1 whitespace-pre-wrap">
            {shortDescription || "—"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Description</p>
          <p className="mt-1 whitespace-pre-wrap">{description || "—"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">SEO Title</p>
          <p className="mt-1">{seoTitle || "—"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">SEO Description</p>
          <p className="mt-1 whitespace-pre-wrap">{seoDescription || "—"}</p>
        </div>
      </div>
    </CardBox>
  );
};

export default ProductDescriptionCard;