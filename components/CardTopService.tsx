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
        <div className="border p-3 rounded-sm group hover:border-gray-600 transition-all duration-500">
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
                className="w-16 h-16 object-fit transition-transform duration-500"
            />) :
            (<div className="p-2 w-16 h-16 rounded-2xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-xs">
                No image
            </div>)
            }
          </div>
          
            <div className="relative  overflow-hidden rounded-sm shadow-lg">
              <div className="h-36 w-full overflow-hidden">
                
              </div>
    
              <div
                className="absolute inset-0 bg-gray-500 group-hover:bg-gray-600 transition-colors duration-500"
              ></div>
    
              <div className="absolute inset-0 flex flex-col items-start justify-end py-5 px-4 text-white group">
                <h3 className="text-lg font-bold text-white capitalize">{title}</h3>
    
                <button
                  className="mt-4 px-4 py-2 bg-transparent border border-white text-white rounded
                   flex items-center gap-2 capitalize cursor-pointer"
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
