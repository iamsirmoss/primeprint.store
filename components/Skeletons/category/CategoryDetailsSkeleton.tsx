"use client";

export default function CategoryDetailsSkeleton() {
  return (
    <main className="min-h-screen w-full animate-pulse">
      {/* HEADER */}
      <section className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-2 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 flex-wrap bg-slate-50 py-2 px-5 rounded mb-10">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* LEFT */}
          <div>
            <div className="h-8 w-60 bg-gray-300 rounded mb-4" />

            <div className="space-y-2">
              <div className="h-4 w-full max-w-xl bg-gray-200 rounded" />
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="h-8 w-32 bg-gray-200 rounded-full" />
              <div className="h-8 w-28 bg-gray-200 rounded-full" />
              <div className="h-8 w-36 bg-gray-200 rounded-full" />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="aspect-16/10 w-full rounded-2xl bg-gray-200" />
        </div>
      </section>

      {/* SUBCATEGORIES */}
      <section className="px-4 pb-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="h-6 w-40 bg-gray-300 rounded mb-5" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl border p-4">
                <div className="aspect-4/3 w-full bg-gray-200 rounded-xl mb-4" />
                <div className="h-5 w-32 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 rounded mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 py-8 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="h-6 w-32 bg-gray-300 rounded mb-6" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl border p-4">
                <div className="aspect-square w-full bg-gray-200 rounded-xl mb-4" />
                <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-1/3 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}