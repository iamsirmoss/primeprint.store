"use client";

import React from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";

const SellingsSkeleton = () => {
  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] animate-pulse">
      
      {/* Title */}
      <div className="h-12 w-1/2 bg-gray-200 rounded mb-16" />

      {/* Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default SellingsSkeleton;
