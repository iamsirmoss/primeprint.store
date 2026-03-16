"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock7, Search, Star } from "lucide-react";

interface ReviewProps {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  } | null;
  product: {
    title: string;
    slug: string;
  };
}

const ITEMS_PER_PAGE = 9;

const formatRelativeDate = (dateValue: string) => {
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

const ReviewsPageClient = ({ reviews }: { reviews: ReviewProps[] }) => {
  const [query, setQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReviews = useMemo(() => {
    let list = reviews;

    if (selectedRating !== "all") {
      list = list.filter((review) => review.rating === selectedRating);
    }

    const q = query.trim().toLowerCase();

    if (q) {
      list = list.filter((review) => {
        const productTitle = review.product.title.toLowerCase();
        const comment = review.comment.toLowerCase();
        const userName = (review.user?.name ?? "").toLowerCase();

        return (
          productTitle.includes(q) ||
          comment.includes(q) ||
          userName.includes(q)
        );
      });
    }

    return list;
  }, [reviews, query, selectedRating]);

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);

  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredReviews.slice(start, end);
  }, [filteredReviews, currentPage]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  const handleFilterRating = (value: number | "all") => {
    setSelectedRating(value);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-50 py-16 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500">
            Customer feedback
          </p>
          <h1 className="mt-3 text-3xl xs:text-4xl lg:text-6xl font-bold text-black">
            All Reviews
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl">
            Read what customers are saying about our products and services.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs text-gray-500">Total reviews</p>
              <h3 className="mt-1 text-2xl font-bold text-black">
                {reviews.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs text-gray-500">Average rating</p>
              <h3 className="mt-1 text-2xl font-bold text-black">
                {averageRating.toFixed(1)} / 5
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-lg">
            <Search className="absolute left-0 top-1/2 size-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by customer, product or comment..."
              className="w-full border-0 border-b border-gray-300 bg-transparent pl-8 py-3 text-sm md:text-base text-black outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleFilterRating("all")}
              className={`rounded-2xl border px-4 py-2 text-sm transition-all duration-300 ${
                selectedRating === "all"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200 hover:bg-gray-100"
              }`}
            >
              All
            </button>

            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleFilterRating(rating)}
                className={`rounded-2xl border px-4 py-2 text-sm transition-all duration-300 ${
                  selectedRating === rating
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-black border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500"
                }`}
              >
                {rating} Star{rating > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-gray-200 bg-slate-50 p-6 text-gray-600">
            No reviews found.
          </div>
        ) : (
          <>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedReviews.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={item.user?.image || "/images/avatar.png"}
                        alt={item.user?.name || "Customer"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="truncate text-sm font-semibold text-black">
                        {item.user?.name || "Anonymous Customer"}
                      </h3>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="truncate text-xs text-blue-500 hover:text-blue-700"
                      >
                        {item.product.title}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < item.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-gray-600 min-h-[110px]">
                    {item.comment || "Great service and excellent experience."}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                    <Clock7 size={15} />
                    <span>{formatRelativeDate(item.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
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
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default ReviewsPageClient;