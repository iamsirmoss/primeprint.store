import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

const Articles = () => {
  return (
      <div
      className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h3 className='text-2xl xs:text-3xl lg:text-5xl font-bold'>Latest articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-20">
                  <div className="w-full">
                  <div className="w-full h-48 rounded-xl overflow-hidden">
                        <Link href='/'>
                              <Image src='/images/card.jpg' alt='Car' width={0} height={0} sizes='100vw' 
                              className='w-full h-full object-cover rounded-lg hover:scale-110 transition-all duration-500 ease-in-out'  />
                        </Link>
                  </div>
                  <div className="mt-5">
                        <h5 className='mb-2 font-bold text-[15px] underline'>
                              <Link href='/'>
                                    Customizable post card widget : personalize your messages with style
                              </Link>
                        </h5>
                        <p className='text-sm font-medium'>
                              <Link href='/'>
                                    Our customizable post card widget lets you design beautiful and unique 
                                    post cards that perfectly align with your brand or personal style.
                              </Link>
                        </p>
                  </div>
                  </div>
                  <div className="w-full my-12 sm:my-0">
                  <div className="w-full h-48 rounded-xl overflow-hidden">
                        <Link href='/'>
                              <Image src='/images/card2.jpg' alt='Car' width={0} height={0} sizes='100vw' 
                              className='w-full h-full object-cover rounded-lg hover:scale-110 transition-all duration-500 ease-in-out'  />
                        </Link>
                  </div>
                  <div className="mt-5">
                        <h5 className='mb-2 font-bold text-[15px] underline'>
                              <Link href='/'>
                                    Create unique post cards with our customizable widget
                              </Link>
                        </h5>
                        <p className='text-sm font-medium'>
                              <Link href='/'>
                                    Easily create stunning post cards with our flexible design options, 
                                    tailored to your preferences and needs.
                              </Link>
                        </p>
                  </div>
                  </div>
                  <div className="w-full">
                  <div className="w-full h-48 rounded-xl overflow-hidden">
                        <Link href='/'>
                              <Image src='/images/card3.jpg' alt='Car' width={0} height={0} sizes='100vw' 
                              className='w-full h-full object-cover rounded-lg hover:scale-110 transition-all duration-500 ease-in-out'  />
                        </Link>
                  </div>
                  <div className="mt-5">
                        <h5 className='mb-2 font-bold text-[15px] underline'>
                              <Link href='/'>
                                    Post card widget : tailor-made designs to fit your needs
                              </Link>
                        </h5>
                        <p className='text-sm font-medium'>
                              <Link href='/'>
                                    With our post card widget, you have full control over colors, fonts, and 
                                    layouts to craft the perfect message
                              </Link>
                        </p>
                  </div>
                  </div>
            </div>
            <div className='mt-20 text-xl border-b text-blue-400 w-fit border-b-blue-400'>
                  <Link href={''} className='flex items-center gap-2 group'>
                        See more
                        <BsArrowRight className='text-xl group-hover:translate-x-2 transition-all duration-500' />
                  </Link>
            </div>
      </div>
  )
}

export default Articles
