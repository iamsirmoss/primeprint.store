"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavNormal = () => {
      const links = [
            {
                  name: "Home",
                  path: "/"
            },
            
            {
                  name: "Services",
                  path: "/services"
            },
            {
                  name: "Shop",
                  path: "/shop"
            },
            {
                  name: "About us",
                  path: "/about-us"
            },
            {
                  name: "Contact",
                  path: "/contact"
            },
      ]
      const pathName = usePathname()

  return (
      <div className='hidden xl:flex items-center gap-10 text-[16px]'>
            {links.map((link, index) => (
                  <Link key={index} href={link.path} className={`${link.path === pathName && `text-blue-400 
                  scale-110 transition-all duration-300`}
                  font-semibold hover:text-blue-400 hover:scale-95 transition-all duration-300
                  `}>
                        <h5>{link.name}</h5>
                  </Link>
            ))}
      </div>
  )
}

export default NavNormal
