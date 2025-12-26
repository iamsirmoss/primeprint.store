import React from 'react'
import TopServiceCard from '../CardTopService';

interface OtherService {
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
};

const OtherServices = ({ services }: { currentSlug: string; services: OtherService[] }) => {
  return (
      <div className='pt-5 pb-32 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h2 className='text-2xl xs:text-3xl lg:text-5xl font-bold'>Other services</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-16'>
                  {services.map((service, index) => (
                        <TopServiceCard
                              key={index}
                              title={service.title}
                              icon={service.icon ?? ""}
                              slug={service.slug}
                        />
                  ))}
            </div>
      </div>
  )
}

export default OtherServices
