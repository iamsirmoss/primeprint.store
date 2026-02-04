"use client";

import React from "react";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`} />
);

export default function ProfileSkeleton() {
  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] mt-16 mb-40">
      {/* Divider */}
      <Skeleton className="h-px w-full" />

      {/* Title */}
      <div className="py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col items-center">
        <div className="mb-8 w-full text-center">
          <Skeleton className="mx-auto h-8 md:h-10 w-40" />
        </div>
      </div>

      {/* Avatar */}
      <div className="mt-10 flex justify-center">
        <Skeleton className="size-24 rounded-full" />
      </div>

      {/* Update user form skeleton */}
      <div className="mt-10 space-y-4 p-4 rounded-b-md border border-t-8 border-blue-200">
        <Skeleton className="h-7 w-48" />

        <div className="space-y-4 mt-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      {/* Change password form skeleton */}
      <div className="mt-10 space-y-4 p-4 rounded-b-md border border-t-8 border-red-200">
        <Skeleton className="h-7 w-56" />

        <div className="space-y-4 mt-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
}
