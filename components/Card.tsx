"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";
import { useState } from "react";

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

const Card: React.FC<CardProps> = ({ id, slug, title, description, imageUrl, price, currency = "USD", stockQty, sku, isActive = true }) => {

      const [added, setAdded] = useState(false);
      
            const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
      
                  // ✅ stock check
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
                        image: imageUrl?.[0] ? `/images/${imageUrl[0]}` : "/images/placeholder.png",
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
                        {/* Image Section */}
                        <div className="relative w-full sm:w-[80%] md:w-1/2 lg:w-full overflow-hidden">
                        <Image src={imageUrl?.[0] ? `/images/${imageUrl[0]}` : "/images/placeholder.png"} alt='product image' priority width={0} height={0} sizes='100vw'
                              className='object-cover transition-transform duration-500 rounded-sm w-[25%]' />
                        </div>

                        {/* Content Section */}
                        <div className="mt-2">
                              <div className="flex items-end justify-between">
                                    <h3 className="text-xl font-bold text-gray-800 capitalize">{title}</h3>
                                    <h5 className='mt-2 text-base max-w-fit'>
                                          {price.toFixed(2)}{" "}
                                          <span className="text-black font-bold text-base">{currency}</span>
                                    </h5>
                              </div>
                              {typeof stockQty === "number" && (
                                    <p className="mt-2 text-xs text-gray-500">
                                          {stockQty > 0 ? `${stockQty} in stock` : "Out of stock"}
                                    </p>
                              )}
                              {isOutOfStock && (
                                    <span className="mt-2 inline-block text-xs font-semibold text-red-600">
                                          Out of stock
                                    </span>
                              )}
                        </div>

                        {/* <div className="absolute bottom-3 right-5">
                              <button className="mt-3 border border-black rounded-md py-2 px-5 md:py-3 md:px-8 bg-black text-white hover:bg-black/75 transition-all duration-300 cursor-pointer">
                                    <h5 className="text-sm">Add to cart</h5>
                              </button>
                        </div> */}
                        <div className="mt-5">
                              <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock}
                                    className={`border rounded py-3 px-10 text-white transition-all duration-300
                                    ${
                                          isOutOfStock
                                          ? "bg-gray-400 cursor-not-allowed"
                                          : "bg-black hover:bg-black/75 cursor-pointer"
                                    }`}
                              >
                                          <h5 className="text-xs">
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
