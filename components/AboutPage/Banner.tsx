import { ArrowBigDown } from 'lucide-react'
import React from 'react'

const Banner = () => {
  return (
      <div className='w-full relative'>
            <div className='bg-[url(/images/ban-about.jpg)] relative bg-no-repeat bg-center bg-cover z-0'>
                  <div className='w-full relative top-0 left-0 right-0 -z-10 bg-black/75 py-10 md:py-16 lg:py-24'>
                        <div
                        className='w-full flex flex-col justify-center items-center'>
                              <h3 className='text-3xl lg:text-[50px] font-bold mb-6 text-white'>
                                    About us
                              </h3>
                              <ArrowBigDown className='text-white' />
                        </div>
                  </div>
            </div>
      </div>
  )
}

export default Banner
