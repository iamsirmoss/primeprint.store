import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() || "";

  if (!q || q.length < 2) {
    return NextResponse.json({
      products: [],
      services: [],
      subServices: [],
    });
  }

  const [products, services, subServices] = await Promise.all([
    prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
          { sku: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        basePriceCents: true,
        currency: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),

    prisma.service.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
      },
      orderBy: { position: "asc" },
      take: 5,
    }),

    prisma.subService.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
          {
            service: {
              title: { contains: q, mode: "insensitive" },
            },
          },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        service: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
      orderBy: { position: "asc" },
      take: 5,
    }),
  ]);

  return NextResponse.json({
    products,
    services,
    subServices,
  });
}