import Image from "next/image";
import Link from "next/link";
import React from "react";
import {motion} from "motion/react"

interface CardProps {
  slug: string;
  title: string;
  description: string | null;
  imageUrl: string[];
  price: number;
}

const Card: React.FC<CardProps> = ({ slug, title, description, imageUrl, price }) => {
  return (
      <div className="relative">
            <Link href={`/product/${slug}`}>
                  <div className="group relative w-full rounded-lg bg-white p-5 border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-500 pb-16">
                        {/* Image Section */}
                        <div className="relative w-full sm:w-[80%] md:w-1/2 lg:w-full overflow-hidden">
                        <Image src={imageUrl?.[0] ? `/images/${imageUrl[0]}` : "/images/placeholder.png"} alt='product image' priority width={0} height={0} sizes='100vw'
                              className='object-cover transition-transform duration-500 rounded-sm w-[25%]' />
                        </div>

                        {/* Content Section */}
                        <div className="mt-2">
                              <div className="flex items-end justify-between">
                                    <h3 className="text-xl font-bold text-gray-800 capitalize">{title}</h3>
                                    <p className="mt-2 text-lg font-bold text-gray-800">${price}.00</p>
                              </div>
                              <p className="mt-2 text-base text-gray-600">{}</p>
                        </div>
                  </div>
            </Link>
            <div className="absolute bottom-3 right-5">
                  <button className="mt-3 border border-black rounded-md py-2 px-5 md:py-3 md:px-8 bg-black text-white hover:bg-black/75 transition-all duration-300 cursor-pointer">
                        <h5 className="text-sm">Add to cart</h5>
                  </button>
            </div>
      </div>
  );
};

export default Card;
