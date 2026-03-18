import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CategoryDetailsClient from "@/components/CategoryDetails/CategoryDetailsClient";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

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

async function getCategoryBySlug(slug: string) {
  return prisma.category.findFirst({
    where: {
      slug,
      isActive: true,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      image: true,
      icon: true,
      position: true,
      createdAt: true,
      updatedAt: true,
      service: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      parent: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
      children: {
        where: {
          isActive: true,
        },
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          image: true,
          position: true,
        },
      },
      products: {
        where: {
          isActive: true,
          status: "PUBLISHED",
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 24,
        select: {
          id: true,
          slug: true,
          title: true,
          shortDescription: true,
          description: true,
          basePriceCents: true,
          compareAtPriceCents: true,
          currency: true,
          sku: true,
          stockQty: true,
          lowStockThreshold: true,
          requiresUpload: true,
          requiresApproval: true,
          requiresAppointment: true,
          type: true,
          salesChannel: true,
          images: {
            orderBy: {
              position: "asc",
            },
            take: 1,
            select: {
              url: true,
              alt: true,
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
        },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return {
      title: "Category Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${category.name} | Prime Print Store`;
  const description =
    category.description ||
    `Browse ${category.name} products and services at Prime Print Store.`;

  const categoryUrl = `${siteUrl}/category/${category.slug}`;
  const categoryImage = normalizeImageUrl(category.image);

  return {
    title,
    description,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title,
      description,
      url: categoryUrl,
      siteName: "Prime Print Store",
      type: "website",
      images: categoryImage
        ? [
            {
              url: categoryImage,
              alt: category.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: categoryImage ? [categoryImage] : [],
    },
  };
}

export default async function Page({ params }: CategoryPageProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return notFound();
  }

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return notFound();
  }

    const normalizedCategory = {
    ...category,
    image: normalizeImageUrl(category.image),
    children: category.children.map((child) => ({
      ...child,
      image: normalizeImageUrl(child.image),
    })),
    products: category.products.map((product) => {
      const ratings = product.reviews.map((review) => review.rating);
      const ratingAverage =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : null;

      const rawImage = product.images[0]?.url ?? null;
      const normalizedProductImage = normalizeImageUrl(rawImage);

      return {
        id: product.id,
        slug: product.slug,
        title: product.title,
        description: product.shortDescription ?? product.description ?? "",
        price: product.basePriceCents,
        basePriceCents: product.basePriceCents,
        compareAtPriceCents: product.compareAtPriceCents,
        images: normalizedProductImage ? [normalizedProductImage] : [],
        currency: product.currency,
        stockQty: product.stockQty,
        lowStockThreshold: product.lowStockThreshold,
        sku: product.sku,
        isActive: true,
        isFeatured: false,
        requiresUpload: product.requiresUpload,
        requiresApproval: product.requiresApproval,
        requiresAppointment: product.requiresAppointment,
        type: product.type,
        salesChannel: product.salesChannel,
        ratingAverage,
        reviewCount: product.reviews.length,
      };
    }),
  };

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description || "",
    url: `${siteUrl}/category/${category.slug}`,
    image: normalizedCategory.image || undefined,
    isPartOf: {
      "@type": "WebSite",
      name: "Prime Print Store",
      url: siteUrl,
    },
    about: {
      "@type": "Thing",
      name: category.name,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: normalizedCategory.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/products/${product.slug}`,
        name: product.title,
      })),
    },
  };

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Category",
      item: `${siteUrl}/category`,
    },
  ];

  if (category.parent) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: category.parent.name,
      item: `${siteUrl}/category/${category.parent.slug}`,
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 4,
      name: category.name,
      item: `${siteUrl}/category/${category.slug}`,
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: category.name,
      item: `${siteUrl}/category/${category.slug}`,
    });
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <CategoryDetailsClient category={normalizedCategory} />
    </>
  );
}