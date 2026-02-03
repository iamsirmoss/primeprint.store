"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { RiCloseFill } from "react-icons/ri";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/hooks/use-cart";
import {
  decQty,
  incQty,
  removeFromCart,
  removePackageFromCart,
  incPackageQty,
  decPackageQty,
  isPackageItem,
} from "@/lib/cart";


const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cartVariants = {
  hidden: { x: "100%" },
  visible: { x: "0%" },
  exit: { x: "100%" },
};

const CartView = ({
  openCart,
  open,
}: {
  openCart: () => void;
  open: boolean;
}) => {

  const { items, totals, count } = useCart();

  const currencyKeys = Object.keys(totals);

  const badgeClass = (isPkg: boolean) =>
    isPkg
      ? "bg-black text-white"
      : "bg-gray-100 text-gray-800 border border-gray-200";

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="cart-wrapper"
          className="fixed inset-0 z-50 flex"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            transition={{ duration: 0.35 }}
            className="bg-black/70 w-[62%] h-full"
            onClick={openCart}
          />

          {/* Cart */}
          <motion.div
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 },
            }}
            className="w-full md:w-[40%] bg-white shadow h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b py-6">
              <div className="flex justify-between items-center px-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Your cart</h2>
                  <p className="text-sm text-slate-500">{count} item(s)</p>
                </div>

                <RiCloseFill
                  onClick={openCart}
                  className="text-2xl cursor-pointer"
                />
              </div>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              // Empty state
              <div className="mt-48 flex flex-col items-center justify-center px-6">
                <h5 className="mb-10 text-lg text-slate-500">
                  No item(s) found.
                </h5>

                <Link href="/shop" onClick={openCart}>
                  <motion.button
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-red-500 text-white rounded px-10 py-5 shadow transition-all duration-300 hover:bg-blue-400 cursor-pointer text-lg font-medium"
                  >
                    Go to order
                  </motion.button>
                </Link>
              </div>
            ) : (
              <>
                {/* Items list (scrollable) */}
                <div className="h-[calc(100vh-220px)] overflow-y-auto px-4 py-4 space-y-4">
                  {items.map((it) => {
                    const isPkg = isPackageItem(it);

                    const key = isPkg ? `${it.packageId}-${it.billing}` : `${it.productId}-${it.slug}`;
                    const title = isPkg ? it.name : it.title;
                    const currency = it.currency ?? "USD";
                    const unitPrice = isPkg ? it.unitPrice : it.price;

                    return (
                      <div key={key} className="flex gap-3 rounded-xl border p-3 cursor-pointer hover:border-gray-500 transition-all duration-500">
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-slate-100">
                          <Image
                            src={it.image || "/images/placeholder.png"}
                            alt={title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div>
                              {isPkg && (
                                  <p className="text-xs text-slate-500 mb-1 capitalize">
                                    {it.serviceSlug} • {it.subServiceTitle}
                                  </p>
                              )}
                              <div className="flex items-center gap-2 flex-wrap">
                                <div className="font-semibold capitalize">{title}</div>

                                <span
                                  className={`text-[10px] px-2 py-1 rounded-full font-semibold ${badgeClass(isPkg)}`}
                                >
                                  {isPkg ? "PACKAGE" : "PRODUCT"}
                                </span>

                                {isPkg && (
                                  <span className="text-[10px] px-2 py-1 rounded-full font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                    {it.billing === "month" ? "MONTHLY" : "YEARLY"}
                                  </span>
                                )}
                              </div>
                              {isPkg ? (
                                <>
                                  <p className="text-xs text-slate-500 mt-1">
                                    {it.tier} • {it.billing === "month" ? "Monthly" : "Yearly"}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-1">
                                    {unitPrice.toFixed(2)} {currency}
                                  </p>
                                </>
                              ) : (
                                <p className="text-xs text-slate-500 mt-1">
                                  {unitPrice.toFixed(2)} {currency}
                                </p>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (isPkg) {
                                  removePackageFromCart(it.packageId, it.billing);
                                  toast.success("Package removed from cart");
                                } else {
                                  removeFromCart(it.productId);
                                  toast.success("Product removed from cart");
                                }
                              }}
                              className="rounded-md p-2 hover:bg-slate-100 transition-all duration-300"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-5 w-5 text-slate-600" />
                            </button>
                          </div>

                          <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                            <div className="inline-flex items-center gap-2 rounded-lg border px-1 md:px-2 py-1">
                              <button
                                type="button"
                                onClick={() => {
                                  if (isPkg) decPackageQty(it.packageId, it.billing);
                                  else decQty(it.productId);
                                }}
                                className="rounded-md p-1.5 md:p-2 hover:bg-slate-100 transition-all duration-300"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-2.5 w-2.5 md:w-4 md:h-4" />
                              </button>

                              <span className="min-w-8 text-center font-semibold text-sm md:text-base">
                                {it.qty}
                              </span>

                              <button
                                type="button"
                                onClick={() => {
                                  if (isPkg) incPackageQty(it.packageId, it.billing);
                                  else incQty(it.productId);
                                }}
                                className="rounded-md p-2 hover:bg-slate-100 transition-all duration-300"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-2.5 w-2.5 md:w-4 md:h-4" />
                              </button>
                            </div>

                            <p className="font-bold">
                              {(unitPrice * it.qty).toFixed(2)} {currency}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer summary */}
                <div className="border-t px-4 py-4">
                  <div className="space-y-2 text-sm">
                    {currencyKeys.map((cur) => (
                      <div
                        key={cur}
                        className="flex items-center justify-between"
                      >
                        <span className="text-slate-600">Subtotal ({cur})</span>
                        <span className="font-bold">
                          {totals[cur].toFixed(2)} {cur}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Link
                      href="/cart"
                      onClick={openCart}
                      className="w-1/2"
                    >
                      <button
                        type="button"
                        className="w-full rounded-lg border py-3 font-semibold hover:bg-slate-200 cursor-pointer text-sm md:text-base transition-all duration-300"
                      >
                        View cart
                      </button>
                    </Link>

                    <Link
                      href="/checkout"
                      onClick={openCart}
                      className="w-1/2"
                    >
                      <button
                        type="button"
                        className="w-full rounded-lg bg-black py-3 font-semibold text-white hover:bg-black/75 cursor-pointer text-sm md:text-base transition-all duration-300"
                      >
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartView;
