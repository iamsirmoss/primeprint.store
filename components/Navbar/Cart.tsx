"use client"

import { RiShoppingCartFill } from "react-icons/ri";
import { useCart } from "@/hooks/use-cart";

export function Cart({openCart}: {openCart: () => void}) {

  const {count} = useCart();

  return (
    <>
    <div className="group" onClick={openCart}>
      <div className='relative cursor-pointer transition-all duration-300'>
              <div className='flex flex-col items-center text-xs group gap-1.5 md:gap-1'>
                <i><RiShoppingCartFill className='text-black/90 text-[23px] md:text-[25px] mt-0.5 group-hover:text-black transition-all duration-500' /></i>
                <h5 className="text-xs md:text-sm group-hover:underline transition-all duration-500 font-medium text-black">Cart</h5>
              </div>
              {count > 0 && (
              <h5 className='absolute text-[10px] md:text-xs font-semibold -top-3 md:-top-4 -right-3 bg-blue-400 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-full'>
                <span>{count}</span>
              </h5>
              )}
      </div>
    </div>
    </>
  )
}

