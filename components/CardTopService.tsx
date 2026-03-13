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
        <div className="border p-3 rounded-2xl group hover:border-gray-600 transition-all duration-500">
          <Link href={`/service/${slug}`}>
          <div className="overflow-hidden pb-3">
            {icon ?
            (<Image
                src={`/images/${icon}`}
                alt={title}
                priority
                width={0}
                height={0}
                sizes="100vw"
                className="w-12 h-12 md:w-16 md:h-16 object-fit transition-transform duration-500"
            />) :
            (<div className="p-2 w-16 h-16 rounded-2xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-xs">
                No image
            </div>)
            }
          </div>
          
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <div className="h-28 md:h-36 w-full overflow-hidden">
                
              </div>
    
              <div
                className="absolute inset-0 bg-white group-hover:bg-gray-600 transition-colors duration-500"
              ></div>
    
              <div className="absolute inset-0 flex flex-col items-start justify-end py-5 px-4 group">
                <h3 className="text-lg font-bold capitalize text-black group-hover:text-white">{title}</h3>
    
                <button
                  className="mt-2 py-1.5 md:mt-4 px-4 md:py-2 bg-transparent border group-hover:border-white rounded-2xl
                   flex items-center gap-2 capitalize cursor-pointer text-ss md:text-sm text-black group-hover:text-white"
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

export default TopServiceCard;
