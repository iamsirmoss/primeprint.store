"use client";

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-md bg-gray-200 ${className ?? ""}`}
  />
);

const BannerSkeleton = () => {
  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10">
      {/* Breadcrumb skeleton */}
      <div className="mt-10 flex items-center gap-3 flex-wrap border-b border-slate-200 py-3 px-5">
        <SkeletonBlock className="h-4 w-12" />
        <SkeletonBlock className="h-4 w-4" />
        <SkeletonBlock className="h-4 w-16" />
        <SkeletonBlock className="h-4 w-4" />
        <SkeletonBlock className="h-4 w-24" />
      </div>

      {/* Hero section skeleton */}
      <section className="pt-20 pb-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left content */}
          <div className="max-w-2xl w-full">
            {/* Title */}
            <SkeletonBlock className="h-12 md:h-[72px] w-3/4" />

            {/* Description lines */}
            <div className="mt-6 space-y-3">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-11/12" />
              <SkeletonBlock className="h-4 w-9/12" />
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <SkeletonBlock className="h-14 w-40 rounded" />
              <SkeletonBlock className="h-14 w-36 rounded" />
            </div>
          </div>

          {/* Image placeholder */}
          <div className="w-[220px] md:w-[300px] lg:w-[420px] h-60 rounded-xl border border-gray-200 bg-gray-100 flex items-center justify-center animate-pulse">
            <span className="text-gray-400 text-sm">Image</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerSkeleton;
