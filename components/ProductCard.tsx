"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";
import { useState } from "react";

interface ProductProps {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  images: string[];
  currency: string;
  stockQty?: number | null;
  sku?: string | null;
}

const ProductCard = ({id, slug, title, description, price, images, currency = "USD", stockQty, sku}: ProductProps) => {

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
                  image: images?.[0] ? `/images/${images[0]}` : "/images/placeholder.png",
            });

            toast.success("Product added to cart ✅");

            setAdded(true);
            window.setTimeout(() => setAdded(false), 900);
      };

  return (
      <div className='group transition-all duration-500 border rounded-md shadow-xs hover:shadow-lg hover:border-blue-400 p-2 relative'>
            <Link href={`/product/${slug}`}>
                  <div className='w-full overflow-hidden flex flex-col items-center justify-center bg-blue-100 rounded-md h-32 md:h-44'>
                        <Image src={images?.[0] ? `/images/${images[0]}` : "/images/placeholder.png"} alt='product images' 
                        priority width={0} height={0} sizes='100vw'className='object-cover w-[35%] sm:w-[40%] md:w-[50%] lg:w-[60%]' />
                  </div>
                  <div className='py-6 px-5'>
                        <div className='flex justify-between items-center mt-2'>
                              <h5 className='text-lg capitalize'>{title}</h5>
                              <Heart size={18} />
                        </div>
                        <p className='text-gray-500 mt-3 text-sm line-clamp-1'>{description}</p>
                  </div>
            
                  <div className='flex justify-between gap-2 items-center px-5 pb-4'>
                        <div>
                              <h5 className='mt-2 text-base max-w-fit'>
                                    {price.toFixed(2)}{" "}
                                    <span className="text-black font-bold text-base">{currency}</span>
                              </h5>

                              {typeof stockQty === "number" && (
                                    <p className="mt-1 text-xs text-gray-500">
                                          {stockQty > 0 ? `${stockQty} in stock` : "Out of stock"}
                                    </p>
                              )}
                        </div>
                        <div>
                              <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={typeof stockQty === "number" && stockQty <= 0}
                                    className={`border rounded py-3 px-6 text-white transition-all duration-300 cursor-pointer
                                    ${
                                    typeof stockQty === "number" && stockQty <= 0
                                          ? "bg-gray-400 cursor-not-allowed"
                                          : "bg-black hover:bg-black/75"
                                    }`}
                              >
                                    <h5 className="text-xs">{added ? "Added ✓" : "Add to cart"}</h5>
                              </button>
                        </div>
                  </div>
            </Link>
      </div>
  )
}

export default ProductCard
