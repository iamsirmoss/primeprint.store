import type { Metadata } from "next";
import Banner from "@/components/SubServiceDetails/Banner";
import Body from "@/components/SubServiceDetails/Body";
import OtherSubServices from "@/components/SubServiceDetails/OtherServices";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string; subServiceSlug: string }>;
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

async function getSubService(slug: string, subServiceSlug: string) {
  return prisma.subService.findFirst({
    where: {
      slug: subServiceSlug,
      isActive: true,
      service: {
        slug: slug,
        isActive: true,
      },
    },
    select: {
      id: true,
      slug: true,
      title: true,
      image: true,
      description: true,
      position: true,
      createdAt: true,
      updatedAt: true,
      packages: {
        where: { isActive: true },
        select: {
          id: true,
          tier: true,
          slug: true,
          name: true,
          description: true,
          priceMonthCents: true,
          priceYearCents: true,
          image: true,
          points: true,
          currency: true,
        },
      },
      service: {
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
  const { slug, subServiceSlug } = await params;

  const subService = await getSubService(slug, subServiceSlug);

  if (!subService) {
    return {
      title: "Subservice Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${subService.title} | ${subService.service.title} | Prime Print Store`;
  const description =
    subService.description ||
    `Explore ${subService.title} under ${subService.service.title} at Prime Print Store.`;

  const url = `${siteUrl}/services/${subService.service.slug}/${subService.slug}`;

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
      images: subService.image
        ? [
            {
              url: subService.image,
              alt: subService.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: subService.image ? [subService.image] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug, subServiceSlug } = await params;

  const subService = await getSubService(slug, subServiceSlug);

  if (!subService) return notFound();

  const otherSubServices = await prisma.subService.findMany({
    where: {
      isActive: true,
      id: { not: subService.id },
      serviceId: subService.service.id,
    },
    orderBy: { position: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      image: true,
      position: true,
    },
    take: 4,
  });

  const subServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: subService.title,
    description: subService.description || "",
    url: `${siteUrl}/service/${subService.service.slug}/${subService.slug}`,
    image: subService.image || undefined,
    provider: {
      "@type": "Organization",
      name: "Prime Print Store",
      url: siteUrl,
    },
    category: subService.service.title,
    isPartOf: {
      "@type": "Service",
      name: subService.service.title,
      url: `${siteUrl}/service/${subService.service.slug}`,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(subServiceJsonLd),
        }}
      />

      <Banner service={subService} />
      <Body service={subService} />
      {otherSubServices.length > 0 && (
        <OtherSubServices
          serviceSlug={subService.service.slug}
          subServices={otherSubServices}
        />
      )}
    </div>
  );
}