import type { Metadata } from "next";
import Banner from "@/components/ShopPage/Banner";
import Products from "@/components/ShopPage/Products";
import { prisma } from "@/lib/prisma";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

export const metadata: Metadata = {
  title: "Custom Printing Products | Prime Print Store",
  description:
    "Browse custom printing products including business cards, flyers, banners, posters, signage, and more at Prime Print Store.",
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  openGraph: {
    title: "Custom Printing Products | Prime Print Store",
    description:
      "Browse custom printing products including business cards, flyers, banners, posters, signage, and more at Prime Print Store.",
    url: `${siteUrl}/shop`,
    siteName: "Prime Print Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Printing Products | Prime Print Store",
    description:
      "Browse custom printing products including business cards, flyers, banners, posters, signage, and more at Prime Print Store.",
  },
};

function normalizeImageUrl(url?: string | null) {
  if (!url) return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/images/${trimmed}`;
}

const page = async () => {
  const [services, productsRaw] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { position: "asc" },
      select: { id: true, slug: true, title: true },
    }),
    prisma.product.findMany({
      where: {
        isActive: true,
        status: "PUBLISHED",
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        serviceId: true,
        slug: true,
        title: true,
        shortDescription: true,
        description: true,
        basePriceCents: true,
        compareAtPriceCents: true,
        currency: true,
        stockQty: true,
        lowStockThreshold: true,
        sku: true,
        isActive: true,
        isFeatured: true,
        requiresUpload: true,
        requiresApproval: true,
        requiresAppointment: true,
        type: true,
        salesChannel: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        service: {
          select: {
            title: true,
            slug: true,
          },
        },
        reviews: {
          where: {
            status: "APPROVED",
          },
          select: {
            rating: true,
          },
        },
        images: {
          orderBy: {
            position: "asc",
          },
          select: {
            url: true,
            alt: true,
          },
        },
        variants: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            priceCents: true,
            stockQty: true,
            isDefault: true,
          },
        },
      },
    }),
  ]);

  const products = productsRaw.map((product) => {
    const defaultVariant =
      product.variants.find((variant) => variant.isDefault) ?? product.variants[0];

    const effectivePrice = defaultVariant?.priceCents ?? product.basePriceCents;

    const ratings = product.reviews.map((review) => review.rating);
    const ratingAverage =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : null;

    const totalStock =
      typeof product.stockQty === "number"
        ? product.stockQty
        : defaultVariant?.stockQty ?? null;

    return {
      id: product.id,
      serviceId: product.serviceId,
      slug: product.slug,
      title: product.title,
      description: product.shortDescription ?? product.description ?? "",
      price: effectivePrice,
      basePriceCents: product.basePriceCents,
      compareAtPriceCents: product.compareAtPriceCents,
      currency: product.currency,
      stockQty: totalStock,
      lowStockThreshold: product.lowStockThreshold,
      sku: product.sku,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      requiresUpload: product.requiresUpload,
      requiresApproval: product.requiresApproval,
      requiresAppointment: product.requiresAppointment,
      type: product.type,
      salesChannel: product.salesChannel,
      category: product.category,
      service: product.service,
      ratingAverage,
      reviewCount: product.reviews.length,
      images: product.images
        .map((image) => normalizeImageUrl(image.url))
        .filter((img): img is string => Boolean(img)),
    };
  });

  const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Products",
    description:
      "Browse custom printing products including business cards, flyers, banners, posters, signage, and more.",
    url: `${siteUrl}/shop`,
    isPartOf: {
      "@type": "WebSite",
      name: "Prime Print Store",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/product/${product.slug}`,
        name: product.title,
      })),
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productsJsonLd),
        }}
      />

      <h1 className="sr-only">Custom Printing Products</h1>

      <Banner />
      <Products title="Products" services={services} products={products} />
    </div>
  );
};

export default page;