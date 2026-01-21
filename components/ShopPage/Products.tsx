// import React from 'react'
// import ProductCard from '../ProductCard'

// interface ProductProps {
//   id: string;
//   slug: string;
//   title: string;
//   description: string | null;
//   price: number;
//   images: string[];
//   currency?: string;
//   stockQty?: number | null;
//   sku?: string | null;
// }

// const Products = ({products}: {products: ProductProps[]}) => {
//   return (
//       <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
//             <h1 className='text-5xl font-bold'></h1>
//             <div className='mt-12 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
//                   <button className='bg-red-500 rounded py-2 px-4'>
//                         <h5 className='text-white text-sm'>All</h5>
//                   </button>
//                   {
//                        Array.from({ length: 5 }).map((_, index) => (
//                               <button className='border rounded py-2 px-4 hover:bg-red-500 hover:text-white transition-all duration-500' 
//                               key={index}>
//                                     <h5 className='text-sm'>Lorem</h5>
//                               </button>
//                        )) 
//                   }
//             </div>
//             <div className='mt-16 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8'>
//                   {
//                         products.map((product) => (
//                               <ProductCard 
//                                     key={product.id} 
//                                     id={product.id}
//                                     slug={product.slug}
//                                     title={product.title}
//                                     description={product.description ?? ""}
//                                     price={product.price}
//                                     images={product.images}
//                                     currency={product.currency ?? "USD"}
//                                     stockQty={product.stockQty ?? null}
//                                     sku={product.sku ?? null}
//                                />
//                         ))
//                   }
//             </div>
//       </div>
//   )
// }

// export default Products

"use client";

import React, { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../ProductCard";

interface ProductProps {
  id: string;
  serviceId?: string | null;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  images: string[];
  currency?: string;
  stockQty?: number | null;
  sku?: string | null;
}

interface ServiceFilter {
  id: string;
  slug: string;
  title: string;
}

type ServiceFilterValue = "all" | "other" | string; // string = serviceSlug

const Products = ({
  products,
  services,
  title = "Products",
}: {
  products: ProductProps[];
  services: ServiceFilter[];
  title?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const serviceParam = (searchParams.get("service") ?? "all").toLowerCase();
  const initialService: ServiceFilterValue = serviceParam || "all";

  const [selectedService, setSelectedService] =
    useState<ServiceFilterValue>(initialService);

  const [q, setQ] = useState(searchParams.get("q") ?? "");

  // keep state in sync if user uses back/forward
  useEffect(() => {
    const spService = (searchParams.get("service") ?? "all").toLowerCase();
    setSelectedService(spService || "all");
    setQ(searchParams.get("q") ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const serviceSlugToId = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of services) map.set(s.slug.toLowerCase(), s.id);
    return map;
  }, [services]);

  const updateUrl = (nextService: ServiceFilterValue, nextQ: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // service
    if (!nextService || nextService === "all") params.delete("service");
    else params.set("service", nextService);

    // query
    if (!nextQ?.trim()) params.delete("q");
    else params.set("q", nextQ.trim());

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const onSelectService = (value: ServiceFilterValue) => {
    setSelectedService(value);
    updateUrl(value, q);
  };

  const onSearch = (value: string) => {
    setQ(value);
    updateUrl(selectedService, value);
  };

  const filteredProducts = useMemo(() => {
    let list = products;

    // 1) service filter
    if (selectedService === "other") {
      list = list.filter((p) => !p.serviceId);
    } else if (selectedService !== "all") {
      const serviceId = serviceSlugToId.get(selectedService.toLowerCase());
      if (serviceId) list = list.filter((p) => p.serviceId === serviceId);
      else list = []; // slug inconnu
    }

    // 2) text search
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((p) => {
        const t = (p.title ?? "").toLowerCase();
        const d = (p.description ?? "").toLowerCase();
        return t.includes(query) || d.includes(query);
      });
    }

    return list;
  }, [products, q, selectedService, serviceSlugToId]);

  const otherCount = useMemo(
    () => products.filter((p) => !p.serviceId).length,
    [products]
  );

  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl xs:text-3xl lg:text-5xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">
            Browse products and filter by service.
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">{filteredProducts.length} item(s)</p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-lg">
          <input
            value={q}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setQ("");
            setSelectedService("all");
            updateUrl("all", "");
          }}
          className="rounded text-white bg-black px-4 py-3 text-sm font-medium hover:bg-black/75 cursor-pointer transition-all duration-300"
        >
          Reset filters
        </button>
      </div>

      {/* FILTERS */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {/* All */}
        <button
          onClick={() => onSelectService("all")}
          className={`rounded py-2 px-4 transition-all duration-300 border ${
            selectedService === "all"
              ? "bg-red-500 border-red-500 text-white"
              : "bg-white border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500 "
          }`}
        >
          <h5 className="text-sm">All</h5>
        </button>

        {/* Others (serviceId null) */}
        <button
          onClick={() => onSelectService("other")}
          className={`rounded py-2 px-4 transition-all duration-300 border ${
            selectedService === "other"
              ? "bg-red-500 border-red-500 text-white"
              : "bg-white border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500"
          }`}
        >
          <h5 className="text-sm">Others ({otherCount})</h5>
        </button>

        {/* Services by slug (shareable) */}
        {services.map((s) => {
          const active = selectedService === s.slug.toLowerCase();
          return (
            <button
              key={s.id}
              onClick={() => onSelectService(s.slug)}
              className={`rounded py-2 px-4 transition-all duration-300 border ${
                active
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-white border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500"
              }`}
              title={s.title}
            >
              <h5 className="text-sm truncate capitalize">{s.title}</h5>
            </button>
          );
        })}
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-6 text-gray-600">
          No products found for this filter.
        </div>
      ) : (
        <div className="mt-16 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              title={product.title}
              description={product.description ?? ""}
              price={product.price}
              images={product.images}
              currency={product.currency ?? "USD"}
              stockQty={product.stockQty ?? null}
              sku={product.sku ?? null}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
