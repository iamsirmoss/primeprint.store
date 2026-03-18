"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { RiShoppingCartFill } from "react-icons/ri";
import { addPackageToCart } from "@/lib/cart";

type Tier = "STARTER" | "GROWTH" | "ULTIMATE";

interface PackageDetailsClientProps {
  pkg: {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    image: string | null;
    tier: Tier;
    currency: string;
    priceMonthCents: number;
    priceYearCents: number;
    monthlyPrice: number;
    yearlyPrice: number;
    deliveryDays: number | null;
    points: string[];
    createdAt: Date;
    updatedAt: Date;
    service: {
      slug: string;
      title: string;
    } | null;
    subService: {
      id: string;
      slug: string;
      title: string;
    } | null;
  };
}

function formatPrice(value: number | null | undefined, currency = "USD") {
  if (value === null || value === undefined) return null;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

function tierLabel(tier: Tier) {
  if (tier === "STARTER") return "Starter";
  if (tier === "GROWTH") return "Growth";
  return "Ultimate";
}

function tierTagClasses(tier: Tier) {
  switch (tier) {
    case "STARTER":
      return "bg-gray-900 text-white";
    case "GROWTH":
      return "bg-gray-100 text-gray-900 border border-gray-200";
    case "ULTIMATE":
      return "bg-black text-white";
    default:
      return "bg-gray-900 text-white";
  }
}

export default function PackageDetailsClient({
  pkg,
}: PackageDetailsClientProps) {
  const hasMonthly =
    typeof pkg.priceMonthCents === "number" && pkg.priceMonthCents > 0;
  const hasYearly =
    typeof pkg.priceYearCents === "number" && pkg.priceYearCents > 0;

  const [billing, setBilling] = useState<"month" | "year">(
    hasMonthly ? "month" : "year"
  );

  const effectiveBilling = useMemo<"month" | "year">(() => {
    if (billing === "month" && hasMonthly) return "month";
    if (billing === "year" && hasYearly) return "year";
    if (hasMonthly) return "month";
    return "year";
  }, [billing, hasMonthly, hasYearly]);

  const selectedPriceCents =
    effectiveBilling === "month" ? pkg.priceMonthCents : pkg.priceYearCents;

  const formattedPrice = formatPrice(selectedPriceCents, pkg.currency);

  const handleAddToCart = () => {
    if (selectedPriceCents === null || selectedPriceCents === undefined) {
      toast.error("This package has no price for the selected billing.");
      return;
    }

    addPackageToCart({
      packageId: pkg.id,
      subServiceId: pkg.subService?.id ?? "",
      serviceSlug: pkg.service?.slug ?? "",
      subServiceTitle: pkg.subService?.title ?? pkg.name,
      tier: pkg.tier,
      name: pkg.name,
      billing: effectiveBilling,
      unitPrice: selectedPriceCents,
      currency: pkg.currency ?? "USD",
      image: pkg.image ?? null,
    });

    toast.success(
      `${pkg.name} added (${effectiveBilling === "month" ? "Monthly" : "Yearly"}) ✅`
    );
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6 mt-4 md:mt-12">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_420px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tierTagClasses(
                  pkg.tier
                )}`}
              >
                {tierLabel(pkg.tier)}
              </span>

              {pkg.service && (
                <Link
                  href={`/service/${pkg.service.slug}`}
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  {pkg.service.title}
                </Link>
              )}

              {pkg.subService && pkg.service && (
                <>
                  <span className="text-gray-300">•</span>
                  <Link
                    href={`/service/${pkg.service.slug}/${pkg.subService.slug}`}
                    className="text-sm text-gray-500 hover:text-black transition"
                  >
                    {pkg.subService.title}
                  </Link>
                </>
              )}
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold">{pkg.name}</h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {pkg.description || "No description available."}
            </p>

            {pkg.points?.length > 0 && (
              <ul className="mt-6 space-y-3">
                {pkg.points.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm md:text-base text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {pkg.deliveryDays && (
              <p className="mt-6 text-sm text-gray-500">
                Delivery in {pkg.deliveryDays} days
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
            {pkg.image && (
              <div className="relative mb-5 h-[220px] w-full overflow-hidden rounded-2xl bg-white">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {(hasMonthly || hasYearly) && (
              <div className="mb-5">
                <div className="inline-flex w-full items-center rounded-2xl border border-gray-200 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setBilling("month")}
                    disabled={!hasMonthly}
                    className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer ${
                      effectiveBilling === "month"
                        ? "bg-black text-white"
                        : "text-gray-500 hover:text-black"
                    } ${!hasMonthly ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBilling("year")}
                    disabled={!hasYearly}
                    className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer ${
                      effectiveBilling === "year"
                        ? "bg-black text-white"
                        : "text-gray-500 hover:text-black"
                    } ${!hasYearly ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Price</p>

              {formattedPrice ? (
                <div className="mt-2">
                  <p className="text-3xl font-bold text-gray-900">
                    {formattedPrice}
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      /{effectiveBilling === "month" ? "mo" : "yr"}
                    </span>
                  </p>

                  {hasMonthly && hasYearly && (
                    <p className="mt-2 text-xs text-gray-500">
                      Choose the billing cycle that fits your needs.
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-2 text-base font-semibold text-gray-900">
                  Contact us for pricing
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-black/80 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <RiShoppingCartFill className="text-sm" />
                Add to cart
              </button>

              {pkg.service && (
                <Link
                  href={`/service/${pkg.service.slug}`}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 text-center hover:bg-gray-50 transition"
                >
                  View service
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}