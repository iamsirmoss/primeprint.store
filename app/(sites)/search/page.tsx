import Link from "next/link";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  if (!query) {
    return (
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-20 min-h-screen">
        <h1 className="text-2xl xs:text-3xl lg:text-5xl font-bold">Search</h1>
        <p className="mt-4 text-gray-400">
          Please enter a search term.
        </p>
      </div>
    );
  }

  const [products, services, subServices] = await Promise.all([
    prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
          { sku: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        price: true,
        currency: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),

    prisma.service.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
      },
      orderBy: { position: "asc" },
      take: 30,
    }),

    prisma.subService.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
          {
            service: {
              title: { contains: query, mode: "insensitive" },
            },
          },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        image: true,
        service: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
      orderBy: { position: "asc" },
      take: 30,
    }),
  ]);

  const total = products.length + services.length + subServices.length;

  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-20 min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl font-bold">
          Search results
        </h1>
        <p className="text-gray-400">
          Results for:{" "}
          <span className="font-semibold text-blue-400">{query}</span>
        </p>
        <p className="text-sm text-gray-400 underline">{total} result(s) found</p>
      </div>

      {total === 0 ? (
        <div className="mt-8 rounded-lg border bg-white p-6">
          <p className="text-gray-400 underline">No results found.</p>
        </div>
      ) : (
        <div className="mt-10 space-y-10">
          {/* Products */}
          {products.length > 0 && (
            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Products</h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    className="rounded-lg border bg-white p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-sm md:text-lg capitalize">{item.title}</h3>

                        {item.description && (
                          <p className="mt-2 text-xs text-gray-400 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0">
                        <p className="font-bold">
                          {item.price.toFixed(2)} {item.currency}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Services */}
          {services.length > 0 && (
            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold underline">Services</h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((item) => (
                  <Link
                    key={item.id}
                    href={`/service/${item.slug}`}
                    className="rounded-lg border bg-white p-4 hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="font-semibold text-sm md:text-lg capitalize">{item.title}</h3>

                    {item.description && (
                      <p className="mt-2 text-xs text-gray-400 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Sub-services */}
          {subServices.length > 0 && (
            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold underline">Sub-services</h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {subServices.map((item) => (
                  <Link
                    key={item.id}
                    href={`/service/sub-service/${item.slug}`}
                    className="rounded-lg border bg-white p-4 hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="font-semibold text-sm md:text-lg capitalize">{item.title}</h3>

                    <p className="mt-2 text-xs text-gray-400 underline">
                      Under:{" "}
                      <span className="">
                        {item.service.title}
                      </span>
                    </p>

                    {item.description && (
                      <p className="mt-3 text-xs text-gray-400 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}