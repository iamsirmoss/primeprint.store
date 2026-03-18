"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, CheckCircle2, AlertCircle, ShieldCheck, Upload, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";
import { useMemo, useState } from "react";
import { RiShoppingCartFill } from "react-icons/ri";

interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  basePriceCents?: number;
  compareAtPriceCents?: number | null;
  images: string[];
  currency: string;
  stockQty?: number | null;
  lowStockThreshold?: number | null;
  sku?: string | null;
  isActive?: boolean;
  isFeatured?: boolean;
  requiresUpload?: boolean;
  requiresApproval?: boolean;
  requiresAppointment?: boolean;
  type?: string;
  salesChannel?: string;
  category?: {
    name: string;
    slug: string;
  } | null;
  service?: {
    title: string;
    slug: string;
  } | null;
  ratingAverage?: number | null;
  reviewCount?: number;
}

const formatMoney = (amountInCents: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountInCents / 100);
};

const ProductCard = ({
  id,
  slug,
  title,
  description,
  price,
  compareAtPriceCents,
  images,
  currency = "USD",
  stockQty,
  lowStockThreshold,
  sku,
  isActive = true,
  isFeatured = false,
  requiresUpload = false,
  requiresApproval = false,
  requiresAppointment = false,
  category,
  service,
  ratingAverage = null,
  reviewCount = 0,
}: ProductCardProps) => {
  const [added, setAdded] = useState(false);

  // const resolvedImage =
  //   images?.[0] && images[0].startsWith("http")
  //     ? images[0]
  //     : images?.[0]
  //     ? `/images/${images[0]}`
  //     : "/images/placeholder.png";

  const resolvedImage =
  images?.[0]
    ? images[0].startsWith("http") || images[0].startsWith("/")
      ? images[0]
      : `/images/${images[0]}`
    : "/images/placeholder.png";

  const safeStockQty = stockQty ?? 0;
  const isOutOfStock = !isActive || safeStockQty <= 0;
  const isLowStock =
    typeof stockQty === "number" &&
    typeof lowStockThreshold === "number" &&
    stockQty > 0 &&
    stockQty <= lowStockThreshold;

  const discountPercent = useMemo(() => {
    if (!compareAtPriceCents || compareAtPriceCents <= price) return null;
    return Math.round(((compareAtPriceCents - price) / compareAtPriceCents) * 100);
  }, [compareAtPriceCents, price]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) {
      toast.error("Out of stock");
      return;
    }

    addToCart({
      productId: id,
      slug,
      sku: sku ?? null,
      title,
      price,
      currency,
      image: resolvedImage,
    });

    toast.success("Product added to cart ✅");
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  return (
    <Link
      href={`/product/${slug}`}
      className="group block overflow-hidden rounded-md border border-b-black bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative">
        <div className="relative h-56 w-full overflow-hidden bg-gray-50">
          <Image
            src={resolvedImage}
            alt={title || "product image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {isFeatured && (
            <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}

          {discountPercent && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              -{discountPercent}%
            </span>
          )}

          {isOutOfStock && (
            <span className="rounded-full bg-gray-700 px-3 py-1 text-xs font-semibold text-white">
              Out of stock
            </span>
          )}
        </div>

        <button
          type="button"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toast.success("Added to wishlist soon ✨");
          }}
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="space-y-4 px-4 py-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {category?.name && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">
                {category.name}
              </span>
            )}
            {service?.title && (
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                {service.title}
              </span>
            )}
          </div>

          <h3 className="line-clamp-1 text-base font-semibold text-gray-900 md:text-lg">
            {title}
          </h3>

          <p className="line-clamp-2 text-sm text-gray-500">
            {description}
          </p>
        </div>

        {(ratingAverage || reviewCount > 0) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star size={15} className="fill-current" />
              <span className="font-medium">
                {ratingAverage ? ratingAverage.toFixed(1) : "0.0"}
              </span>
            </div>
            <span>({reviewCount} reviews)</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          {requiresUpload && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
              <Upload size={13} />
              Upload required
            </span>
          )}

          {requiresApproval && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
              <ShieldCheck size={13} />
              Approval needed
            </span>
          )}

          {requiresAppointment && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
              <CalendarDays size={13} />
              Appointment
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-gray-900">
                {formatMoney(price, currency)}
              </p>

              {compareAtPriceCents && compareAtPriceCents > price && (
                <p className="text-sm text-gray-400 line-through">
                  {formatMoney(compareAtPriceCents, currency)}
                </p>
              )}
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1 text-red-500">
                  <AlertCircle size={14} />
                  Out of stock
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1 text-orange-500">
                  <AlertCircle size={14} />
                  Low stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-green-600">
                  <CheckCircle2 size={14} />
                  In stock
                </span>
              )}

              {sku && <span className="text-gray-400">SKU: {sku}</span>}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-white transition-all duration-300 ${
              isOutOfStock
                ? "cursor-not-allowed bg-gray-400"
                : "bg-black hover:bg-black/80"
            }`}
          >
            <RiShoppingCartFill className="text-sm" />
            {isOutOfStock ? "Unavailable" : added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;