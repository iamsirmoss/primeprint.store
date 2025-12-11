import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
   weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"]
});

export const metadata: Metadata = {
  title: "Primeprint",
  description: "Your one stop shop for printing, notary and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kumbhSans.variable} overflow-x-hidden`}
      >
        {children}
        <BackToTop />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
