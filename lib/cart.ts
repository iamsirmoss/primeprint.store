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

// ===============================
// PACKAGE CART (added)
// ===============================

export type BillingCycle = "month" | "year";
export type PackageTier = "STARTER" | "GROWTH" | "ULTIMATE";

export type CartPackageItem = {
  type: "PACKAGE";
  packageId: string;       // Package.id
  subServiceId: string;    // SubService.id
  serviceSlug: string;     // Service.slug (optional for links)
  subServiceTitle: string; // display
  tier: PackageTier;       // STARTER / GROWTH / ULTIMATE
  name: string;            // Package.name
  billing: BillingCycle;   // month / year  ✅ used for dedupe
  unitPrice: number;       // priceByMonth or priceByYear
  currency: string;        // default "USD"
  image?: string | null;
  qty: number;
};

// Union type for UI that needs both
export type AnyCartItem = CartItem | CartPackageItem;

// Read raw cart (may contain both shapes)
export function getAnyCart(): AnyCartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  const arr = safeParse(raw) as unknown as AnyCartItem[];
  // safeParse already ensures Array; we keep it simple here.
  return arr;
}

// Overwrite cart with both types
export function setAnyCart(items: AnyCartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart:updated"));
}

export function isPackageItem(it: AnyCartItem): it is CartPackageItem {
  return (it as CartPackageItem)?.type === "PACKAGE";
}

/**
 * ✅ addPackageToCart
 * - Same packageId + same billing => qty++
 * - Same packageId + different billing => new line
 */
export function addPackageToCart(item: Omit<CartPackageItem, "qty" | "type">) {
  const cart = getAnyCart();

  const existing = cart.find(
    (x) =>
      isPackageItem(x) &&
      x.packageId === item.packageId &&
      x.billing === item.billing
  ) as CartPackageItem | undefined;

  const updated: AnyCartItem[] = existing
    ? cart.map((x) =>
        isPackageItem(x) &&
        x.packageId === item.packageId &&
        x.billing === item.billing
          ? { ...x, qty: x.qty + 1 }
          : x
      )
    : [...cart, { type: "PACKAGE", ...item, qty: 1 }];

  setAnyCart(updated);
  return updated;
}

/** Remove a specific package line by (packageId + billing) */
export function removePackageFromCart(packageId: string, billing: BillingCycle) {
  const cart = getAnyCart();
  const updated = cart.filter(
    (x) => !(isPackageItem(x) && x.packageId === packageId && x.billing === billing)
  );
  setAnyCart(updated);
  return updated;
}

/** Quantity controls for package line (packageId + billing) */
export function incPackageQty(packageId: string, billing: BillingCycle) {
  const cart = getAnyCart();
  const updated = cart.map((x) =>
    isPackageItem(x) && x.packageId === packageId && x.billing === billing
      ? { ...x, qty: x.qty + 1 }
      : x
  );
  setAnyCart(updated);
  return updated;
}

export function decPackageQty(packageId: string, billing: BillingCycle) {
  const cart = getAnyCart();
  const updated = cart
    .map((x) =>
      isPackageItem(x) && x.packageId === packageId && x.billing === billing
        ? { ...x, qty: x.qty - 1 }
        : x
    )
    .filter((x) => x.qty > 0);
  setAnyCart(updated);
  return updated;
}

/** Total (products + packages) by currency */
export function cartAnyTotal(items?: AnyCartItem[]) {
  const cart = items ?? getAnyCart();
  return cart.reduce<Record<string, number>>((acc, x) => {
    if (isPackageItem(x)) {
      acc[x.currency] = (acc[x.currency] ?? 0) + x.unitPrice * x.qty;
      return acc;
    }
    acc[x.currency] = (acc[x.currency] ?? 0) + x.price * x.qty;
    return acc;
  }, {});
}

/** Count (products + packages) */
export function cartAnyCount(items?: AnyCartItem[]) {
  const cart = items ?? getAnyCart();
  return cart.reduce((acc, x) => acc + x.qty, 0);
}
