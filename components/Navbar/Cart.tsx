"use client"

import { ShoppingCart } from 'lucide-react';
import { useCart } from "@/hooks/use-cart";

export function Cart({openCart}: {openCart: () => void}) {

  const {count} = useCart();

  return (
    <>
    <div className="group" onClick={openCart}>
      <div className='relative cursor-pointer'>
              <div className='flex flex-col items-center group gap-1'>
                <div className='p-3 shadow-xl shadow-blue-500/30 backdrop-blur-md px-1.5 py-2 rounded-md bg-white hover:bg-gray-200 transition-all duration-300'>
                  <i><ShoppingCart className='size-4 md:size-5 text-black/50' /></i>
                </div>
                {/* <h5 className="text-xs md:text-sm group-hover:underline transition-all duration-500 font-medium text-black">Cart</h5> */}
              </div>
              {count > 0 && (
              <h5 className='absolute text-[10px] md:text-xs font-semibold -top-3 md:-top-4 -right-3 bg-blue-400 text-white px-2 md:px-2.25 py-1 rounded-full'>
                <span>{count}</span>
              </h5>
              )}
      </div>
    </div>
    </>
  )
}

