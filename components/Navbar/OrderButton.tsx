"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const OrderButton = () => {

      const link = [
            {
                  name: 'Order now',
                  path: '/order'
            }
      ]

      const pathName = usePathname()

  return (
      <Link href='/order' className='hidden sm:block'>
            {link.map((item, index) => (
                        <button key={index} className={`${item.path === pathName && "bg-red-700"}
                        font-medium bg-red-500 py-2 px-4 md:py-4 md:px-10 rounded 
                        hover:scale-95 hover:bg-blue-400 transition-all duration-300 shadow-[rgba(13,38,76,0.19)_0px_9px_20px] cursor-pointer
                        `}>
                              <h5 className='text-white'>{item.name}</h5>
                        </button>
            ))}
      </Link>
  )
}

export default OrderButton
