"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`} />
);

const ReviewRowSkeleton = () => {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
        </div>

        <div className="mt-3 flex items-center gap-4">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-2" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </div>
  );
};

const RatingBarSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-4 w-10" />
      <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
        <Skeleton className="h-2 w-2/3 rounded-full" />
      </div>
      <Skeleton className="h-4 w-6" />
    </div>
  );
};

const ProductDetailsSkeleton = () => {
  return (
    <main className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-6 md:py-10">
      {/* Top layout */}
      <section className="grid gap-6 lg:grid-cols-12">
        {/* LEFT: Gallery */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-gray-200 bg-white p-3 md:p-4">
            {/* Main image */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gray-50">
              <Skeleton className="absolute inset-0 rounded-2xl" />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-16 shrink-0 rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Product info */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-4 h-8 w-4/5" />

                <div className="mt-3 flex items-center gap-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              <div className="text-right">
                <Skeleton className="h-3 w-10 ml-auto" />
                <Skeleton className="mt-2 h-4 w-20 ml-auto" />
              </div>
            </div>

            <Skeleton className="mt-6 h-9 w-40" />

            {/* Color */}
            <div className="mt-6">
              <Skeleton className="h-4 w-16" />
              <div className="mt-3 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-2xl" />
                <Skeleton className="h-10 w-10 rounded-2xl" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="mt-3 grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-xl" />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-7 flex items-center gap-3">
              <Skeleton className="h-12 flex-1 rounded-2xl" />
              <Skeleton className="h-12 w-12 rounded-2xl" />
            </div>

            {/* Short description */}
            <div className="mt-6 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-9/12" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs section */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-4">
            {/* Sort row */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-40 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>

            {/* Reviews list card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="space-y-6">
                <ReviewRowSkeleton />
                <ReviewRowSkeleton />
                <ReviewRowSkeleton />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="flex items-end justify-between">
                <div className="w-full">
                  <Skeleton className="h-4 w-28" />
                  <div className="mt-3 flex items-end gap-3">
                    <Skeleton className="h-10 w-14" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="mt-6 space-y-3">
                <RatingBarSkeleton />
                <RatingBarSkeleton />
                <RatingBarSkeleton />
                <RatingBarSkeleton />
                <RatingBarSkeleton />
              </div>

              <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-4">
                <Skeleton className="h-4 w-16" />
                <div className="mt-2 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-10/12" />
                </div>
              </div>
            </div>

            {/* Promo card */}
            <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
              <Skeleton className="h-4 w-28" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
              </div>
              <Skeleton className="mt-4 h-12 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsSkeleton;
