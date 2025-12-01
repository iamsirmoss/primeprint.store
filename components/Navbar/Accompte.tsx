"use client"

import { User } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'


const Accompte = () => {

      const [openWindow, setOpenWindow] = useState<boolean>(false)

      const toggleW = () => {
      setOpenWindow(!openWindow)
      }

  return (
    <div>
      <User onClick={toggleW}
            className='text-2xl md:text-3xl text-black hover:text-blue-400 transition-all duration-300 cursor-pointer relative' 
      />
      <div className={`${openWindow ? 'top-24 md:top-28 transition-all duration-500 ease-in-out right-16' : 'top-24 md:top-28 right-16 hidden'} 
      absolute bg-slate-100 w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] z-50 rounded-xl 
      transition-all duration-500 shadow-[rgba(13,38,76,0.19)_0px_9px_20px]`}>
        <div className='mt-2 px-5 pb-7'>
          <div className='flex justify-end'>
            <RiCloseFill onClick={toggleW} className='text-xl md:text-2xl cursor-pointer hover:scale-110 transition-all duration-300' />
          </div>
          <div className='mt-3 flex flex-col items-center justify-center'>
            <h3 className='font-bold text-xl'>My account</h3>
            <Link onClick={toggleW} href={'/login'} 
            className='bg-red-500 p-3 rounded-xl text-center w-full text-white mt-4 hover:bg-blue-400 transition-all duration-300'>
                  Login
            </Link>
            <Link onClick={toggleW} href={'/register'} 
            className='bg-white p-3 rounded-xl text-center w-full mt-4 font-semibold hover:bg-gray-400 transition-all duration-300'>
                  Create my account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accompte
