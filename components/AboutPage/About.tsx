import Image from 'next/image'
import React from 'react'
import image from '@/public/images/imprimante.jpg'

const About = () => {
  return (
      <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] pb-4 lg:pb-16 pt-16'>
            <div className='block lg:flex items-start gap-20'>
                  <div className='lg:w-[55%]'>
                        <h1 className='text-[45px] md:text-6xl lg:text-7xl font-semibold'>Primeprint<span>.store</span></h1>
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
                  <div className='lg:w-[45%] h-[300px] lg:h-[500px] mt-10 lg:mt-0'>
                        <Image
                        src={image}
                        alt='image about'
                        priority
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-full object-cover"
                        />
                  </div>
            </div>
      </div>
  )
}

export default About
