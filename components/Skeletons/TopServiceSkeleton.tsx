"use client";

import React from "react";

const TopServiceSkeleton = () => {
  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] animate-pulse">

      {/* Title */}
      <div className="h-12 w-2/3 bg-gray-200 rounded mb-10" />

      {/* Grid cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center"
          >
            {/* Image placeholder */}
            <div className="w-20 h-20 bg-gray-200 rounded mb-6" />

            {/* Title placeholder */}
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="mt-10">
        <div className="h-6 w-28 bg-gray-300 rounded" />
      </div>

    </div>
  );
};

export default TopServiceSkeleton;
