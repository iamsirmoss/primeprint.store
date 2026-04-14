// "use client";

// import React from "react";

// const BannerSkeleton = () => {
//   return (
//     <div
//       className="animate-pulse grid-cols-1 gap-5 md:gap-4 lg:gap-10 grid md:grid-cols-3 pt-10 pb-28 md:py-10 lg:py-14 xl:py-20 w-full bg-blue-400
//       px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]"
//     >
//       {/* LEFT */}
//       <div>
//         {/* image1 placeholder */}
//         <div className="w-[18%] sm:w-[15%] md:w-[50%] md:mt-20 lg:mt-28 h-16 md:h-48 bg-white/30 rounded" />

//         {/* buttons placeholder */}
//         <div className="flex flex-wrap items-center gap-4 mt-10">
//           <div className="h-12 md:h-14 w-40 md:w-48 bg-white/30 rounded shadow-[rgba(13,38,76,0.19)_0px_9px_20px]" />
//           <div className="h-12 md:h-14 w-28 md:w-36 bg-white/30 rounded shadow-[rgba(13,38,76,0.19)_0px_9px_20px]" />
//         </div>
//       </div>

//       {/* CENTER */}
//       <div className="md:text-center">
//         {/* big title */}
//         <div className="mx-auto h-14 md:h-20 lg:h-24 xl:h-28 w-full bg-white/30 rounded mb-4" />
//         {/* subtitle */}
//         <div className="mx-auto h-5 lg:h-7 w-3/4 bg-white/30 rounded" />
//       </div>

//       {/* RIGHT */}
//       <div className="relative">
//         {/* note image3 placeholder */}
//         <div className="w-[15%] md:w-[50%] h-14 md:h-40 bg-white/30 rounded absolute -top-40 left-4 md:top-1/2 md:left-1/2 -translate-x-1/2 -translate-y-1/2" />
//         {/* computer image2 placeholder */}
//         <div className="w-[35%] sm:w-[25%] md:w-[90%] h-28 sm:h-24 md:h-64 bg-white/30 rounded absolute right-4 md:-bottom-12 lg:-bottom-16 xl:-bottom-20" />
//       </div>
//     </div>
//   );
// };

// export default BannerSkeleton;

"use client"

import React from "react"

const BannerSkeleton = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700">
      
      {/* shimmer animation */}
      <style>
        {`
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 150%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.25),
            transparent
          );
          animation: shimmer 1.6s infinite;
        }
        @keyframes shimmer {
          100% {
            left: 150%;
          }
        }
        `}
      </style>

      <div className="relative mx-auto grid min-h-[720px] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr]">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6">

          {/* badge */}
          <div className="h-8 w-52 rounded-full bg-white/20 shimmer" />

          {/* title */}
          <div className="space-y-3">
            <div className="h-10 w-[80%] rounded-lg bg-white/20 shimmer" />
            <div className="h-10 w-[60%] rounded-lg bg-white/20 shimmer" />
          </div>

          {/* paragraph */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-white/20 shimmer" />
            <div className="h-4 w-[90%] rounded bg-white/20 shimmer" />
            <div className="h-4 w-[70%] rounded bg-white/20 shimmer" />
          </div>

          {/* buttons */}
          <div className="flex gap-4 mt-6">
            <div className="h-14 w-40 rounded-2xl bg-white/20 shimmer" />
            <div className="h-14 w-32 rounded-2xl bg-white/20 shimmer" />
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            <div className="h-20 rounded-2xl bg-white/20 shimmer" />
            <div className="h-20 rounded-2xl bg-white/20 shimmer" />
            <div className="h-20 rounded-2xl bg-white/20 shimmer col-span-2 sm:col-span-1" />
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex items-center justify-center min-h-[500px]">

          {/* main card */}
          <div className="w-full max-w-[600px] rounded-[2rem] bg-white/10 p-6 shimmer">
            <div className="h-[300px] w-full rounded-[1.5rem] bg-white/20" />
          </div>

          {/* floating ipad */}
          <div className="absolute -left-4 top-0 w-[140px] h-[180px] rounded-3xl bg-white/20 shimmer" />

          {/* floating note */}
          <div className="absolute bottom-0 right-0 w-[120px] h-[140px] rounded-2xl bg-white/20 shimmer" />

          {/* badge */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 h-8 w-40 rounded-full bg-white/20 shimmer" />
        </div>
      </div>
    </section>
  )
}

export default BannerSkeleton