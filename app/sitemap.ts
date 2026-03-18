import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, subServices, categories, packages, products] =
    await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
      prisma.subService.findMany({
        where: { isActive: true },
        select: {
          slug: true,
          updatedAt: true,
          service: {
            select: {
              slug: true,
            },
          },
        },
      }),
      prisma.category.findMany({
        where: { isActive: true },
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
      prisma.package.findMany({
        where: { isActive: true },
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
      prisma.product.findMany({
        where: {
          isActive: true,
          status: "PUBLISHED",
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
    ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/service/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const subServicePages: MetadataRoute.Sitemap = subServices
    .filter((subService) => subService.service?.slug)
    .map((subService) => ({
      url: `${siteUrl}/service/${subService.service.slug}/${subService.slug}`,
      lastModified: subService.updatedAt,
      changeFrequency: "weekly",
      priority: 0.75,
    }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const packagePages: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${siteUrl}/package/${pkg.slug}`,
    lastModified: pkg.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...subServicePages,
    ...categoryPages,
    ...packagePages,
    ...productPages,
  ];
}