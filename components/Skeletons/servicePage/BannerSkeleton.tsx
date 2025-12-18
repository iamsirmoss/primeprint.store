"use client";

import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="w-full relative animate-pulse">
      {/* Background placeholder */}
      <div className="relative bg-gray-300 bg-no-repeat bg-center bg-cover">
        {/* Overlay */}
        <div className="w-full relative top-0 left-0 right-0 bg-black/60 py-10 md:py-16 lg:py-24">
          <div className="w-full flex flex-col justify-center items-center">
            
            {/* Title skeleton */}
            <div className="h-10 lg:h-14 w-48 lg:w-72 bg-white/30 rounded mb-6" />

            {/* Arrow placeholder */}
            <div className="h-8 w-8 bg-white/30 rounded-full" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
