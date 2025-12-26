import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import image from '@/public/images/ban.png'

const Banner2 = () => {
  return (
      <div className=''>
            <div className='p-10 xl:p-14 block md:flex items-center justify-between gap-4 bg-linear-to-r from-[#ef084a] via-[#5191db] to-[#3e61ef]'>
                  <div className='w-full md:w-1/2 md:block'>
                        <Image src={image} alt='image1' priority width={0} height={0} sizes='100vw'
                              className='object-cover w-1/2 md:w-[70%]' />
                  </div>
                  <div className='w-full md:w-1/2 rounded text-white'>
                        <h2 className='text-3xl lg:text-5xl font-extrabold'>
                              UltraPrint 5000 large format printer
                        </h2>
                        <p className='text-sm lg:text-base mt-5 font-normal leading-relaxed'>
                              The UltraPrint 5000 is a high-performance large-format 
                              printer designed for professional-quality prints across 
                              various materials.
                        </p>
                        <h5 className='text-sm lg:text-base mt-5 font-semibold'>High-resolution printing</h5>
                        <ul className='list-disc list-inside mt-4 mb-8'>
                              <li className='text-xs lg:text-sm'>
                                    Achieve stunning image clarity with up to 2400 x 1200 dpi resolution, 
                                    ensuring sharp details and vibrant colors.
                              </li>
                        </ul>
                        <div className='w-fit'>
                              <Link href={'/learn-more'} className=''>
                                    <button className='bg-red-500 text-white rounded px-10 py-4 shadow-[rgba(13,38,76,0.19)_0px_9px_20px] 
                                    hover:bg-blue-400 transition-all duration-500 flex items-center gap-2 cursor-pointer group'>
                                          <h5 className='font-semibold text-sm md:text-base'>Learn more</h5>
                                          <BsArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                                    </button>
                              </Link>
                        </div>
                  </div>
            </div>
      </div>
  )
}

export default Banner2
