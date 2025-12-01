import React from 'react'
import image1 from '@/public/images/PASSPORT PHOTO ID.png'
import image2 from '@/public/images/NOTARY PUBLIC.png'
import image3 from '@/public/images/USPS MAILLING SERVICES.png'
import image4 from '@/public/images/MONEY ORDER.png'
import image5 from '@/public/images/PRINT SERVICE.png'
import TopServiceCard from '../CardTopService'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const services = [
      {
            title: "Printing",
            imageUrl: image5,
      },
      {
        title: "Passport ID",
        imageUrl: image1,
      },
      {
        title: "Notary",
        imageUrl: image2,
      },
      {
        title: "Mailing",
        imageUrl: image3,
      },
      {
            title: "Money Orders",
            imageUrl: image4,
          },
    ];

const TopService = () => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h1 className='text-5xl font-bold'>Discover our top services </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 mt-20">
              {services.map((service, index) => (
                <TopServiceCard
                  key={index}
                  title={service.title}
                  imageUrl={service.imageUrl}
                />
              ))}
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

export default TopService
