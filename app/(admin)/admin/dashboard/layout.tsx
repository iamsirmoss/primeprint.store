import type { Metadata } from "next";
import React from "react";
import AdminDashboardLayoutClient from "./AdminDashboardLayoutClient";
import { CustomizerContextProvider } from "@/components/CustomizerContext";

export const metadata: Metadata = {
  title: "Admin Dashboard | Prime Print Store",
  description:
    "Manage users and settings in the admin dashboard of Prime Print Store. Access user management, order tracking, and site settings to efficiently run your online store.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomizerContextProvider>
      <AdminDashboardLayoutClient>
        {children}
      </AdminDashboardLayoutClient>
    </CustomizerContextProvider>
  );
}