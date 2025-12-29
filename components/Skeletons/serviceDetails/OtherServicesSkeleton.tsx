"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-sm ${className ?? ""}`} />
);

const TopServiceCardSkeleton = () => {
  return (
    <div className="border border-blue-200 p-3 rounded-sm">
      {/* Icon */}
      <div className="overflow-hidden pb-3">
        <Skeleton className="w-16 h-16 rounded-2xl" />
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-sm shadow-lg">
        {/* Image area */}
        <Skeleton className="h-32 w-full" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-start justify-end py-5 px-4">
          {/* Title */}
          <Skeleton className="h-5 w-2/3" />

          {/* Button */}
          <Skeleton className="mt-4 h-9 w-24 rounded" />
        </div>
      </div>
    </div>
  );
};

const OtherServicesSkeleton = () => {
  return (
    <div className="pt-5 pb-32 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      {/* Title */}
      <Skeleton className="h-10 xs:h-12 lg:h-16 w-1/3" />

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-16">
        {Array.from({ length: 3 }).map((_, idx) => (
          <TopServiceCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default OtherServicesSkeleton;
