"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`} />
);

const CartItemSkeleton = () => (
  <div className="flex gap-4 rounded-lg bg-slate-100 p-4">
    {/* Image */}
    <Skeleton className="h-20 w-20 rounded-lg" />

    {/* Content */}
    <div className="flex-1">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-2 h-3 w-1/3" />

          <div className="mt-3 flex gap-2 flex-wrap">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>

          <Skeleton className="mt-3 h-3 w-32" />
        </div>

        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        {/* Qty */}
        <Skeleton className="h-10 w-32 rounded-lg" />

        {/* Price */}
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

export default function CartSkeleton() {
  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] min-h-screen">
      {/* Title */}
      <Skeleton className="h-10 xs:h-12 lg:h-16 w-52" />
      <Skeleton className="mt-4 h-px w-full" />

      <div className="py-20 grid gap-6 md:grid-cols-[1fr_580px]">
        {/* LEFT: Items */}
        <div className="space-y-4">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>

        {/* RIGHT: Summary */}
        <div className="h-fit rounded-lg border bg-white p-5">
          <Skeleton className="h-6 w-28" />

          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          <Skeleton className="mt-6 h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
