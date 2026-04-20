// server/queries/products.ts
import { prisma } from "@/lib/prisma";

export async function getAdminProducts() {
  return prisma.product.findMany({
    include: {
      images: {
        select: {
          id: true,
          url: true,
          alt: true,
          position: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      variants: {
        select: {
          id: true,
          priceCents: true,
          isDefault: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}