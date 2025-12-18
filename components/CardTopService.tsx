import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

interface ServiceCardProps {
  title: string;
  icon: string;
  slug: string;
}

const TopServiceCard: React.FC<ServiceCardProps> = ({
  title,
  icon,
  slug
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
                className="w-16 h-16 object-fit transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <Link href={`/service/${slug}`}>
            <div className="relative group overflow-hidden rounded-sm shadow-lg">
              <div className="h-32">
                
              </div>
    
              <div
                className="absolute inset-0 bg-transparent group-hover:bg-black/75 transition-colors duration-500"
              ></div>
    
              <div className="absolute inset-0 flex flex-col items-start justify-end py-5 px-4 text-white">
                <h3 className="text-lg font-bold text-black group-hover:text-white transition-colors duration-500">{title}</h3>
    
                <button
                  className="mt-4 px-4 py-2 bg-transparent border border-white text-white rounded opacity-0 translate-y-10 group
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

export default TopServiceCard;
