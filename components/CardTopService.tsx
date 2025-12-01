import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

interface ServiceCardProps {
  title: string;
  imageUrl: any;
}

const TopServiceCard: React.FC<ServiceCardProps> = ({
  title,
  imageUrl,
}) => {
  return (
      <Link href={''}>
            <div className="relative group overflow-hidden pt-5 bg-slate-100 rounded-sm">
                  <div className="overflow-hidden flex flex-col items-center">
                  <Image
                  src={imageUrl}
                  alt={title}
                  priority
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-1/3 object-contain transition-transform duration-500"
                  />
                  </div>

                  <div
                  className="absolute inset-0 group-hover:bg-black/30 transition-colors duration-500"
                  ></div>

                  <div className="p-5 text-black flex flex-col items-center">
                  <h3 className="text-base font-normal group-hover:underline transition-all duration-500">{title}</h3>
                  </div>
            </div>
      </Link>
  );
};

export default TopServiceCard;
