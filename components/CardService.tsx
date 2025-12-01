import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="relative group overflow-hidden rounded-sm shadow-lg">
      <div className="h-96 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          priority
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div
        className="absolute inset-0 bg-black/50 group-hover:bg-black/80 transition-colors duration-500"
      ></div>

      <div className="absolute inset-0 flex flex-col items-start justify-end p-10 text-white">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-4 text-base">{description}</p>

        <button
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded opacity-0 translate-y-10  group
          group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out flex items-center gap-2 capitalize"
        >
          more
          <BsArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
