import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./css/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prime Print Store | Online Printing & Business Services",
    template: "%s | PrimePrint Store",
  },
  description:
    "Prime Print Store offers custom printing, business cards, flyers, banners, graphic design, notary services, passport photos, and more.",
  keywords: [
    "Prime Print Store",
    "online printing",
    "business cards",
    "flyers",
    "banners",
    "graphic design",
    "notary services",
    "passport photos",
    "custom printing",
    "print shop",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Prime Print Store",
    title: "Prime Print Store | Online Printing & Business Services",
    description:
      "Custom printing, business cards, banners, flyers, design, notary services, passport photos, and more.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Print Store | Online Printing & Business Services",
    description:
      "Custom printing, business cards, banners, flyers, design, notary services, passport photos, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} min-h-screen w-full overflow-x-hidden`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}