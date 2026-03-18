"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import ProductCard from "../ProductCard";

interface CategoryDetailsClientProps {
  category: {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    image: string | null;
    icon: string | null;
    position: number;
    createdAt: Date;
    updatedAt: Date;
    service: {
      id: string;
      slug: string;
      title: string;
    } | null;
    parent: {
      id: string;
      slug: string;
      name: string;
    } | null;
    children: {
      id: string;
      slug: string;
      name: string;
      description: string | null;
      image: string | null;
      position: number;
    }[];
    products: {
      id: string;
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
      ratingAverage?: number | null;
      reviewCount?: number;
    }[];
  };
}

export default function CategoryDetailsClient({
  category,
}: CategoryDetailsClientProps) {
  return (
    <main className="min-h-screen w-full ">
      <section className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-2 md:py-10">
        <div>
          <div className="flex items-center gap-5 flex-wrap bg-slate-50 py-2 px-5 text-sm rounded mb-10">
                  <Link href="/" className="text-gray-400 hover:underline transition-all duration-500">
                    Home
                  </Link>
                  <ChevronsRight size={20} className="text-black" />
                  <span className="text-gray-400 hover:underline transition-all duration-500">
                    Categories
                  </span>
                  <ChevronsRight size={20} className="text-black" />
                  <span className="font-bold capitalize">{category.name}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {category.name}
              </h1>

              {category.description && (
                <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
                  {category.description}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {category.service && (
                  <Link
                    href={`/service/${category.service.slug}`}
                    className="rounded-full border px-4 py-2 hover:bg-muted"
                  >
                    Service: {category.service.title}
                  </Link>
                )}

                <span className="rounded-full border px-4 py-2">
                  {category.products.length} product
                  {category.products.length > 1 ? "s" : ""}
                </span>

                {category.children.length > 0 && (
                  <span className="rounded-full border px-4 py-2">
                    {category.children.length} subcategor
                    {category.children.length > 1 ? "ies" : "y"}
                  </span>
                )}
              </div>
            </div>

            {category.image && (
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl border">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {category.children.length > 0 && (
        <section className="px-4 pb-4 md:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-5 text-2xl font-semibold">Subcategories</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {category.children.map((child) => (
                <Link
                  key={child.id}
                  href={`/category/${child.slug}`}
                  className="rounded-2xl border p-4 transition hover:shadow-sm"
                >
                  {child.image && (
                    <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-xl">
                      <Image
                        src={child.image}
                        alt={child.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <h3 className="text-lg font-semibold">{child.name}</h3>

                  {child.description && (
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {child.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-8 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl md:text-3xl font-semibold">Products</h2>

          {category.products.length === 0 ? (
            <div className="rounded-2xl border p-8 text-center text-muted-foreground">
              No products available in this category yet.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.products.map((product) => (
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
                        category={category}
                        service={category.service}
                        ratingAverage={product.ratingAverage}
                        reviewCount={product.reviewCount}
                   />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}