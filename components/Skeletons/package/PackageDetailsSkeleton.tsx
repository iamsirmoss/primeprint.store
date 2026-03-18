"use client";

export default function PackageDetailsSkeleton() {
  return (
    <div className="min-h-screen mx-auto mt-4 max-w-5xl animate-pulse p-6 md:mt-12">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_420px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-7 w-24 rounded-full bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-3 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
            </div>

            <div className="mt-4 h-10 w-3/4 rounded bg-gray-300" />

            <div className="mt-4 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
            </div>

            <ul className="mt-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                </li>
              ))}
            </ul>

            <div className="mt-6 h-4 w-36 rounded bg-gray-200" />
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
            <div className="mb-5 h-[220px] w-full rounded-2xl bg-gray-200" />

            <div className="mb-5">
              <div className="inline-flex w-full items-center rounded-2xl border border-gray-200 bg-white p-1">
                <div className="h-10 flex-1 rounded-xl bg-gray-300" />
                <div className="mx-1" />
                <div className="h-10 flex-1 rounded-xl bg-gray-200" />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="h-4 w-12 rounded bg-gray-200" />

              <div className="mt-3 h-10 w-40 rounded bg-gray-300" />
              <div className="mt-2 h-3 w-48 rounded bg-gray-200" />
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <div className="h-12 w-full rounded-2xl bg-gray-300" />
              <div className="h-12 w-full rounded-2xl bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}