import Image from "next/image";
import Link from "next/link";
import React from "react";
import {motion} from "motion/react"

interface CardProps {
  title: string;
  description: string;
  imageUrl: any;
  price: number;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, price }) => {
  return (
      <Link href={'/'}>
            <div className="group relative w-full rounded-lg bg-white p-5 hover:scale-95 transition-all duration-500">
                  {/* Image Section */}
                  <div className="relative w-[80%] md:w-1/2 lg:w-full overflow-hidden">
                  <Image src={imageUrl} alt='image1' priority width={0} height={0} sizes='100vw'
                        className='object-cover transition-transform duration-500 rounded-sm w-[35%]' />
                  </div>

                  {/* Content Section */}
                  <div className="mt-2">
                        <div className="flex items-end justify-between">
                              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                              <p className="mt-2 text-lg font-bold text-gray-800">${price}.00</p>
                        </div>
                        <p className="mt-2 text-base text-gray-600">{description}</p>
                        <div className="flex items-center justify-end">
                              <button className="mt-3 bg-red-500 rounded py-4 px-5 hover:bg-black transition-all duration-300">
                                    <h5 className="text-sm text-white">Add to cart</h5>
                              </button>
                        </div>
                  </div>
            </div>
      </Link>
  );
};

export default Card;
