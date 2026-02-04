"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`} />
);

const ItemRowSkeleton = () => (
  <div className="flex items-start justify-between gap-3 rounded-lg border p-4">
    <div className="flex-1 min-w-0">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="mt-2 h-3 w-1/2" />

      <div className="mt-3 flex flex-wrap gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <Skeleton className="mt-3 h-4 w-40" />
    </div>

    <Skeleton className="h-5 w-20" />
  </div>
);

export default function CheckoutSkeleton() {
  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="w-full">
          <Skeleton className="h-10 xs:h-12 lg:h-16 w-48 md:w-72" />
          <Skeleton className="mt-3 h-4 w-full max-w-lg" />
        </div>

        <div className="shrink-0">
          <Skeleton className="h-12 w-40 rounded-md" />
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_540px]">
        {/* Left: Items */}
        <div className="rounded-xl border bg-white p-5">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="mt-2 h-4 w-24" />

          <div className="mt-4 space-y-3">
            <ItemRowSkeleton />
            <ItemRowSkeleton />
            <ItemRowSkeleton />
          </div>
        </div>

        {/* Right: Summary */}
        <div className="h-fit rounded-xl border bg-white p-5">
          <Skeleton className="h-6 w-28" />

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-3">
            <Skeleton className="h-4 w-48" />
          </div>

          <Skeleton className="mt-5 h-12 w-full rounded-md" />
          <Skeleton className="mt-3 h-3 w-44" />
        </div>
      </div>
    </div>
  );
}
