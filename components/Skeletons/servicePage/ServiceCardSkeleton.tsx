"use client";

import React from "react";

const ServiceCardSkeleton = () => {
  return (
    <div className="border p-3 rounded-sm animate-pulse">
      
      {/* Icon */}
      <div className="overflow-hidden pb-3">
        <div className="w-20 h-20 bg-gray-200 rounded" />
      </div>

      {/* Card */}
      <div className="relative overflow-hidden rounded-sm shadow-lg">
        {/* Image area */}
        <div className="h-72 bg-gray-300" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-start justify-end p-10">
          {/* Title */}
          <div className="h-6 w-2/3 bg-white/30 rounded mb-4" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/30 rounded" />
            <div className="h-4 w-5/6 bg-white/30 rounded" />
          </div>

          {/* Button */}
          <div className="mt-8 h-10 w-28 bg-white/30 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
