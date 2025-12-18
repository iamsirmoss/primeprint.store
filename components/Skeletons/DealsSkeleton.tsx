"use client";

import React from "react";

const TestSkeleton = () => {
  return (
    <div className="block lg:flex gap-8 justify-center items-center mt-10 animate-pulse">
      
      {/* LEFT CONTENT */}
      <div
        className="w-full lg:w-[50%] py-10 px-4 xl:px-14 xxl:pl-40 xll:pl-80 xxx:pl-[22%] 
        lll:p-[25%]"
      >
        {/* Title */}
        <div className="h-12 w-3/4 bg-gray-200 rounded mb-6" />

        {/* Paragraph */}
        <div className="space-y-3 my-10">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>

        {/* Button */}
        <div className="h-12 w-40 bg-gray-300 rounded shadow" />
      </div>

      {/* RIGHT CAROUSEL */}
      <div className="w-full lg:w-[50%] bg-slate-100 py-32 px-4 xl:px-14 xxl:px-40">
        <div className="space-y-6">

          {/* Card skeletons */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-lg p-6 flex gap-4"
            >
              {/* Image */}
              <div className="w-24 h-24 bg-gray-200 rounded" />

              {/* Text */}
              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-300 rounded mt-4" />
              </div>
            </div>
          ))}

          {/* Carousel arrows */}
          <div className="flex justify-between mt-6">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TestSkeleton;
