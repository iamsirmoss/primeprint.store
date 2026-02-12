"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import image1 from '@/public/images/NEW.png'
import NavNormal from './NavNormal'
import NavMobile from './NavMobile'
import OrderButton from './OrderButton'
import TopNav from './TopNav'
import Search from './Search'
import CartItem from './CartItem'
import SessionOrNot from './SessionOrNot'
import { usePathname } from 'next/navigation'

const Navbar = () => {

      const [isSticky, setIsSticky] = useState(false);

      const pathname = usePathname()

      const isHome = pathname === '/'

      useEffect(() => {
      const handleScroll = () => {
            if (window.scrollY > 100) {
            setIsSticky(true);
            } else {
            setIsSticky(false);
            }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
            window.removeEventListener('scroll', handleScroll);
      };
      }, []);

  return (
      <nav className='w-full'>
            <TopNav isHome={isHome} />
            <div className={`flex justify-between items-center z-40 transition-all duration-300 w-full px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] bg-slate-50 ${ 
                  isSticky 
                  ? `fixed top-0 left-0 right-0 bg-white shadow-lg mt-8 xl:mt-0 py-0.5`
                  : `mt-1 xl:mt-0 py-0.5`}`}>
                  <div className='w-[170px] md:w-[200px] xl:w-[220px]'>
                        <Link href='/'>
                              <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className={`transition-all duration-300 w-[45%] md:w-[50%] ${
                                    isSticky ? "scale-90" : "scale-100"
                                  }`} 
                              />
                        </Link>
                  </div>
                  <div className='flex items-center gap-10'>
                        <NavNormal />
                  </div>
                  <div className='flex items-center gap-3 md:gap-5'>
                        <Search />
                        {/* <OrderButton /> */}
                        <SessionOrNot />
                        <CartItem />
                        <NavMobile isHome={isHome} />
                  </div>
            </div>
      </nav>
  )
}

export default Navbar
