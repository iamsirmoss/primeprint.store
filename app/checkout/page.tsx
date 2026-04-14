import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutClient from "./CheckoutClient";
import Link from "next/link";
import { CreditCard, ShieldCheck, Lock, ArrowLeft } from "lucide-react";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    redirect("/login?callbackURL=/checkout");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-100px] h-[320px] w-[320px] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.08),transparent_28%)]" />
      </div>

      <div className="relative min-h-screen px-4 py-10 md:py-16 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 backdrop-blur-md">
            <CreditCard className="h-4 w-4" />
            Secure checkout
          </div>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Complete your order securely
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Review your selected items and continue to payment through a
                secure Stripe checkout experience.
              </p>
            </div>

            <Link href="/cart">
              <button className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md">
                <ArrowLeft className="h-4 w-4" />
                Back to cart
              </button>
            </Link>
          </div>
        </div>

        {/* Trust cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Protected payment</h3>
            <p className="mt-1 text-sm text-slate-600">
              Your checkout flow is secured and designed for safe transactions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
              <Lock className="h-5 w-5 text-cyan-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Trusted process</h3>
            <p className="mt-1 text-sm text-slate-600">
              Review your order details before continuing to Stripe.
            </p>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <CreditCard className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Fast checkout</h3>
            <p className="mt-1 text-sm text-slate-600">
              A clean summary and smooth payment experience for your order.
            </p>
          </div>
        </div>

        {/* Main checkout container */}
        <div className="rounded-[28px] border border-white/60 bg-white/65 p-4 shadow-xl shadow-blue-500/5 backdrop-blur-2xl md:p-6 lg:p-8">
          <CheckoutClient userEmail={session.user.email ?? ""} />
        </div>
      </div>
    </div>
  );
}