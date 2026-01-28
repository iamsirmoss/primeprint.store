"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart";
import { toast } from "sonner";

export default function ClearCartOnSuccess() {
  useEffect(() => {
    clearCart();
    toast.success("Cart cleared ✅");
  }, []);

  return null;
}
