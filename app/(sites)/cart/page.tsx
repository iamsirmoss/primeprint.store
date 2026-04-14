import CartClient from "@/components/CartPage/CartClient";
import Link from "next/link";
import { ShoppingBag, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

export default function CartPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-100px] h-[320px] w-[320px] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.08),transparent_28%)]" />
      </div>

      <div className="relative px-4 py-10 md:py-16 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        {/* Top section */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 backdrop-blur-md">
            <ShoppingBag className="h-4 w-4" />
            Your shopping cart
          </div>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Review your cart before checkout
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Check your selected products and service packages, update
                quantities, and continue to checkout when everything looks good.
              </p>
            </div>

            
          </div>
        </div>

        {/* Trust cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Fast processing</h3>
            <p className="mt-1 text-sm text-slate-600">
              Quick order review and smooth checkout experience.
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
              <ShieldCheck className="h-5 w-5 text-cyan-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Secure checkout</h3>
            <p className="mt-1 text-sm text-slate-600">
              Your order details stay protected during the process.
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <BadgeCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Quality service</h3>
            <p className="mt-1 text-sm text-slate-600">
              Premium printing products and service packages in one place.
            </p>
          </div>
        </div>

        {/* Main cart container */}
        <div className="rounded-[28px] border border-white/60 bg-white/65 p-4 shadow-xl shadow-blue-500/5 backdrop-blur-2xl md:p-6 lg:p-8">
          <CartClient />
        </div>
      </div>
    </div>
  );
}