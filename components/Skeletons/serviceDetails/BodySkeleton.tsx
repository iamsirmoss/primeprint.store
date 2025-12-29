"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`} />
);

const BodySkeleton = () => {
  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] pb-20">
      {/* SUB-SERVICES */}
      <section className="pb-14">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-3xl w-full">
            <Skeleton className="h-10 xs:h-12 lg:h-16 w-1/2" />
          </div>

          <Skeleton className="h-4 w-20" />
        </div>

        {/* Cards grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-md border border-gray-200 bg-white px-5 py-8"
            >
              <div className="flex items-start gap-4">
                {/* Image skeleton */}
                <div className="h-14 w-14 p-4 shrink-0 rounded-xl border border-gray-200 bg-gray-100 flex items-center justify-center">
                  <Skeleton className="h-full w-full rounded" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Title */}
                  <Skeleton className="h-5 w-3/4" />

                  {/* Description */}
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />

                  {/* Button */}
                  <Skeleton className="h-9 w-24 mt-4 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BodySkeleton;
