"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`} />
);

export default function ContactSkeleton() {
  return (
    <div className="py-12 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] bg-gray-100 min-h-screen">
      {/* Divider */}
      <Skeleton className="h-px w-full" />

      <div className="flex flex-col items-center gap-10 py-10">
        {/* Contact Info Section */}
        <div className="w-full lg:w-[55%] order-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="mt-4 h-5 w-3/4" />

          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 mt-10">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <Skeleton className="h-16 w-16 rounded-xl" />
            <Skeleton className="h-16 w-16 rounded-xl" />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-[60%] order-1 bg-white shadow-lg rounded-md py-12 px-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Message */}
          <div className="mt-10">
            <Skeleton className="h-20 w-full" />
          </div>

          {/* Submit */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Skeleton className="h-14 w-40 rounded-md" />

            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
