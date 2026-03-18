import type { Metadata } from "next";
import Banner from "@/components/ServiceDetails/Banner";
import Body from "@/components/ServiceDetails/Body";
import OtherServices from "@/components/ServiceDetails/OtherServices";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({
    where: {
      slug,
      isActive: true,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      icon: true,
      image: true,
      isActive: true,
      updatedAt: true,
      subServices: {
        where: { isActive: true },
        orderBy: { position: "asc" },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          image: true,
          position: true,
        },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return {
      title: "Service Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${service.title} | Prime Print Store`;
  const description =
    service.description ||
    `Explore ${service.title} services at Prime Print Store.`;

  const serviceUrl = `${siteUrl}/services/${service.slug}`;
  const primaryImage = service.image;
  const primaryImageAlt = service.title;

  return {
    title,
    description,
    alternates: {
      canonical: serviceUrl,
    },
    openGraph: {
      title,
      description,
      url: serviceUrl,
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

const page = async ({ params }: ServicePageProps) => {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return notFound();
  }

  const service = await getServiceBySlug(slug);

  if (!service) {
    return notFound();
  }

  const otherServices = await prisma.service.findMany({
    where: {
      isActive: true,
      slug: { not: slug },
    },
    orderBy: { position: "asc" },
    select: {
      slug: true,
      title: true,
      description: true,
      image: true,
    },
    take: 4,
  });

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description || "",
    url: `${siteUrl}/service/${service.slug}`,
    image: service.image || undefined,
    provider: {
      "@type": "Organization",
      name: "Prime Print Store",
      url: siteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog:
      service.subServices.length > 0
        ? {
            "@type": "OfferCatalog",
            name: `${service.title} Subservices`,
            itemListElement: service.subServices.map((subService) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: subService.title,
                description: subService.description || "",
                url: `${siteUrl}/service/${service.slug}/${subService.slug}`,
                image: subService.image || undefined,
              },
            })),
          }
        : undefined,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
      <Banner service={service} />
      <Body service={service} />
      {otherServices.length > 0 && (
        <OtherServices currentSlug={slug} services={otherServices} />
      )}
    </div>
  );
};

export default page;