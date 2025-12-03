"use client"

import React, { useEffect, useState } from 'react'
import { Clock7 } from 'lucide-react';
import Link from 'next/link';
import {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselNext,
      CarouselPrevious,
    } from "@/components/ui/carousel"
import avis from '@/data/Avis'
import Image from 'next/image'
import { BsArrowRight } from 'react-icons/bs';

const Reviews = () => {

      const [review, setRiview] = useState(avis)

      useEffect(() => {
            setRiview(review)
      }, [])

  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] bg-slate-100'>
            <h1 className='text-5xl font-bold'>Your opinions matter : <br />Read our latest reviews</h1>
            <div className='w-[80%] xl:w-[90%] rounded-lg flex flex-col items-center justify-center py-5 mx-auto'>
                  <Carousel
                  opts={{
                        align: "start",
                  }}
                  className="w-full mt-10 px-6"
                  >
                  <CarouselContent>
                        {review?.slice(0, 5)?.map((item: any) => (
                        <CarouselItem key={item.id} className="w-full sm:basis-1/2 lg:basis-1/3">
                              <div className="p-1">
                              <div className='w-full bg-white rounded-lg border hover:border-gray-400 transition-all duration-300' key={item.id}>
                                          <div className='flex justify-between items-center px-4 py-3'>
                                                <Image src={item.src} alt='avis image' 
                                                className='w-[10%] object-contain' width={0} height={0} sizes='100vw' />
                                                <h5 className='text-sm'>{item.name}</h5>
                                          </div>
                                          <div className='py-2 p-4'>
                                                <hr />
                                                <p className='text-sm py-4'>{item.content}</p>
                                                <hr />
                                          </div>
                                          <div className='flex items-center gap-4 p-4'>
                                                <i><Clock7 size={16} /></i>
                                                <h6 className='text-xs'>A few days ago</h6>
                                          </div>
                                    </div>
                              </div>
                        </CarouselItem>
                        ))}
                  </CarouselContent>
                  <CarouselPrevious className='hover:bg-red-500 hover:text-white' />
                  <CarouselNext className='hover:bg-red-500 hover:text-white' />
                  </Carousel>
            </div>
            <div className='mt-10 text-xl border-b text-blue-700 w-fit border-b-blue-700'>
                  <Link href={''} className='flex items-center gap-2 group'>
                        View all
                        <BsArrowRight className='text-xl group-hover:translate-x-2 transition-all duration-500' />
                  </Link>
            </div>
      </div>
  )
}

export default Reviews
