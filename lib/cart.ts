export type CartItem = {
  productId: string; // Product.id
  slug: string;
  sku?: string | null;
  title: string;
  price: number;
  currency: string;
  image?: string | null;
  qty: number;
};

const CART_KEY = "cart";

function safeParse(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data;
  } catch {
    return [];
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(CART_KEY));
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart:updated"));
}

export function addToCart(item: Omit<CartItem, "qty">) {
  const cart = getCart();
  const existing = cart.find((x) => x.productId === item.productId);

  const updated = existing
    ? cart.map((x) =>
        x.productId === item.productId ? { ...x, qty: x.qty + 1 } : x
      )
    : [...cart, { ...item, qty: 1 }];

  setCart(updated);
  return updated;
}

export function removeFromCart(productId: string) {
  const cart = getCart();
  const updated = cart.filter((x) => x.productId !== productId);
  setCart(updated);
  return updated;
}

export function setQty(productId: string, qty: number) {
  const cart = getCart();
  const normalized = Math.max(0, Math.floor(qty));

  const updated =
    normalized <= 0
      ? cart.filter((x) => x.productId !== productId)
      : cart.map((x) => (x.productId === productId ? { ...x, qty: normalized } : x));

  setCart(updated);
  return updated;
}

export function incQty(productId: string) {
  const cart = getCart();
  const updated = cart.map((x) =>
    x.productId === productId ? { ...x, qty: x.qty + 1 } : x
  );
  setCart(updated);
  return updated;
}

export function decQty(productId: string) {
  const cart = getCart();
  const updated = cart
    .map((x) => (x.productId === productId ? { ...x, qty: x.qty - 1 } : x))
    .filter((x) => x.qty > 0);
  setCart(updated);
  return updated;
}

export function cartCount(items?: CartItem[]) {
  const cart = items ?? getCart();
  return cart.reduce((acc, x) => acc + x.qty, 0);
}

export function cartTotal(items?: CartItem[]) {
  const cart = items ?? getCart();
  // total par currency (si tu supportes plusieurs devises)
  return cart.reduce<Record<string, number>>((acc, x) => {
    acc[x.currency] = (acc[x.currency] ?? 0) + x.price * x.qty;
    return acc;
  }, {});
}
