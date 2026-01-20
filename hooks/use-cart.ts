"use client";

import { useEffect, useState } from "react";
import { CartItem, getCart, cartCount, cartTotal } from "@/lib/cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const sync = () => setItems(getCart());

  useEffect(() => {
    sync();
    const onUpdate = () => sync();
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, []);

  return {
    items,
    count: cartCount(items),
    totals: cartTotal(items), // ex: { USD: 120 }
    refresh: sync,
  };
}
