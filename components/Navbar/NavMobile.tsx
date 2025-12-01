"use client"

import { RiCloseFill, RiMenu3Fill, RiMessage2Fill } from "react-icons/ri";
import React, { useState } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMobile = () => {

      const [open, setOpen] = useState<Boolean>(false)

      const toggle = () => {
      setOpen(!open)
      }

      const pathName = usePathname()

      const links = [
            {
                  name: "home",
                  path: "/"
            },
            
            {
                  name: "services",
                  path: "/services"
            },
            {
                  name: "shop",
                  path: "/shop"
            },
            {
                  name: "about us",
                  path: "/about-us"
            },
            {
                  name: "contact",
                  path: "/contact"
            },
            {
                  name: "order",
                  path: "/order"
            },
      ]

  return (
      <div className='xl:hidden block fixed top-0 left-0 right-0 z-50 bg-blue-400 shadow-md'>
            <div className="flex items-center justify-between px-4 py-1">
                  <p className="text-gray-700">.</p>
                  <button className='text-white cursor-pointer'>
                        <div onClick={toggle}>
                              {
                                    open ? <RiCloseFill color='white' className='text-lg' /> : 
                                    <RiMenu3Fill color='white' className='text-lg' />
                              }
                              
                        </div>
                  </button>
            </div>
            <div className={`absolute shadow-sm transition-all duration-500 
                  ${open ? `top-8 bg-white min-h-fit left-0 bottom-0 right-0 z-50 transition-all duration-500 ease-in-out` 
                  : 'left-[-800px]'}`}
            >
                  <div className="flex flex-col items-start justify-start overflow-y-auto h-screen pb-4">
                        {links.map((link, index) => (
                              <Link
                              key={index} href={link.path} className={`${link.path === pathName && "text-white bg-blue-400"}
                              font-light capitalize hover:-translate-x-2 transition-all duration-300 text-[16px] w-full 
                              `}>
                                    <h5 className="px-4 py-3" onClick={toggle}>{link.name}</h5>
                              </Link>
                        ))}
                  </div>
            </div>
      </div>
  )
}

export default NavMobile
