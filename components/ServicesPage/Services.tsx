import React from 'react'
import ServiceCard from '../CardService';
import image from '@/public/images/a6-removebg-preview.png'

const services = [
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Donec convallis.",
    imageUrl: image,
  },
  {
    title: "Donec convallis",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: image,
  },
  {
    title: "Ipsum lorem",
    description: "Lorem ipsum dolor sit amet, Donec convallis.",
    imageUrl: image,
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Donec convallis.",
    imageUrl: image,
  },
  {
    title: "Donec convallis",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: image,
  },
  {
    title: "Ipsum lorem",
    description: "Lorem ipsum dolor sit amet, Donec convallis.",
    imageUrl: image,
  },
];

const Services = () => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h2 className='text-5xl font-bold'>Discover our services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-10">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                />
              ))}
            </div>
      </div>
  )
}

export default Services
