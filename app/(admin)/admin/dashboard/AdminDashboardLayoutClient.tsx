"use client";

import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import Sidebar from "../layout/vertical/sidebar/Sidebar";
import { Customizer } from "../layout/shared/customizer/Customizer";
import { SidebarProvider } from "@/components/Admin/ui/sidebar";
import Header from "../layout/vertical/header/Header";
import { useCustomizer } from "@/hooks/use-customizer";

export default function AdminDashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activeLayout, isLayout } = useCustomizer();

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        <div className="page-wrapper flex w-full">
          {activeLayout === "vertical" && (
            <div className="hidden xl:block">
              <Sidebar />
            </div>
          )}

          <div className="page-wrapper-sub body-wrapper flex w-full flex-col bg-white dark:bg-darkgray">
            <Header
              layoutType={activeLayout === "horizontal" ? "horizontal" : "vertical"}
            />

            <div
              className={`bg-lightgray dark:bg-dark h-full ${
                activeLayout !== "horizontal" ? "rounded-bb" : "rounded-none"
              }`}
            >
              <div
                className={`${
                  isLayout === "full"
                    ? "w-full py-[30px] md:px-[30px] px-5"
                    : "container py-[30px]"
                } ${activeLayout === "horizontal" ? "xl:mt-3" : ""}`}
              >
                <ScrollToTop />
                {children}
                <Toaster position="top-center" richColors />
              </div>

              <Customizer />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}