"use client";

import Image from "next/image";
import CardBox from "@/components/Admin/shared/CardBox";

interface ProductGalleryCardProps {
  title: string;
  images: {
    id: string;
    url: string;
    alt: string | null;
  }[];
}

function normalizeImage(url?: string | null) {
  if (!url) return "/images/products/s1.jpg";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return url;
  return `/images/${url}`;
}

const ProductGalleryCard = ({ title, images }: ProductGalleryCardProps) => {
  const mainImage = normalizeImage(images[0]?.url);

  return (
    <CardBox className="p-5 h-full">
      <h2 className="text-lg font-semibold mb-4">Gallery</h2>

      <div className="space-y-4">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
          <Image
            src={mainImage}
            alt={images[0]?.alt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {images.length > 1 ? (
          <div className="grid grid-cols-4 gap-3">
            {images.slice(1, 5).map((image) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
              >
                <Image
                  src={normalizeImage(image.url)}
                  alt={image.alt || title}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </CardBox>
  );
};

export default ProductGalleryCard;