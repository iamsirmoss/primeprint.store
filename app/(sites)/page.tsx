import type { Metadata } from "next";
import Banner from "@/components/HomePages/Banner";
import Service from "@/components/HomePages/Service";
import Test from "@/components/HomePages/Deals";
import Products from "@/components/HomePages/Products";
import Banner2 from "@/components/HomePages/Banner2";
import Banner3 from "@/components/HomePages/Banner3";
import Sellings from "@/components/HomePages/Sellings";
import Articles from "@/components/HomePages/Articles";
import Reviews from "@/components/HomePages/Reviews";
import TopService from "@/components/HomePages/TopService";
import { prisma } from "@/lib/prisma";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

export const metadata: Metadata = {
  title: "Online Printing, Design & Business Services",
  description:
    "Prime Print Store offers online printing services including business cards, flyers, banners, graphic design, passport photos, notary services, and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prime Print Store | Online Printing & Business Services",
    description:
      "Order business cards, flyers, banners, design services, passport photos, and more from Prime Print Store.",
    url: siteUrl,
    siteName: "Prime Print Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Print Store | Online Printing & Business Services",
    description:
      "Order business cards, flyers, banners, design services, passport photos, and more from Prime Print Store.",
  },
};

export default async function Home() {
  const services = await prisma.service.findMany({
    take: 8,
    where: {
      isActive: true,
    },
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      image: true,
      products: {
        where: {
          isActive: true,
          status: "PUBLISHED",
        },
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      subServices: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
    },
  });

  const productsRaw = await prisma.product.findMany({
    take: 3,
    where: {
      isActive: true,
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      basePriceCents: true,
      stockQty: true,
      isActive: true,
      isFeatured: true,
      compareAtPriceCents: true,
      images: {
        orderBy: {
          position: "asc",
        },
        select: {
          url: true,
        },
      },
    },
  });

  const productsHomeRaw = await prisma.product.findMany({
    take: 8,
    where: {
      isActive: true,
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
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
  });

  const products = productsRaw.map((product) => ({
    ...product,
    description: product.description ?? "",
    images: product.images.map((image) => image.url),
  }));

  const reviews = await prisma.review.findMany({
    take: 6,
    where: {
      status: "APPROVED",
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      product: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  });

  const productsHome = productsHomeRaw.map((product) => {
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
      images: product.images.map((image) => image.url),
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Prime Print Store",
    url: siteUrl,
    description:
      "Prime Print Store offers online printing services including business cards, flyers, banners, graphic design, passport photos, notary services, and more.",
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">
        Prime Print Store Online Printing, Design and Business Services
      </h1>

      <Banner />
      <Service services={services} />
      <Test products={products} />
      <TopService services={services} />
      <Banner2 />
      <Products products={productsHome} />
      <Banner3 />
      <Sellings products={productsHome} />
      <Reviews reviews={reviews} />
      <Articles />
    </div>
  );
}