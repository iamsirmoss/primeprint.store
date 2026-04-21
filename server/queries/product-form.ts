// server/queries/product-form.ts
import { prisma } from "@/lib/prisma";

export async function getProductFormOptions() {
  const [services, categories] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { title: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    }),
  ]);

  return {
    services,
    categories,
  };
}