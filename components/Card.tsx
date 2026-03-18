"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";
import { RiShoppingCartFill } from "react-icons/ri";
import { ArrowUpRight, Heart } from "lucide-react";

interface CardProps {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  imageUrl: string[];
  price: number;
  currency: string;
  stockQty?: number | null;
  sku?: string | null;
  isActive?: boolean;
  isFeatured?: boolean;
  compareAtPrice?: number | null;
  compareAtPriceCents?: number | null;
}

const Card: React.FC<CardProps> = ({
  id,
  slug,
  title,
  description,
  imageUrl,
  price,
  currency = "USD",
  stockQty,
  sku,
  isActive = true,
  isFeatured = false,
  compareAtPrice = null,
}) => {
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  const resolvedImage =
    imageUrl?.[0]
      ? imageUrl[0].startsWith("http") || imageUrl[0].startsWith("/")
        ? imageUrl[0]
        : `/images/${imageUrl[0]}`
      : "/images/placeholder.png";

  const safeStockQty = stockQty ?? 0;
  const isOutOfStock = !isActive || safeStockQty <= 0;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price / 100);

  const formattedCompareAtPrice =
    compareAtPrice && compareAtPrice > price
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
        }).format(compareAtPrice / 100)
      : null;

  const discountPercent = useMemo(() => {
    if (!compareAtPrice || compareAtPrice <= price) return null;
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  }, [compareAtPrice, price]);

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
    window.setTimeout(() => setAdded(false), 1000);
  };

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
    toast.success(!liked ? "Added to wishlist ❤️" : "Removed from wishlist");
  };

  return (
    <div className="w-full h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-gray-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-gray-300">
        <div className="relative p-4">
          <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
            {isFeatured && (
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-ss font-semibold text-blue-700">
                Featured
              </span>
            )}

            {discountPercent && (
              <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-ss font-semibold text-red-600">
                -{discountPercent}%
              </span>
            )}

            {isOutOfStock && (
              <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-ss font-semibold text-red-600">
                Out of stock
              </span>
            )}
          </div>

          <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={handleWishlist}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white"
              aria-label="Add to wishlist"
            >
              <Heart
                size={18}
                className={
                  liked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }
              />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-sm backdrop-blur transition-all duration-300 group-hover:scale-105">
              <ArrowUpRight size={17} className="text-gray-700" />
            </div>
          </div>

          <Link href={`/product/${slug}`} className="block">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-slate-50 via-white to-slate-100">
              <div className="flex h-[260px] items-center justify-center p-6 sm:h-[280px]">
                <Image
                  src={resolvedImage}
                  alt={title || "product image"}
                  width={700}
                  height={700}
                  priority
                  className="max-h-[220px] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-1">
          <Link href={`/product/${slug}`} className="block">
            <div className="flex items-start justify-between gap-3">
              <h3 className="line-clamp-1 text-base font-bold tracking-tight text-gray-900 md:text-lg capitalize">
                {title}
              </h3>

              <div className="shrink-0 text-right">
                <p className="text-lg font-extrabold tracking-tight text-black">
                  {formattedPrice}
                </p>
                {formattedCompareAtPrice && (
                  <p className="text-xs text-gray-400 line-through">
                    {formattedCompareAtPrice}
                  </p>
                )}
              </div>
            </div>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
              {description || "Premium quality product designed for clean and professional results."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {!isOutOfStock ? (
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-ss font-medium text-green-700">
                  In stock
                </span>
              ) : (
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-ss font-medium text-red-600">
                  Unavailable
                </span>
              )}

              {sku && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-ss text-gray-500">
                  SKU: {sku}
                </span>
              )}
            </div>
          </Link>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
                isOutOfStock
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-black hover:bg-gray-800 active:scale-[0.98]"
              }`}
            >
              <RiShoppingCartFill className="text-base" />
              <span>
                {isOutOfStock
                  ? "Out of stock"
                  : added
                  ? "Added ✓"
                  : "Add to cart"}
              </span>
            </button>

            <Link
              href={`/product/${slug}`}
              className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;