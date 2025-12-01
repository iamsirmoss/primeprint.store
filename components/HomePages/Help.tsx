import Image from 'next/image'
import React from 'react'
import image from '@/public/images/faq.webp'
import Link from 'next/link'

const Help = () => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h1 className='text-5xl font-bold'>Services to help you shop</h1>
            <div className='mt-16 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8'>
                  {
                        Array.from({ length: 3 }).map((_, index) => (
                              <div className='group transition-transform duration-500 hover:scale-105 rounded' key={index}>
                                    <Link href={'/'} className='relative'>
                                          <div className='flex flex-col items-start justify-center py-8 bg-slate-100 px-10'>
                                                <div className='flex justify-between items-center'>
                                                      <h5 className='mt-2 text-xl font-medium'>Lorem ipsm</h5>
                                                </div>
                                                <p className='text-gray-500 mt-3 text-sm'>Lorem ipsum vitae accumsan orci fringilla a</p>
                                          </div>
                                          <div className='w-full h-[120px] overflow-hidden flex flex-col items-center justify-center 
                                          bg-slate-300'>
                                                <Image src={image} alt='image1' priority width={0} height={0} sizes='100vw'
                                                className='object-cover w-full h-full' />
                                          </div>
                                    </Link>
                              </div>
                        ))
                  }
            </div>
      </div>
  )
}

export default Help
