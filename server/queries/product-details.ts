// server/queries/product-details.ts
import { prisma } from "@/lib/prisma";

export async function getAdminProductById(productId: string) {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
      variants: {
        orderBy: {
          createdAt: "asc",
        },
      },
      category: true,
      service: true,
      reviews: {
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}