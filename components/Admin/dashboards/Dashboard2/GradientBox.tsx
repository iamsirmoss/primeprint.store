"use client";

import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface GradientBoxProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: "USER" | "ADMIN" | "MANAGER" | "STAFF";
  };
  revenueThisMonthCents: number;
  revenueTotalCents: number;
  totalOrders: number;
  pendingOrders: number;
  publishedProducts: number;
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

const GradientBox = ({
  user,
  revenueThisMonthCents,
  revenueTotalCents,
  totalOrders,
  pendingOrders,
  publishedProducts,
}: GradientBoxProps) => {
  return (
    <CardBox className="bg-linear-to-l from-primary to-[#5a52ff] relative overflow-hidden shadow-none px-6 py-6 min-h-[260px]">
      <div className="relative z-10 flex flex-col h-full">
        <div className="bg-black/10 px-3 py-1.5 rounded-md w-fit">
          <div className="flex items-center gap-2 text-white text-sm">
            <Icon icon="solar:check-circle-outline" height={18} />
            <span>
              This month revenue{" "}
              <span className="font-semibold">
                {formatCurrency(revenueThisMonthCents)}
              </span>
            </span>
          </div>
        </div>

        <div className="pt-8">
          <h5 className="text-2xl md:text-3xl text-white">
            Hey, <span className="font-bold">{user.name || "Admin"}</span>
          </h5>

          <p className="font-normal opacity-80 text-white text-sm mt-2 max-w-[520px]">
            Welcome back. Here is a quick overview of your store performance,
            orders, and catalog activity.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3">
            <p className="text-white/75 text-xs">Total Revenue</p>
            <h6 className="text-white font-bold text-lg mt-1">
              {formatCurrency(revenueTotalCents)}
            </h6>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3">
            <p className="text-white/75 text-xs">Orders</p>
            <h6 className="text-white font-bold text-lg mt-1">{totalOrders}</h6>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3">
            <p className="text-white/75 text-xs">Pending</p>
            <h6 className="text-white font-bold text-lg mt-1">
              {pendingOrders}
            </h6>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-3">
            <p className="text-white/75 text-xs">Published</p>
            <h6 className="text-white font-bold text-lg mt-1">
              {publishedProducts}
            </h6>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-white/85 text-sm">
          <Icon icon="solar:user-outline" height={18} />
          <span>{user.role}</span>
          {user.email && (
            <>
              <span className="text-white/50">•</span>
              <span className="truncate">{user.email}</span>
            </>
          )}
        </div>
      </div>

      <Image
        src="/images/backgrounds/welcome-bg2.png"
        alt="background"
        className="absolute bottom-0 end-0 rtl:scale-x-[-1] pointer-events-none opacity-90"
        width={285}
        height={179}
      />
    </CardBox>
  );
};

export default GradientBox;