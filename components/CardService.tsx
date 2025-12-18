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
    <div className="border p-3 rounded-sm">
      <div className="overflow-hidden pb-3">
        <Image
            src={`/images/${icon}`}
            alt={title}
            priority
            width={0}
            height={0}
            sizes="100vw"
            className="w-20 h-20 object-fit transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <Link href={`/service/${slug}`}>
        <div className="relative group overflow-hidden rounded-sm shadow-lg">
          <div className="h-72">
            
          </div>

          <div
            className="absolute inset-0 bg-black/75 group-hover:bg-black/50 transition-colors duration-500"
          ></div>

          <div className="absolute inset-0 flex flex-col items-start justify-end p-10 text-white">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="mt-4 text-base">{description}</p>

            <button
              className="mt-8 px-6 py-3 bg-transparent border border-white text-white rounded opacity-0 translate-y-10 group
              group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out flex items-center gap-2 capitalize cursor-pointer"
            >
              more
              <BsArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
