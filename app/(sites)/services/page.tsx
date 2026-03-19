import type { Metadata } from "next";
import Articles from "@/components/HomePages/Articles";
import Banner from "@/components/ServicesPage/Banner";
import Services from "@/components/ServicesPage/Services";
import { prisma } from "@/lib/prisma";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

export const metadata: Metadata = {
  title: "Custom Printing, Graphic Design & Business Services | Prime Print Store",
  description:
    "Explore printing and business services from Prime Print Store including graphic design, custom printing, passport photos, notary services, and more.",
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: "Custom Printing, Graphic Design & Business Services | Prime Print Store",
    description:
      "Explore printing and business services from Prime Print Store including graphic design, custom printing, passport photos, notary services, and more.",
    url: `${siteUrl}/services`,
    siteName: "Prime Print Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Printing, Graphic Design & Business Services | Prime Print Store",
    description:
      "Explore printing and business services from Prime Print Store including graphic design, custom printing, passport photos, notary services, and more.",
  },
};

const page = async () => {
  const servicesRaw = await prisma.service.findMany({
    where: {
      isActive: true,
    },
    take: 8,
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      image: true,
      description: true,
    },
  });

  const services = servicesRaw.map((service) => ({
    ...service
  }));

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Services",
    description:
      "Explore printing and business services from Prime Print Store including graphic design, custom printing, passport photos, notary services, and more.",
    url: `${siteUrl}/services`,
    isPartOf: {
      "@type": "WebSite",
      name: "Prime Print Store",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/service/${service.slug}`,
        name: service.title,
      })),
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd),
        }}
      />

      <h1 className="sr-only">Printing and Business Services</h1>

      <Banner />

      <Services services={services} />
      <Articles />
    </div>
  );
};

export default page;