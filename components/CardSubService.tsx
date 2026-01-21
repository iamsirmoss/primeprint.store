import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

interface ServiceCardProps {
  title: string;
  icon: string;
  slug: string;
}

const SubServiceCard: React.FC<ServiceCardProps> = ({
  title,
  icon,
  slug
}) => {
  return (
        <div className="border p-3 rounded-2xl group hover:border-gray-500 transition-all duration-500">
          <Link href={`/service/sub-service/${slug}`}>
          <div className="overflow-hidden pb-3">
            {icon ?
            (<Image
                src={`/images/${icon}`}
                alt={title}
                priority
                width={0}
                height={0}
                sizes="100vw"
                className="w-16 h-16 object-fit transition-transform duration-500 group-hover:scale-110"
            />) :
            (<div className="p-2 w-16 h-16 rounded-2xl border border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-xs">
              IMG
            </div>)
            }
          </div>
          
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <div className="h-32">
                
              </div>
    
              <div
                className="absolute inset-0 bg-transparent group-hover:bg-gray-500 transition-colors duration-500"
              ></div>
    
              <div className="absolute inset-0 flex flex-col items-start justify-end py-5 px-4">
                <h3 className="text-lg font-bold text-black group-hover:text-white transition-colors duration-500 capitalize">{title}</h3>
    
                <button
                  className="mt-4 px-4 py-2 bg-transparent border rounded group
                  group-hover:text-white transition-all duration-500 flex items-center gap-2 capitalize cursor-pointer"
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

export default SubServiceCard;
