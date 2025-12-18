import React from 'react'
import image1 from '@/public/images/PASSPORT PHOTO ID.png'
import image2 from '@/public/images/NOTARY PUBLIC.png'
import image3 from '@/public/images/USPS MAILLING SERVICES.png'
import image4 from '@/public/images/MONEY ORDER.png'
import image5 from '@/public/images/PRINT SERVICE.png'
import TopServiceCard from '../CardTopService'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

interface ServiceProps {
  id: string;
  slug: string;
  title: string;
  icon: string | null;
  products: { id: string; slug: string; title: string }[];
  subServices: { id: string; slug: string; title: string }[];
}

const TopService = ({services}: {services: ServiceProps[]}) => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h1 className='text-5xl font-bold'>Discover our top services </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-20">
              {services.slice(0, 4).map((service, index) => (
                <TopServiceCard
                  key={index}
                  title={service.title}
                  icon={service.icon ?? ""}
                  slug={service.slug}
                />
              ))}
            </div>
            <div className='mt-10 text-xl border-b text-blue-400 w-fit border-b-blue-400'>
                  <Link href={'/services'} className='flex items-center gap-2 group'>
                        View all
                        <BsArrowRight className='text-xl group-hover:translate-x-2 transition-all duration-500' />
                  </Link>
            </div>
      </div>
  )
}

export default TopService
