import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

interface ServiceCardProps {
  title: string;
  slug: string;
  description: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  slug,
}) => {
  return (
    <div className="border p-3 rounded-sm group hover:border-gray-500 transition-all duration-500">
      <Link href={`/service/${slug}`}>
      <div className="overflow-hidden pb-3">
        <Image
            src={`/images/${icon}`}
            alt={title}
            priority
            width={0}
            height={0}
            sizes="100vw"
            className="w-14 h-14 lg:w-20 lg:h-20 object-fit"
        />
      </div>
      
        <div className="relative overflow-hidden rounded-sm shadow-lg">
          <div className="h-64 md:h-72">
            
          </div>

          <div
            className="absolute inset-0 bg-transparent group-hover:bg-gray-500 transition-all duration-500"
          ></div>

          <div className="absolute inset-0 flex flex-col items-start justify-end pt-4 pb-8 px-4">
            <h3 className="text-2xl font-bold text-black group-hover:text-white transition-colors duration-500 capitalize">{title}</h3>
            <p className="mt-4 text-sm line-clamp-2 text-gray-500 group-hover:text-white transition-colors duration-500 max-w-full md:max-w-xs">{description}</p>

            <button
              className="mt-8 px-4 py-2 bg-transparent border rounded group
               flex items-center gap-2 capitalize cursor-pointer group-hover:text-white transition-all duration-500"
            >
              more
              <BsArrowRight className='group-hover:translate-x-2 transition-all duration-500' />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
