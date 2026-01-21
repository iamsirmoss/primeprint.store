"use client";

import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { addPackageToCart } from "@/lib/cart";

type Tier = "STARTER" | "GROWTH" | "ULTIMATE";

type PackageItem = {
  id: string;
  tier: Tier;
  name: string;
  description: string | null;
  priceByMonth: number | null;
  priceByYear: number | null;
  image: string | null;
  points: string[];
  currency?: string | null;
};

type SubServiceForBody = {
  id: string;
  title: string;
  description: string | null;
  packages: PackageItem[];
  service: { slug: string; title: string };
};

function formatPrice(value: number | null) {
  if (value === null || value === undefined) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
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
  }
}

function tierCardRing(tier: Tier) {
  switch (tier) {
    case "ULTIMATE":
      return "ring-2 ring-black";
    default:
      return "ring-1 ring-gray-200";
  }
}

export default function Body({ service }: { service: SubServiceForBody }) {
  const [billing, setBilling] = useState<"month" | "year">("month");

  const packagesSorted = useMemo(() => {
    const order: Record<Tier, number> = { STARTER: 1, GROWTH: 2, ULTIMATE: 3 };
    return [...(service.packages ?? [])].sort(
      (a, b) => order[a.tier] - order[b.tier]
    );
  }, [service.packages]);

  const hasMonthly = packagesSorted.some((p) => p.priceByMonth !== null);
  const hasYearly = packagesSorted.some((p) => p.priceByYear !== null);

  const showToggle = (hasMonthly && hasYearly) || (hasMonthly && !hasYearly) || (!hasMonthly && hasYearly);

  const effectiveBilling: "month" | "year" = useMemo(() => {
    if (hasMonthly && billing === "month") return "month";
    if (hasYearly && billing === "year") return "year";
    // fallback
    if (hasMonthly) return "month";
    return "year";
  }, [billing, hasMonthly, hasYearly]);

  return (
    <section className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] pb-14">
      {/* Intro */}
      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              {service.service.title}
            </p>
            <h2 className="mt-2 text-2xl xs:text-3xl lg:text-5xl font-bold capitalize">
              {service.title}
            </h2>

            {service.description ? (
              <p className="mt-3 text-gray-600 leading-relaxed">
                {service.description}
              </p>
            ) : (
              <p className="mt-3 text-gray-500">
                No description available yet.
              </p>
            )}
          </div>

          {/* Billing toggle */}
          {showToggle && (
            <div className="w-full md:w-auto">
              <div className="inline-flex w-full md:w-auto items-center rounded-2xl border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setBilling("month")}
                  className={`flex-1 md:flex-none rounded-xl px-4 py-2 text-sm font-medium transition ${
                    effectiveBilling === "month"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBilling("year")}
                  className={`flex-1 md:flex-none rounded-xl px-4 py-2 text-sm font-medium transition ${
                    effectiveBilling === "year"
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Yearly
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Select your billing preference.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Packages */}
      <div className="mt-10 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl xs:text-3xl lg:text-5xl font-bold capitalize">
            Packages
          </h3>
          <p className="mt-3 text-sm text-gray-600">
            Choose the plan that fits your needs.
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {packagesSorted.length} plan(s)
        </span>
      </div>

      {packagesSorted.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 text-gray-600">
          No packages available for this sub-service yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {packagesSorted.map((p) => {
            const price =
              effectiveBilling === "month"
                ? formatPrice(p.priceByMonth)
                : formatPrice(p.priceByYear);

            const hasThisBillingPrice =
              effectiveBilling === "month"
                ? p.priceByMonth !== null
                : p.priceByYear !== null;

            const displayPrice = hasThisBillingPrice ? price : null;

            return (
              <div
                key={p.id}
                className={`rounded-3xl bg-white p-6 ${tierCardRing(
                  p.tier
                )} shadow-sm`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tierTagClasses(
                        p.tier
                      )}`}
                    >
                      {tierLabel(p.tier)}
                    </span>

                    <h4 className="mt-3 text-lg font-bold text-gray-900">
                      {p.name}
                    </h4>

                    {p.description ? (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {p.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500">
                        Plan details included below.
                      </p>
                    )}
                  </div>

                  {/* Optional image thumbnail */}
                  <div className="h-12 w-12 shrink-0 rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center text-xs text-gray-400">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "IMG"
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  {displayPrice ? (
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                          {displayPrice}
                          <span className="ml-1 text-sm font-medium text-gray-600">
                            /{effectiveBilling === "month" ? "mo" : "yr"}
                          </span>
                        </p>
                      </div>

                      {p.priceByMonth !== null &&
                        p.priceByYear !== null &&
                        p.priceByYear > 0 &&
                        p.priceByMonth > 0 && (
                          <p className="text-xs text-gray-500">
                            Save vs monthly
                          </p>
                        )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="mt-1 text-base font-semibold text-gray-900">
                        Contact us for pricing
                      </p>
                    </div>
                  )}
                </div>

                {/* Points */}
                {Array.isArray(p.points) && p.points.length > 0 ? (
                  <ul className="mt-5 space-y-2 text-sm text-gray-700">
                    {p.points.slice(0, 8).map((pt, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900 shrink-0" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-sm text-gray-500">
                    No package details listed yet.
                  </p>
                )}

                {/* CTA */}
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-black/75 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      const unitPrice =
                        effectiveBilling === "month" ? p.priceByMonth : p.priceByYear;

                      if (unitPrice === null || unitPrice === undefined) {
                        toast.error("This plan has no price for the selected billing.");
                        return;
                      }

                      addPackageToCart({
                        packageId: p.id,
                        subServiceId: service.id,
                        serviceSlug: service.service.slug,
                        subServiceTitle: service.title,
                        tier: p.tier,
                        name: p.name,
                        billing: effectiveBilling,
                        unitPrice,
                        currency: p.currency ?? "USD",
                        image: p.image,
                      });

                      toast.success(
                        `${p.name} added (${effectiveBilling === "month" ? "Monthly" : "Yearly"}) ✅`
                      );
                    }}
                  >
                    Add to cart
                  </button>

                  <p className="mt-2 text-xs text-gray-500">
                    You must be signed in to checkout.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Note */}
      <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6">
        <h4 className="text-base font-semibold text-gray-900">
          What happens after ordering?
        </h4>
        <ol className="mt-3 space-y-2 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white text-xs">
              1
            </span>
            <span>We confirm your request and collect any missing details.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white text-xs">
              2
            </span>
            <span>Production starts based on the selected package.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white text-xs">
              3
            </span>
            <span>You receive updates until completion/delivery.</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
