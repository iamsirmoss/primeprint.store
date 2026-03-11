"use client";

import React, { useContext, useEffect } from "react";
import { IconSidebar } from "./IconSidebar";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import NavCollapse from "./NavCollapse";
import { CustomizerContext } from "@/components/CustomizerContext";
import FullLogo from "../../shared/logo/FullLogo";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCustomizer } from "@/hooks/use-customizer";

const SidebarLayout = () => {
  const { activeDir } = useCustomizer();
  const { selectedIconId, setSelectedIconId } =
    useCustomizer() || {};
  const selectedContent = SidebarContent.find(
    (data) => data.id === selectedIconId
  );

  const pathname = usePathname();

  // Find which top-level menu ID matches the current URL
  function findActiveUrl(narray: any, targetUrl: any) {
    for (const item of narray) {
      if (item.items) {
        for (const section of item.items) {
          if (section.children) {
            for (const child of section.children) {
              if (child.url === targetUrl) {
                return item.id;
              }
            }
          }
        }
      }
    }
    return null;
  }

  useEffect(() => {
    const result = findActiveUrl(SidebarContent, pathname);
    if (result) {
      setSelectedIconId(result);
    }
  }, [pathname, setSelectedIconId]);

  return (
    <>
      {/* Sidebar visible only on xl and above */}
      <div className="xl:block hidden">
        {/* Mini Sidebar with Icons */}
        <div className="minisidebar-icon border-e border-ld fixed start-0 z-10">
          <IconSidebar />
        </div>

        {/* Main Sidebar */}
        <aside
          className="fixed menu-sidebar start-18 top-0 h-full w-[260px] dark:bg-darkgray rtl:pe-4 rtl:ps-0 "
          aria-label="Sidebar navigation"
        >
          {/* Logo section */}
          <div className="px-6 py-4 flex items-center sidebarlogo">
            <FullLogo />
          </div>

          {/* Scrollable Content */}
          <ScrollArea dir={activeDir === "rtl" ? "rtl" : "ltr"}  className="h-[calc(100vh-85px)]">
            <div className="pe-4 rtl:pe-0 rtl:ps-4 px-5 mt-2 list-none">
              <ul className="mt-4 space-y-2 border-t pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700 border-ld sidebar-nav sidebar-nav hide-menu">
                {selectedContent &&
                  selectedContent.items?.map((item, index) => (
                    <div className="caption mb-4" key={item.heading}>
                      <h5 className="text-link dark:text-white/70 caption font-semibold leading-6 tracking-widest text-xs uppercase pb-2">
                        {item.heading}
                      </h5>

                      {item.children?.map((child, idx) => (
                        <React.Fragment key={child.id || idx}>
                          {child.children ? (
                            <NavCollapse item={child} />
                          ) : (
                            <NavItems item={child} />
                          )}
                        </React.Fragment>
                      ))}

                      {/* Separator between menu groups */}
                      {/* {index < ((selectedContent?.items?.length || 0) - 1) && (
                        <Separator className="my-3 opacity-30" />
                      )} */}
                      {/* {index < (selectedContent?.items?.length || 0) - 1 && (
                      <Separator className="my-3 opacity-30" />
                    )} */}
                    </div>
                  ))}
              </ul>
            </div>
          </ScrollArea>
        </aside>
      </div>
    </>
  );
};

export default SidebarLayout;
