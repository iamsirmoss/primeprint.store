import type { Metadata } from "next";
import Banner from "@/components/ProductDetails/Banner";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

async function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      shortDescription: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      basePriceCents: true,
      compareAtPriceCents: true,
      currency: true,
      sku: true,
      stockQty: true,
      isActive: true,
      type: true,
      requiresUpload: true,
      requiresApproval: true,
      requiresAppointment: true,
      instructions: true,
      updatedAt: true,
      service: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      category: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
      images: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          url: true,
          alt: true,
          position: true,
        },
      },
      reviews: {
        where: {
          status: "APPROVED",
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          rating: true,
          title: true,
          comment: true,
          isVerified: true,
          createdAt: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = product.seoTitle || `${product.title} | Prime Print Store`;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    product.description ||
    `Order ${product.title} online at Prime Print Store.`;

  const productUrl = `${siteUrl}/products/${product.slug}`;
  const primaryImage = product.images[0]?.url;
  const primaryImageAlt = product.images[0]?.alt || product.title;

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title,
      description,
      url: productUrl,
      siteName: "Prime Print Store",
      type: "website",
      images: primaryImage
        ? [
            {
              url: primaryImage,
              alt: primaryImageAlt,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: primaryImage ? [primaryImage] : [],
    },
  };
}

const page = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return notFound();
  }

  const productRaw = await getProductBySlug(slug);

  if (!productRaw) {
    return notFound();
  }

  const product = {
    id: productRaw.id,
    slug: productRaw.slug,
    title: productRaw.title,
    shortDescription: productRaw.shortDescription,
    description: productRaw.description,
    basePriceCents: productRaw.basePriceCents,
    compareAtPriceCents: productRaw.compareAtPriceCents,
    currency: productRaw.currency,
    sku: productRaw.sku,
    stockQty: productRaw.stockQty,
    isActive: productRaw.isActive,
    type: productRaw.type,
    requiresUpload: productRaw.requiresUpload,
    requiresApproval: productRaw.requiresApproval,
    requiresAppointment: productRaw.requiresAppointment,
    instructions: productRaw.instructions,
    service: productRaw.service,
    category: productRaw.category,
    images: productRaw.images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      position: img.position,
    })),
  };

  const reviews = productRaw.reviews.map((review) => ({
    id: review.id,
    name: review.user?.name ?? "Anonymous",
    dateLabel: new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(review.createdAt),
    rating: review.rating,
    text: review.comment ?? "",
    title: review.title ?? "",
    isVerified: review.isVerified,
  }));

  const ratingValues = productRaw.reviews.map((review) => review.rating);
  const averageRating =
    ratingValues.length > 0
      ? ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length
      : null;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productRaw.title,
    description:
      productRaw.seoDescription ||
      productRaw.shortDescription ||
      productRaw.description ||
      "",
    sku: productRaw.sku || undefined,
    image: productRaw.images.map((img) => img.url),
    category: productRaw.category?.name || undefined,
    brand: {
      "@type": "Brand",
      name: "Prime Print Store",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${productRaw.slug}`,
      priceCurrency: productRaw.currency,
      price: (productRaw.basePriceCents / 100).toFixed(2),
      availability:
        typeof productRaw.stockQty === "number" && productRaw.stockQty <= 0
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating:
      averageRating !== null
        ? {
            "@type": "AggregateRating",
            ratingValue: averageRating.toFixed(1),
            reviewCount: productRaw.reviews.length,
          }
        : undefined,
    review: productRaw.reviews.slice(0, 5).map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.user?.name ?? "Anonymous",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.comment ?? "",
      name: review.title ?? undefined,
      datePublished: review.createdAt.toISOString(),
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <Banner product={product} />
      <ProductDetails product={product} reviews={reviews} />
    </div>
  );
};

export default page;