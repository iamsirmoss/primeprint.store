"use client";

import Card from "../Card";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductProps {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  basePriceCents: number;
  images: string[];
  currency?: string;
  stockQty?: number | null;
  sku?: string | null;
  isActive?: boolean;
  isFeatured?: boolean;
  compareAtPriceCents?: number | null;
}

const Test = ({ products }: { products: ProductProps[] }) => {
  return (
    <div className="block lg:flex gap-8 justify-center items-center mt-10 px-4 xl:px-10 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="w-full lg:w-[45%] py-10">
        <h2 className="text-2xl xs:text-3xl lg:text-5xl font-bold">
          Exclusive promotions : Offers you can&apos;t miss
        </h2>

        <p className="my-10 text-base md:text-lg/relaxed text-gray-600">
          Take advantage of our exclusive promotions and explore our showcase of
          limited-time offers today!
        </p>

        <div className="w-fit">
          <Link href="/services" className="group">
            <button
              className="bg-red-500 text-white rounded-2xl px-6 py-3 xs:px-10 xs:py-4 
              shadow-[rgba(13,38,76,0.19)_0px_9px_20px] group-hover:bg-blue-400 
              transition-all duration-500 flex items-center gap-2 cursor-pointer"
            >
              <h5 className="font-semibold text-sm xs:text-base text-white">
                Learn more
              </h5>
              <BsArrowRight className="text-white group-hover:translate-x-2 transition-all duration-500" />
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-[55%] rounded-3xl bg-slate-100 py-8 px-4 md:px-6">
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full"
        >
          <CarouselContent className="h-[620px]">
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-full">
                <div className="h-full p-2">
                  <Card
                    id={product.id}
                    slug={product.slug}
                    title={product.title}
                    description={product.description ?? ""}
                    imageUrl={product.images}
                    price={product.basePriceCents}
                    currency={product.currency ?? "USD"}
                    stockQty={product.stockQty ?? null}
                    sku={product.sku ?? null}
                    isActive={product.isActive}
                    isFeatured={product.isFeatured}
                    compareAtPrice={product.compareAtPriceCents ?? null}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex items-center justify-center gap-3">
            <CarouselPrevious className="static translate-y-0 hover:bg-red-500 hover:text-white" />
            <CarouselNext className="static translate-y-0 hover:bg-red-500 hover:text-white" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Test;