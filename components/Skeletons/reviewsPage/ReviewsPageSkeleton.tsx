"use client";

import React from "react";

const ReviewCardSkeleton = () => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-200" />

        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-24 rounded bg-gray-100" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-4 w-4 rounded bg-gray-200" />
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-[95%] rounded bg-gray-100" />
        <div className="h-4 w-[88%] rounded bg-gray-100" />
        <div className="h-4 w-[60%] rounded bg-gray-100" />
      </div>

      <div className="mt-5 h-3 w-24 rounded bg-gray-100" />
    </div>
  );
};

const ReviewsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-50 py-16 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="max-w-4xl animate-pulse">
          <div className="h-4 w-36 rounded bg-blue-100" />
          <div className="mt-4 h-10 w-56 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-full max-w-2xl rounded bg-gray-100" />
          <div className="mt-2 h-4 w-[80%] max-w-xl rounded bg-gray-100" />

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm w-40">
              <div className="h-3 w-20 rounded bg-gray-100" />
              <div className="mt-3 h-7 w-16 rounded bg-gray-200" />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm w-40">
              <div className="h-3 w-24 rounded bg-gray-100" />
              <div className="mt-3 h-7 w-20 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-lg animate-pulse">
            <div className="h-12 w-full rounded border-b border-gray-200 bg-gray-50" />
          </div>

          <div className="flex flex-wrap gap-3 animate-pulse">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-10 w-24 rounded-2xl border border-gray-200 bg-gray-100"
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <ReviewCardSkeleton key={index} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-pulse">
          <div className="h-10 w-24 rounded-2xl border border-gray-200 bg-gray-100" />
          <div className="h-10 w-10 rounded-2xl border border-gray-200 bg-gray-100" />
          <div className="h-10 w-10 rounded-2xl border border-gray-200 bg-gray-100" />
          <div className="h-10 w-10 rounded-2xl border border-gray-200 bg-gray-100" />
          <div className="h-10 w-24 rounded-2xl border border-gray-200 bg-gray-100" />
        </div>
      </section>
    </div>
  );
};

export default ReviewsPageSkeleton;