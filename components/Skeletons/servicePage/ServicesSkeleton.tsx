"use client";

import React from "react";
import ServiceCardSkeleton from "./ServiceCardSkeleton";

const ServicesSkeleton = () => {
  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] animate-pulse">
      
      {/* Title */}
      <div className="h-12 w-1/2 bg-gray-200 rounded mb-10" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSkeleton;
