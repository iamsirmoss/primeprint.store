"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";

type Review = {
  id: string;
  name: string;
  dateLabel: string;
  rating: number;
  text: string;
};

type ProductDetailsProps = {
  product: {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    price: number;
    images: string[];
    sku?: string | null;
  };
  reviews: Review[];
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function Stars({ value, size = "text-sm" }: { value: number; size?: string }) {
  const full = Math.round(value);
  return (
    <div className={`flex items-center gap-1 ${size}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState<"details" | "reviews" | "discussion">("reviews");

  // Exemple: options (tu peux brancher tes vraies options)
  const colors = [
    { id: "white", name: "White", swatch: "bg-gray-100 border border-gray-200" },
    { id: "black", name: "Black", swatch: "bg-gray-900" },
  ];
  const sizes = ["40.5", "41", "42", "43", "43.5", "44", "44.5", "45", "46"];

  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [selectedSize, setSelectedSize] = useState<string>("41");

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  }, [reviews]);

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;
    for (const r of reviews) counts[r.rating as 1 | 2 | 3 | 4 | 5]++;
    return counts;
  }, [reviews]);

  const totalReviews = reviews.length || 1;

  const mainImage = product.images?.[activeImage] || product.images?.[0];

  const addToCart = () => {
    // localStorage.setItem("cart", JSON.stringify([...]))
    alert(`Added to cart:\n${product.title}\nColor: ${selectedColor}\nSize: ${selectedSize}`);
  };

  return (
    <main className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-6 md:py-10">
      {/* Top layout */}
      <section className="grid gap-6 lg:grid-cols-12">
        {/* LEFT: Gallery */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-gray-200 bg-white p-3 md:p-4">
            {/* Main image */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gray-50">
              {mainImage ? (
                <Image
                  src={`/images/${mainImage}`}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width:1024px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {(product.images ?? []).slice(0, 6).map((img, i) => {
                const active = i === activeImage;
                return (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition ${
                      active ? "border-gray-900" : "border-gray-200 hover:border-gray-300"
                    } bg-gray-50`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={`/images/${img}`} alt="" fill className="object-contain" sizes="64px" />
                  </button>
                );
              })}
              {(product.images?.length ?? 0) > 6 && (
                <div className="h-16 w-16 shrink-0 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-600">
                  +{(product.images.length ?? 0) - 6} more
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Product info */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">PrimePrint</p>
                <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>

                <div className="mt-2 flex items-center gap-3">
                  <Stars value={avgRating} />
                  <span className="text-sm text-gray-600">{reviews.length} reviews</span>
                </div>
              </div>

              {product.sku ? (
                <div className="text-right">
                  <p className="text-[11px] text-gray-500">SKU</p>
                  <p className="text-xs font-semibold text-gray-900">{product.sku}</p>
                </div>
              ) : null}
            </div>

            <p className="mt-5 text-3xl font-bold text-gray-900">{formatMoney(product.price)}</p>

            {/* Color */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900">Color</p>
              <div className="mt-3 flex items-center gap-3">
                {colors.map((c) => {
                  const active = c.id === selectedColor;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColor(c.id)}
                      className={`h-10 w-10 rounded-2xl ${c.swatch} ${
                        active ? "ring-2 ring-gray-900 ring-offset-2" : "ring-0"
                      }`}
                      aria-label={c.name}
                      title={c.name}
                    />
                  );
                })}
                <span className="text-sm text-gray-600">{colors.find(c => c.id === selectedColor)?.name}</span>
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Size</p>
                <button className="text-sm text-gray-600 hover:underline" type="button">
                  Size guide
                </button>
              </div>

              <div className="mt-3 grid grid-cols-5 gap-2">
                {sizes.map((s) => {
                  const active = s === selectedSize;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`rounded-xl border px-2 py-2 text-sm font-medium transition ${
                        active
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={addToCart}
                className="flex-1 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-black/70 transition-all duration-300 cursor-pointer"
              >
                Add to cart
              </button>

              <button
                type="button"
                className="h-12 w-12 rounded-2xl border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Add to wishlist"
              >
                <Heart size={18} />
              </button>
            </div>

            {/* <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <span>🚚</span>
              <span>Free delivery on orders over $30</span>
            </div> */}

            {/* Short description */}
            {product.description ? (
              <p className="mt-6 text-sm text-gray-600 line-clamp-3">
                {product.description}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Tabs section */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center gap-4 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setTab("details")}
            className={`px-2 pb-3 text-sm font-semibold transition ${
              tab === "details" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => setTab("reviews")}
            className={`px-2 pb-3 text-sm font-semibold transition ${
              tab === "reviews" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Reviews
          </button>
          <button
            type="button"
            onClick={() => setTab("discussion")}
            className={`px-2 pb-3 text-sm font-semibold transition ${
              tab === "discussion" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Discussion
          </button>
        </div>

        {/* Content grid: reviews list + rating box */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-8">
            {tab === "details" && (
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900">Product details</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {product.description ?? "No details available."}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900" />
                    Premium quality, designed for everyday use
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900" />
                    Custom options available depending on your selection
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900" />
                    Fast turnaround and reliable support
                  </li>
                </ul>
              </div>
            )}

            {tab === "reviews" && (
              <div className="space-y-4">
                {/* Sort row */}
                <div className="flex items-center justify-between">
                  <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
                    <option>Newest</option>
                    <option>Highest rating</option>
                    <option>Lowest rating</option>
                  </select>

                  <button className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50">
                    Write a review
                  </button>
                </div>

                {/* Reviews list */}
                <div className="rounded-3xl border border-gray-200 bg-white p-6">
                  <div className="space-y-6">
                    {reviews.map((r) => (
                      <div key={r.id} className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-700">
                          {getInitials(r.name)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-semibold text-gray-900">{r.name}</p>
                              <p className="text-xs text-gray-500">{r.dateLabel}</p>
                            </div>
                            <Stars value={r.rating} />
                          </div>

                          <p className="mt-2 text-sm text-gray-700 leading-relaxed">{r.text}</p>

                          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                            <button className="hover:underline" type="button">
                              Reply
                            </button>
                            <span>•</span>
                            <button className="hover:underline" type="button">
                              Helpful
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "discussion" && (
              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900">Discussion</h3>
                <p className="mt-3 text-sm text-gray-600">
                  Coming soon. You can enable Q&A here (questions, answers, votes).
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: rating summary (desktop sidebar) */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overall rating</p>
                  <div className="mt-2 flex items-end gap-3">
                    <p className="text-3xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
                    <div className="pb-1">
                      <Stars value={avgRating} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{reviews.length} reviews</p>
              </div>

              <div className="mt-6 space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = ratingCounts[stars as 1 | 2 | 3 | 4 | 5] ?? 0;
                  const pct = Math.round((count / totalReviews) * 100);
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="w-10 text-sm text-gray-600">{stars}★</span>
                      <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-sm text-gray-600">{count}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-900">Tip</p>
                <p className="mt-1 text-sm text-gray-600">
                  Use “Details” tab to show specs/options, and keep reviews clean for trust.
                </p>
              </div>
            </div>

            {/* Small promo card (like your screenshot) */}
            <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
              <p className="text-sm font-semibold text-gray-900">Popular brands</p>
              <p className="mt-2 text-sm text-gray-600">
                Show a small promo or cross-sell here (printing bundles, add-ons, etc.).
              </p>
              <button className="mt-4 w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90">
                View offers
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
