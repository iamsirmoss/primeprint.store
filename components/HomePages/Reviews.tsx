"use client";

import React from "react";
import { Clock7, Star } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

interface ReviewProps {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date | string;
  user: {
    name: string | null;
    image: string | null;
  } | null;
  product: {
    title: string;
    slug: string;
  };
}

const formatRelativeDate = (dateValue: Date | string) => {
  const date = new Date(dateValue);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week(s) ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month(s) ago`;
  return `${Math.floor(diffInDays / 365)} year(s) ago`;
};

const Reviews = ({ reviews }: { reviews: ReviewProps[] }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] bg-slate-50">
        <h2 className="text-2xl xs:text-3xl lg:text-5xl font-bold">
          Your opinions matter :
          <br />
          Read our latest reviews
        </h2>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 text-gray-500">
          No reviews available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] bg-slate-50">
      <h2 className="text-2xl xs:text-3xl lg:text-5xl font-bold">
        Your opinions matter :
        <br />
        Read our latest reviews
      </h2>

      <div className="w-full xl:w-[95%] rounded-lg flex flex-col items-center justify-center py-5 mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mt-10 px-6"
        >
          <CarouselContent>
            {reviews.slice(0, 6).map((item) => (
              <CarouselItem
                key={item.id}
                className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-1 h-full">
                  <div className="h-full w-full bg-white rounded-2xl border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-sm">
                    <div className="flex items-center gap-2 px-4 py-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <Image
                          src={item.user?.image || "/images/avatar.png"}
                          alt={item.user?.name || "Customer"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-black">
                          {item.user?.name || "Anonymous Customer"}
                        </h5>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {item.product.title}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={15}
                            className={
                              index < item.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <div className="py-2 px-4">
                      <hr />
                      <p className="text-xs md:text-sm py-4 text-gray-500 line-clamp-4 min-h-24">
                        {item.comment || "Great experience and excellent service."}
                      </p>
                      <hr />
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock7 size={16} />
                        <h6 className="text-xs">
                          {formatRelativeDate(item.createdAt)}
                        </h6>
                      </div>

                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-xs font-medium text-blue-500 hover:text-blue-700 transition-all duration-300"
                      >
                        View product
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hover:bg-red-500 hover:text-white" />
          <CarouselNext className="hover:bg-red-500 hover:text-white" />
        </Carousel>
      </div>

      <div className="mt-10 text-xl border-b text-blue-400 w-fit border-b-blue-400">
        <Link
          href="/reviews"
          className="flex items-center gap-2 group text-sm md:text-base"
        >
          View all
          <BsArrowRight className="text-xl group-hover:translate-x-2 transition-all duration-500" />
        </Link>
      </div>
    </div>
  );
};

export default Reviews;