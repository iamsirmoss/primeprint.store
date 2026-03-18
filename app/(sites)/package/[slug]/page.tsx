import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PackageDetailsClient from "@/components/PackageDetails/PackageDetailsClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

function normalizeImageUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
}

async function getPackage(slug: string) {
  return prisma.package.findFirst({
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
      tier: true,
      currency: true,
      priceMonthCents: true,
      priceYearCents: true,
      deliveryDays: true,
      points: true,
      createdAt: true,
      updatedAt: true,
      service: {
        select: {
          slug: true,
          title: true,
        },
      },
      subService: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const pkg = await getPackage(slug);

  if (!pkg) {
    return {
      title: "Package Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${pkg.name} Package | Prime Print Store`;
  const description =
    pkg.description ||
    `${pkg.name} package for ${pkg.service?.title || ""} starting at ${
      pkg.priceMonthCents / 100
    } ${pkg.currency}.`;

  const url = `${siteUrl}/package/${pkg.slug}`;
  const image = normalizeImageUrl(pkg.image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Prime Print Store",
      type: "website",
      images: image
        ? [
            {
              url: image,
              alt: pkg.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const pkg = await getPackage(slug);

  if (!pkg) return notFound();

  const normalizedPackage = {
    ...pkg,
    image: normalizeImageUrl(pkg.image),
    monthlyPrice: pkg.priceMonthCents / 100,
    yearlyPrice: pkg.priceYearCents / 100,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.name,
    description: pkg.description || "",
    image: normalizedPackage.image || undefined,
    brand: {
      "@type": "Organization",
      name: "Prime Print Store",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: pkg.currency,
      price: normalizedPackage.monthlyPrice.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/package/${pkg.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <PackageDetailsClient pkg={normalizedPackage} />
    </>
  );
}