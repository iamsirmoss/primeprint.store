import Image from 'next/image'
import React from 'react'
import image from '@/public/images/folded-blue-paper-backdrop.jpg'
import Link from 'next/link'

const GetUp = () => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h1 className='text-5xl font-bold'>Get up to 70% off</h1>
            <div className='mt-16 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8'>
                  {
                        Array.from({ length: 4 }).map((_, index) => (
                              <div className='group transition-transform duration-500 hover:scale-105 rounded' key={index}>
                                    <Link href={'/'}>
                                          <div className='p-6 bg-slate-200'>
                                                <h5 className='m-3 text-2xl font-bold'>Save</h5>
                                                <h5 className='text-6xl font-extrabold relative max-w-fit ml-5 text-red-500'>
                                                      <span className='text-2xl absolute top-0 -left-3'>$</span>100
                                                </h5>
                                                <p className='text-gray-500 mt-3'>Lorem ipsum vitae accumsan orci fringilla a</p>
                                          </div>
                                          <div className='w-full h-[200px] overflow-hidden'>
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

export default GetUp
