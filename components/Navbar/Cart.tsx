"use client"

import { TiShoppingCart } from "react-icons/ti"


export function Cart({openCart}: {openCart: () => void}) {

  return (
    <>
    <div className="group" onClick={openCart}>
      <div className='relative cursor-pointer transition-all duration-300'>
              <i><TiShoppingCart className='text-black text-2xl md:text-3xl hover:text-blue-400 transition-all duration-500' /></i>
              <h5 className='absolute text-xs font-semibold -top-4 -right-3 bg-red-500 text-white px-1.5 py-0.5 rounded-full'>
                <span>0</span>
              </h5>
      </div>
    </div>
    </>
  )
}

