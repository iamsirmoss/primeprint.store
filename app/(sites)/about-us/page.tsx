import type { Metadata } from "next";
import About from "@/components/AboutPage/About";
import Banner from "@/components/AboutPage/Banner";
import Why from "@/components/AboutPage/Why";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

export const metadata: Metadata = {
  title: "About Prime Print Store",
  description:
    "Learn more about Prime Print Store, our custom printing services, graphic design solutions, and business support services.",
  alternates: {
    canonical: `${siteUrl}/about-us`,
  },
  openGraph: {
    title: "About Prime Print Store",
    description:
      "Learn more about Prime Print Store, our custom printing services, graphic design solutions, and business support services.",
    url: `${siteUrl}/about`,
    siteName: "Prime Print Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Prime Print Store",
    description:
      "Learn more about Prime Print Store, our custom printing services, graphic design solutions, and business support services.",
  },
};

const page = () => {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Prime Print Store",
    url: `${siteUrl}/about-us`,
    description:
      "Learn more about Prime Print Store, our custom printing services, graphic design solutions, and business support services.",
    isPartOf: {
      "@type": "WebSite",
      name: "Prime Print Store",
      url: siteUrl,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutJsonLd),
        }}
      />
      <Banner />
      <About />
      <Why />
    </div>
  );
};

export default page;