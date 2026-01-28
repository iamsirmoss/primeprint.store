import { prisma } from "@/lib/prisma";
import { AnyCartItem, isProductItem } from "@/lib/cart";

export async function validateStockForCart(items: AnyCartItem[]) {
  const productLines = items
    .filter(isProductItem)
    .map((x) => ({
      productId: x.productId,
      qty: x.qty,
      title: x.title,
    }));

  if (productLines.length === 0) return [];

  const grouped = productLines.reduce<Record<string, { qty: number; title: string }>>(
    (acc, it) => {
      acc[it.productId] = {
        qty: (acc[it.productId]?.qty ?? 0) + it.qty,
        title: it.title,
      };
      return acc;
    },
    {}
  );

  const ids = Object.keys(grouped);

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, title: true, stockQty: true, isActive: true },
  });

  const byId = new Map(products.map((p) => [p.id, p]));
  const errors: string[] = [];

  for (const id of ids) {
    const needed = grouped[id].qty;
    const fallbackTitle = grouped[id].title;

    const p = byId.get(id);
    if (!p) {
      errors.push(`Product not found: ${fallbackTitle}`);
      continue;
    }

    if (!p.isActive) {
      errors.push(`"${p.title}" is not available right now.`);
      continue;
    }

    const stock = p.stockQty ?? 0;
    if (stock < needed) {
      errors.push(`"${p.title}" has only ${stock} left (you requested ${needed}).`);
    }
  }

  return errors;
}
