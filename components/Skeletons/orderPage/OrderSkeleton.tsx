"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`} />
);

const ItemRowSkeleton = () => {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
      <div className="min-w-0 flex-1">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="mt-2 h-3 w-1/2" />
        <Skeleton className="mt-2 h-3 w-1/3" />
      </div>

      <div className="shrink-0 text-right">
        <Skeleton className="h-4 w-28 ml-auto" />
        <Skeleton className="mt-2 h-5 w-20 ml-auto" />
      </div>
    </div>
  );
};

export default function OrderReviewSkeleton() {
  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 xs:h-12 lg:h-16 w-60" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>

      {/* Status box */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Content */}
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_420px]">
        {/* Items */}
        <div className="rounded-xl border bg-white p-5">
          <Skeleton className="h-6 w-28" />

          <div className="mt-4 space-y-3">
            <ItemRowSkeleton />
            <ItemRowSkeleton />
            <ItemRowSkeleton />
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Skeleton className="h-12 w-1/2 rounded-lg" />
            <Skeleton className="h-12 w-1/2 rounded-lg" />
          </div>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border bg-white p-5">
          <Skeleton className="h-6 w-28" />

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="pt-3 mt-3 border-t flex items-center justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-7 w-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
