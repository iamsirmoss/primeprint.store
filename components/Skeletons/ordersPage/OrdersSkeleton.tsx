"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`} />
);

const OrderRowSkeleton = () => {
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Left */}
        <div className="min-w-0">
          <Skeleton className="h-5 w-72" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>

        {/* Right */}
        <div className="text-right">
          <Skeleton className="h-5 w-24 ml-auto" />
          <Skeleton className="mt-2 h-6 w-20 ml-auto rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default function OrdersSkeleton() {
  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-20 min-h-screen">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <Skeleton className="h-10 xs:h-12 lg:h-16 w-60" />
          <Skeleton className="mt-3 h-4 w-72" />
        </div>

        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>

      {/* Orders list */}
      <div className="mt-8 space-y-3">
        <OrderRowSkeleton />
        <OrderRowSkeleton />
        <OrderRowSkeleton />
        <OrderRowSkeleton />
      </div>
    </div>
  );
}
