"use client"

import React from 'react'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'
import Image from 'next/image'
import image1 from '@/public/images/IPAD.png'
import image2 from '@/public/images/COMPUTERpng.png'
import image3 from '@/public/images/note.png'
import {motion} from 'motion/react'

const Banner = () => {
  return (
      <>
      <div className='grid-cols-1 gap-5 md:gap-4 lg:gap-10 grid md:grid-cols-3 pt-10 pb-28 md:py-10 lg:py-14 xl:py-20 w-full bg-blue-400 
      px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <div className=''>
                  <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  >
                        <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                        className='w-[18%] sm:w-[15%] md:w-[50%] md:mt-20 lg:mt-28' />
                  </motion.div>
                  <div className='flex flex-wrap items-center gap-4 mt-10'>
                        
                        <Link href={'/services'} className='group'>
                              <button
                              className='bg-red-500 text-white rounded px-4 py-4 md:px-5 md:py-5 
                              shadow-[rgba(13,38,76,0.19)_0px_9px_20px] cursor-pointer flex items-center gap-2'>
                                    
                                    <h5 className='font-semibold text-sm md:text-[16px]'>Explore services</h5>
                                    <BsArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                              </button>
                        </Link>
                        <Link href={'/shop'}>
                              <button
                              className='bg-white text-red-500 rounded px-4 py-4 md:px-5 md:py-5 shadow-[rgba(13,38,76,0.19)_0px_9px_20px]
                              hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>
                                    
                                    <h5 className='font-semibold text-sm md:text-[16px]'>Shop now</h5>
                              </button>
                        </Link>
                  </div>
            </div>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className='md:text-center'>
                  <h1 className='text-[55px] md:text-[75px] lg:text-[90px] xl:text-[100px] font-extrabold
                  leading-tight uppercase text-white'>
                        prime print{" "}<span className='font-light text-[45px] md:text-[60px] lg:text-[80px] xl:text-[90px]'>store</span>
                  </h1>
                  <p className='text-base lg:text-2xl font-semibold text-white'>
                        Your one stop shop for printing, notary and more.
                  </p>
            </motion.div>
            <div className='relative'>
                  <motion.div
                  initial={{ x: -100, y: 300, opacity: 0 }}
                  animate={{ x: 0, y: 200, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  >
                        <Image src={image3} alt='image1' priority width={0} height={0} sizes='100vw' 
                        className='w-[15%] md:w-[50%] absolute -top-40 left-4 md:top-1/2 md:left-1/2 -translate-x-1/2 -translate-y-1/2' />
                  </motion.div>
                  <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  >
                        <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
                        className='w-[35%] sm:w-[25%] md:w-[90%] absolute right-4 md:-bottom-12 lg:-bottom-16 xl:-bottom-20' />
                  </motion.div>
            </div>
      </div>
      </>
  )
}

export default Banner
