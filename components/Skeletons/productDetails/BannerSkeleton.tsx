"use client";

import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10 animate-pulse">
      
      {/* Breadcrumb */}
      <div className="mt-10 flex items-center gap-3 flex-wrap">
        <div className="h-4 w-12 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>

      {/* Icon + Title */}
      <div className="mt-6">
        {/* Icon placeholder */}
        <div className="h-52 w-52 bg-gray-200 rounded mb-4" />

        {/* Title */}
        <div className="h-10 md:h-12 lg:h-14 w-2/3 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default BannerSkeleton;
