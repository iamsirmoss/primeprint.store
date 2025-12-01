"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RiCloseFill } from "react-icons/ri";

const CartView = ({
  openCart,
  open,
}: {
  openCart: () => void;
  open: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: 2 }}
      className="w-full z-50 fixed top-0 left-0 inset-0 flex items-center"
    >
      {/* Background Overlay */}
      <div
        className="bg-[#000000b4] w-[62%] h-full"
        onClick={openCart}
      ></div>

      {/* Sliding Cart */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        className="w-full md:w-[40%] bg-white shadow h-full"
      >
        {/* Cart Header */}
        <div className="border-b-2 py-10 xl:py-5">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-xl md:text-2xl font-bold">Your cart</h2>
            <RiCloseFill
              onClick={openCart}
              color="black"
              className="text-xl sm:text-2xl font-bold cursor-pointer"
            />
          </div>
        </div>

        {/* Empty Cart Message */}
        <div className="mt-48 flex flex-col items-center justify-center">
          <h5 className="mb-10 text-lg text-slate-500">No items found.</h5>
          <div>
            <Link href={"/order"} onClick={openCart}>
              <motion.button
                whileHover={{ y: -10, transition: { type: "spring" } }}
                className="flex items-center gap-2 bg-red-500 text-white rounded px-10 py-6 
                shadow-[rgba(13,38,76,0.19)_0px_9px_20px]"
              >
                <h5 className="font-semibold text-base sm:text-[20px]">Go to order</h5>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartView;
