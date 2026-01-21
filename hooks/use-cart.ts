// "use client";

// import { useEffect, useState } from "react";
// import { CartItem, getCart, cartCount, cartTotal } from "@/lib/cart";

// export function useCart() {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const sync = () => setItems(getCart());

//   useEffect(() => {
//     sync();
//     const onUpdate = () => sync();
//     window.addEventListener("cart:updated", onUpdate);
//     return () => window.removeEventListener("cart:updated", onUpdate);
//   }, []);

//   return {
//     items,
//     count: cartCount(items),
//     totals: cartTotal(items), // ex: { USD: 120 }
//     refresh: sync,
//   };
// }

"use client";

import { useEffect, useState } from "react";
import {
  AnyCartItem,
  getAnyCart,
  cartAnyCount,
  cartAnyTotal,
} from "@/lib/cart";

export function useCart() {
  const [items, setItems] = useState<AnyCartItem[]>([]);

  const sync = () => setItems(getAnyCart());

  useEffect(() => {
    sync();
    const onUpdate = () => sync();
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, []);

  return {
    items,
    count: cartAnyCount(items),
    totals: cartAnyTotal(items), // ex: { USD: 120 }
    refresh: sync,
  };
}
