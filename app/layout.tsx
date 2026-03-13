import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./css/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Prime Print Store",
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
        className={`${manrope.className} min-h-screen w-full overflow-x-hidden`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
