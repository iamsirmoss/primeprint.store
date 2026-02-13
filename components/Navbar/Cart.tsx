"use client"

import { TiShoppingCart } from "react-icons/ti"
import { useCart } from "@/hooks/use-cart";

export function Cart({openCart}: {openCart: () => void}) {

  const {count} = useCart();

  return (
    <>
    <div className="group" onClick={openCart}>
      <div className='relative cursor-pointer transition-all duration-300'>
              <div className='flex flex-col items-center text-xs group'>
                <i><TiShoppingCart className='text-black text-2xl group-hover:text-black/45 transition-all duration-500' /></i>
                <h5 className="text-xs md:text-sm group-hover:text-black/45 transition-all duration-500 font-semibold">Cart</h5>
              </div>
              {count > 0 && (
              <h5 className='absolute text-xs font-semibold -top-4 -right-3 bg-blue-400 text-white px-2 py-1 rounded-full'>
                <span>{count}</span>
              </h5>
              )}
      </div>
    </div>
    </>
  )
}

