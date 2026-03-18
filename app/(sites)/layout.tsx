import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  description:
    "Shop online printing services, business cards, flyers, banners, design services, packages, and more at Prime Print Store.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      {children}
      <BackToTop />
      <Footer />
    </>
  );
}