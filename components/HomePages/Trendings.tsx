import Image from 'next/image'
import React from 'react'
import image from '@/public/images/brochure.png'
import Link from 'next/link'

const Trendings = () => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h1 className='text-5xl font-bold'>Trending products for you</h1>
            <div className='mt-16 grid grid-cols-1 xs:grid-cols-2 gap-5 sm:gap-14'>
                  {
                        Array.from({ length: 2 }).map((_, index) => (
                              <div className='group transition-transform duration-500 hover:scale-105 rounded' key={index}>
                                    <Link href={'/'} className='relative'>
                                          <div className='w-full overflow-hidden flex flex-col items-center justify-center bg-slate-100 
                                          rounded'>
                                                <Image src={image} alt='image1' priority width={0} height={0} sizes='100vw'
                                                className='object-cover w-[50%]' />
                                          </div>
                                          <div className='py-6 px-5'>
                                                <div className='flex justify-between items-center'>
                                                      <h5 className='mt-2 text-xl font-medium'>Lorem ipsm</h5>
                                                      {/* <h5 className='mt-2 text-lg font-bold max-w-fit text-red-500'>
                                                            <span className='text-black'>$ </span>100.00
                                                      </h5> */}
                                                </div>
                                                <p className='text-gray-500 mt-3 text-sm'>Lorem ipsum vitae accumsan orci fringilla a</p>
                                                <div className='flex flex-col items-end'>
                                                      <button className="bg-black mt-6 border rounded py-4 px-6
                                                      hover:bg-black/80 hover:text-white transition-all duration-300">
                                                            <h5 className="text-sm text-white">Shop now</h5>
                                                      </button>
                                                </div>
                                          </div>
                                    </Link>
                              </div>
                        ))
                  }
            </div>
      </div>
  )
}

export default Trendings
