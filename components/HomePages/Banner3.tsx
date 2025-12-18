import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import image from '@/public/images/post-card.png'

const Banner3 = () => {
  return (
    <div className=''>
            <div className='bg-slate-500 w-full block md:flex items-center justify-between'>
                  <div className='w-full md:w-1/2 rounded px-4 xl:px-10 xxl:pl-40 xll:pl-80 xxx:pl-[22%] lll:pl-[25%] py-20 
                  '>
                        <h2 className='text-3xl lg:text-5xl font-extrabold text-white'>
                              Bring your ideas to life with our post card design options
                        </h2>
                        <p className='my-5 font-normal text-base md:text-lg text-white'>
                              Our customizable post card widget lets you design beautiful and unique post 
                              cards that perfectly align with your brand or personal style
                        </p>
                        <div className='w-fit'>
                              <Link href={'/learn-more'} className=''>
                                    <button className='bg-red-500 text-white rounded px-10 py-4 shadow-[rgba(13,38,76,0.19)_0px_9px_20px] hover:bg-blue-400 
                                    transition-all duration-500 flex items-center gap-2 cursor-pointer group'>
                                          <h5 className='font-semibold text-sm md:text-base'>Learn more</h5>
                                          <BsArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                                    </button>
                              </Link>
                        </div>
                  </div>
                  <div className='w-full md:w-1/2 block md:flex flex-col items-end'>
                        <Image src={image} alt='image1' priority width={0} height={0} sizes='100vw'
                        className='object-cover w-1/2 md:w-[55%]' />
                  </div>
            </div>
      </div>
  )
}

export default Banner3
