"use client";

import React, { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../ProductCard";
import { AiOutlineProduct } from "react-icons/ai";

interface ProductProps {
  id: string;
  serviceId?: string | null;
  slug: string;
  title: string;
  description: string;
  price: number;
  basePriceCents?: number;
  compareAtPriceCents?: number | null;
  images: string[];
  currency: string;
  stockQty?: number | null;
  lowStockThreshold?: number | null;
  sku?: string | null;
  isActive?: boolean;
  isFeatured?: boolean;
  requiresUpload?: boolean;
  requiresApproval?: boolean;
  requiresAppointment?: boolean;
  type?: string;
  salesChannel?: string;
  category?: {
    name: string;
    slug: string;
  } | null;
  service?: {
    title: string;
    slug: string;
  } | null;
  ratingAverage?: number | null;
  reviewCount?: number;
}

interface ServiceFilter {
  id: string;
  slug: string;
  title: string;
}

type ServiceFilterValue = "all" | "other" | string;

const ITEMS_PER_PAGE = 8;

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
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page") ?? "1")
  );

  useEffect(() => {
    const spService = (searchParams.get("service") ?? "all").toLowerCase();
    const spQ = searchParams.get("q") ?? "";
    const spPage = Number(searchParams.get("page") ?? "1");

    setSelectedService(spService || "all");
    setQ(spQ);
    setCurrentPage(spPage > 0 ? spPage : 1);
  }, [searchParams]);

  const serviceSlugToId = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of services) map.set(s.slug.toLowerCase(), s.id);
    return map;
  }, [services]);

  const updateUrl = (
    nextService: ServiceFilterValue,
    nextQ: string,
    nextPage: number
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!nextService || nextService === "all") params.delete("service");
    else params.set("service", nextService);

    if (!nextQ.trim()) params.delete("q");
    else params.set("q", nextQ.trim());

    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const onSelectService = (value: ServiceFilterValue) => {
    setSelectedService(value);
    setCurrentPage(1);
    updateUrl(value, q, 1);
  };

  const onSearch = (value: string) => {
    setQ(value);
    setCurrentPage(1);
    updateUrl(selectedService, value, 1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    updateUrl(selectedService, q, page);
  };

  const filteredProducts = useMemo(() => {
    let list = products;

    if (selectedService === "other") {
      list = list.filter((p) => !p.serviceId);
    } else if (selectedService !== "all") {
      const serviceId = serviceSlugToId.get(selectedService.toLowerCase());
      if (serviceId) list = list.filter((p) => p.serviceId === serviceId);
      else list = [];
    }

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

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const otherCount = useMemo(
    () => products.filter((p) => !p.serviceId).length,
    [products]
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
      updateUrl(selectedService, q, 1);
    }
  }, [currentPage, totalPages, selectedService, q]);

  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl xs:text-3xl lg:text-5xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">
            Browse products and filter by service.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-lg relative">
          <AiOutlineProduct className="absolute top-1.5 size-5 md:size-6" />
          <input
            type="text"
            value={q}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search products..."
            className="peer w-full bg-transparent pl-9 py-2 focus:outline-none text-sm md:text-base text-black"
          />
          <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
          <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
        </div>

        <button
          type="button"
          onClick={() => {
            setQ("");
            setSelectedService("all");
            setCurrentPage(1);
            updateUrl("all", "", 1);
          }}
          className="rounded-2xl text-white bg-black px-4 py-3 text-sm font-medium hover:bg-black/75 cursor-pointer transition-all duration-300"
        >
          Reset filters
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <button
          onClick={() => onSelectService("all")}
          className={`rounded-2xl py-2 px-4 transition-all duration-300 border ${
            selectedService === "all"
              ? "bg-red-500 border-red-500 text-white"
              : "bg-white border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500 text-black"
          }`}
        >
          <p className="text-sm">All</p>
        </button>

        <button
          onClick={() => onSelectService("other")}
          className={`rounded-2xl py-2 px-4 transition-all duration-300 border ${
            selectedService === "other"
              ? "bg-red-500 border-red-500 text-white"
              : "bg-white border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500 text-black"
          }`}
        >
          <p className="text-sm">Others ({otherCount})</p>
        </button>

        {services.map((s) => {
          const active = selectedService === s.slug.toLowerCase();
          return (
            <button
              key={s.id}
              onClick={() => onSelectService(s.slug)}
              className={`rounded-2xl py-2 px-4 transition-all duration-300 border ${
                active
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-white border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500 text-black"
              }`}
              title={s.title}
            >
              <p className="text-sm truncate capitalize">{s.title}</p>
            </button>
          );
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-6 text-gray-600">
          No products found for this filter.
        </div>
      ) : (
        <>
          <div className="mt-16 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                title={product.title}
                description={product.description ?? ""}
                price={product.price}
                basePriceCents={product.basePriceCents}
                compareAtPriceCents={product.compareAtPriceCents}
                images={product.images}
                currency={product.currency ?? "USD"}
                stockQty={product.stockQty}
                lowStockThreshold={product.lowStockThreshold}
                sku={product.sku}
                isActive={product.isActive}
                isFeatured={product.isFeatured}
                requiresUpload={product.requiresUpload}
                requiresApproval={product.requiresApproval}
                requiresAppointment={product.requiresAppointment}
                type={product.type}
                salesChannel={product.salesChannel}
                category={product.category}
                service={product.service}
                ratingAverage={product.ratingAverage}
                reviewCount={product.reviewCount}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-2xl border px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all duration-300"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`rounded-2xl border px-4 py-2 text-sm transition-all duration-300 ${
                  currentPage === page
                    ? "bg-black text-white border-black"
                    : "bg-white text-black hover:bg-gray-100 border-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-2xl border px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;