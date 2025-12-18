"use client";

import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse border border-gray-100 rounded shadow-xs p-1 relative pb-14">
      
      {/* Image */}
      <div className="w-full flex items-center justify-center bg-gray-200 rounded h-40">
        <div className="w-[45%] md:w-[60%] h-24 bg-gray-300 rounded" />
      </div>

      {/* Content */}
      <div className="py-6 px-5">
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-300 rounded" />
        </div>

        <div className="mt-3 space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Button */}
      <div className="absolute bottom-2 right-4">
        <div className="h-9 w-28 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
