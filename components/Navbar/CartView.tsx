"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { RiCloseFill } from "react-icons/ri";

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
              x: {
                type: "spring",
                stiffness: 260,
                damping: 26,
                mass: 0.9,
              },
            }}
            className="w-full md:w-[40%] bg-white shadow h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b-2 py-10 xl:py-5">
              <div className="flex justify-between items-center px-4">
                <h2 className="text-xl md:text-2xl font-bold">Your cart</h2>
                <RiCloseFill
                  onClick={openCart}
                  className="text-xl sm:text-2xl cursor-pointer"
                />
              </div>
            </div>

            {/* Empty state */}
            <div className="mt-48 flex flex-col items-center justify-center">
              <h5 className="mb-10 text-lg text-slate-500">No items found.</h5>

              <Link href="/order" onClick={openCart}>
                <motion.button
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-red-500 text-white rounded px-10 py-5 shadow transition-all duration-300 hover:bg-blue-400 cursor-pointer text-lg font-medium"
                >
                  Go to order
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartView;
