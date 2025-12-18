"use client";

import React from "react";

const BannerSkeleton = () => {
  return (
    <div
      className="animate-pulse grid-cols-1 gap-5 md:gap-4 lg:gap-10 grid md:grid-cols-3 pt-10 pb-28 md:py-10 lg:py-14 xl:py-20 w-full bg-blue-400
      px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]"
    >
      {/* LEFT */}
      <div>
        {/* image1 placeholder */}
        <div className="w-[18%] sm:w-[15%] md:w-[50%] md:mt-20 lg:mt-28 h-16 md:h-48 bg-white/30 rounded" />

        {/* buttons placeholder */}
        <div className="flex flex-wrap items-center gap-4 mt-10">
          <div className="h-12 md:h-14 w-40 md:w-48 bg-white/30 rounded shadow-[rgba(13,38,76,0.19)_0px_9px_20px]" />
          <div className="h-12 md:h-14 w-28 md:w-36 bg-white/30 rounded shadow-[rgba(13,38,76,0.19)_0px_9px_20px]" />
        </div>
      </div>

      {/* CENTER */}
      <div className="md:text-center">
        {/* big title */}
        <div className="mx-auto h-14 md:h-20 lg:h-24 xl:h-28 w-full bg-white/30 rounded mb-4" />
        {/* subtitle */}
        <div className="mx-auto h-5 lg:h-7 w-3/4 bg-white/30 rounded" />
      </div>

      {/* RIGHT */}
      <div className="relative">
        {/* note image3 placeholder */}
        <div className="w-[15%] md:w-[50%] h-14 md:h-40 bg-white/30 rounded absolute -top-40 left-4 md:top-1/2 md:left-1/2 -translate-x-1/2 -translate-y-1/2" />
        {/* computer image2 placeholder */}
        <div className="w-[35%] sm:w-[25%] md:w-[90%] h-28 sm:h-24 md:h-64 bg-white/30 rounded absolute right-4 md:-bottom-12 lg:-bottom-16 xl:-bottom-20" />
      </div>
    </div>
  );
};

export default BannerSkeleton;
