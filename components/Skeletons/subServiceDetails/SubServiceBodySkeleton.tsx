"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`} />
);

const PackageCardSkeleton = () => {
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Tier pill */}
          <Skeleton className="h-6 w-20 rounded-full" />

          {/* Name */}
          <Skeleton className="mt-4 h-6 w-3/4" />

          {/* Description (2 lines) */}
          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Thumbnail */}
        <Skeleton className="h-12 w-12 rounded-2xl" />
      </div>

      {/* Price box */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="mt-3 h-8 w-40" />
        <Skeleton className="mt-2 h-3 w-24" />
      </div>

      {/* Points */}
      <div className="mt-5 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Skeleton className="h-12 w-full rounded-2xl" />
        <Skeleton className="mt-3 h-3 w-56" />
      </div>
    </div>
  );
};

export default function SubServiceBodySkeleton() {
  return (
    <section className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] pb-14">
      {/* Intro */}
      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl w-full">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="mt-4 h-10 xs:h-12 lg:h-16 w-2/3" />

            <div className="mt-5 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-9/12" />
            </div>
          </div>

          {/* Billing toggle skeleton */}
          <div className="w-full md:w-[260px]">
            <div className="inline-flex w-full items-center rounded-2xl border border-gray-200 bg-gray-50 p-1">
              <Skeleton className="h-9 w-1/2 rounded-xl" />
              <Skeleton className="h-9 w-1/2 rounded-xl" />
            </div>
            <Skeleton className="mt-2 h-3 w-44" />
          </div>
        </div>
      </div>

      {/* Packages header */}
      <div className="mt-10 flex items-end justify-between gap-4">
        <div className="w-full">
          <Skeleton className="h-10 xs:h-12 lg:h-16 w-1/3" />
          <Skeleton className="mt-4 h-4 w-72" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Packages grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <PackageCardSkeleton />
        <PackageCardSkeleton />
        <PackageCardSkeleton />
      </div>

      {/* Note */}
      <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6">
        <Skeleton className="h-5 w-64" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-8/12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
