"use client"

import React from "react"
import Card from "../Card";
import image1 from '@/public/images/a4.jpg'
import image2 from '@/public/images/Printing.png'
import image3 from '@/public/images/Notary_public.png'
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Test: React.FC = () => {
  const cards = [
    {
      title: "Lorem ipsum",
      description: "Mauris et laoreet erat, at iaculis orci.",
      imageUrl: image1,
      price: 99
    },
    {
      title: "Lorem ipsum",
      description: "Mauris et laoreet erat, at iaculis orci.",
      imageUrl: image1,
      price: 99
    },
    {
      title: "Lorem ipsum",
      description: "Mauris et laoreet erat, at iaculis orci.",
      imageUrl: image1,
      price: 99
    },
  ];

  return (
    <div className="block lg:flex gap-8 justify-center items-center mt-10">
      <div className="w-full lg:w-[50%] py-10 px-4 xl:px-14 xxl:pl-40 xll:pl-80 xxx:pl-[22%] 
      lll:p-[25%]">
            <h2 className="text-5xl font-bold">
                  Exclusive promotions : Offers you can't miss
            </h2>
            <p className="my-10 text-lg text-gray-600">
                  Take advantage of our exclusive promotions and explore our showcase of limited-time offers today!
            </p>
            
            <button className='bg-red-500 text-white rounded px-10 py-4 shadow-[rgba(13,38,76,0.19)_0px_9px_20px] group hover:bg-blue-400 transition-all duration-500'>
                  <Link href={'/services'} className="flex items-center gap-2">
                        <h5 className='font-semibold text-base'>Learn more</h5>
                        <BsArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                  </Link>
            </button>
      </div>
      <div className="w-full lg:w-[50%] bg-slate-100 py-32 px-4 xl:px-14 xxl:px-40">
            <Carousel
                  opts={{
                  align: "start",
                  }}
                  orientation="vertical"
                  className="w-full max-w-full py-7"
            >
                  <CarouselContent className="-mt-1 h-80 w-full">
                  {cards.map((card, index) => (
                  <CarouselItem key={index} className="pt-0 w-full">
                        <div className="p-4 w-full">
                        <Card
                        key={index}
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                        price={card.price}
                        />
                        </div>
                  </CarouselItem>
                  ))}
                  </CarouselContent>
                  <CarouselPrevious className="hover:bg-red-500 hover:text-white" />
                  <CarouselNext className="hover:bg-red-500 hover:text-white" />
            </Carousel>
      </div>
    </div>
  );
};

export default Test
