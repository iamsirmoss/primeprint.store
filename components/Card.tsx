"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";
import { RiShoppingCartFill } from "react-icons/ri";

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
}) => {
  const [added, setAdded] = useState(false);

  const resolvedImage =
    imageUrl?.[0] && imageUrl[0].startsWith("http")
      ? imageUrl[0]
      : imageUrl?.[0]
      ? `/images/${imageUrl[0]}`
      : "/images/placeholder.png";

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof stockQty === "number" && stockQty <= 0) {
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

  const safeStockQty = stockQty ?? 0;
  const isOutOfStock = !isActive || safeStockQty <= 0;

  return (
    <div className="relative">
      <Link href={`/product/${slug}`}>
        <div className="group relative w-full rounded-lg bg-white p-5 border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-500">
          <div className="relative w-full h-[90px] sm:w-[80%] md:w-1/2 lg:w-full overflow-hidden">
            <Image
              src={resolvedImage}
              alt={title || "product image"}
              priority
              width={500}
              height={500}
              className="object-cover transition-transform duration-500 rounded-sm w-[30%] xl:w-[25%] h-full"
            />
          </div>

          <div className="mt-2">
            <div className="sm:flex items-end justify-between block">
              <h3 className="text-base md:text-lg font-bold text-black capitalize">
                {title}
              </h3>
              <h5 className="mt-2 text-sm md:text-base max-w-fit">
                {(price / 100).toFixed(2)}{" "}
                <span className="text-black font-bold text-base">{currency}</span>
              </h5>
            </div>

            {isOutOfStock && (
              <span className="mt-2 inline-block text-xs font-semibold text-red-600">
                Out of stock
              </span>
            )}
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`border rounded-2xl py-3 px-10 transition-all duration-300 flex items-center gap-2 justify-center ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-black/75 cursor-pointer"
              }`}
            >
              <i>
                <RiShoppingCartFill className="text-white text-sm" />
              </i>
              <h5 className="text-xs text-white">
                {isOutOfStock ? "Out of stock" : added ? "Added ✓" : "Add to cart"}
              </h5>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;