import Image from 'next/image'
import React from 'react'
import image from '@/public/images/as4.webp'

const Why = () => {
  return (
      <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] pt-4 lg:pt-16 pb-16'>
            <div className='block lg:flex items-start gap-16'>
                  <div className='lg:w-[50%] h-[300px] lg:h-[500px] relative'>
                        <Image
                        src={image}
                        alt='image about'
                        priority
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-full object-cover"
                        />
                        <div className='flex items-center gap-6 absolute bottom-0 lg:bottom-6 left-0 xl:left-6'>
                              <div className='py-4 md:py-7 px-2 sm:px-8 md:px-12 bg-gray-800 rounded'>
                                    <h3 className='text-xl xl:text-2xl font-semibold text-white'>Lorem ipsum</h3>
                                    <h4 className='text-4xl xl:text-6xl text-white my-4'>12</h4>
                                    <p className='text-slate-100 text-base xl:text-xl'>Vontura isman</p>
                              </div>
                              <div className='py-4 md:py-7 px-2 sm:px-8 md:px-12 bg-gray-800 rounded'>
                                    <h3 className='text-xl xl:text-2xl font-semibold text-white'>Lorem ipsum</h3>
                                    <h4 className='text-4xl xl:text-6xl text-white my-4'>121+</h4>
                                    <p className='text-slate-100 text-base xl:text-xl'>Vontura isman</p>
                              </div>
                        </div>
                  </div>
                  <div className='lg:w-[50%] mt-10 lg:mt-0'>
                        <h1 className='text-[45px] xl:text-7xl font-semibold'>
                              Why work with Primeprint.store ?
                        </h1>
                        <p className='text-gray-400 mt-10 text-[17px]'>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                              Perspiciatis, incidunt harum. Enim aliquid nulla debitis 
                              placeat et dignissimos tempore obcaecati. Odio at hic rem quae, 
                              est quaerat quia! Libero, ratione
                        </p>
                        <p className='text-gray-400 mt-5 text-[17px]'>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                              Perspiciatis, incidunt harum. Enim aliquid nulla debitis 
                              placeat et dignissimos tempore obcaecati. Odio at hic rem quae, 
                              est quaerat quia! Libero, ratione
                        </p>
                  </div>
            </div>
      </div>
  )
}

export default Why
