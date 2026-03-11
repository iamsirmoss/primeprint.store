"use client";

import React, { useContext } from "react";
import { IconSidebar } from "./IconSidebar";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import NavCollapse from "./NavCollapse";
import { CustomizerContext } from "@/components/CustomizerContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const MobileSidebar = () => {
  const { selectedIconId } = useContext(CustomizerContext) || {};
  const selectedContent = SidebarContent.find(
    (data) => data.id === selectedIconId
  );

  return (
    <div>
      {/* Left Icon Sidebar */}
      <div className="minisidebar-icon border-e border-ld bg-white dark:bg-darkgray fixed start-0 z-10">
        <IconSidebar />
      </div>

      {/* Main Sidebar */}
      <aside
        className="fixed menu-sidebar pt-8 bg-white dark:bg-darkgray! transition-all w-96 h-screen overflow-hidden list-none"
        aria-label="Sidebar with multi-level dropdown example"
      >
        <ScrollArea className="h-[calc(100vh-85px)] px-4">
          <div className="sidebar-nav space-y-6">
            {selectedContent &&
              selectedContent.items?.map((item, index) => (
                <React.Fragment key={index}>
                  <h5 className="text-link dark:text-white/70 font-semibold text-sm caption mb-2">
                    {item.heading}
                  </h5>

                  <div className="space-y-1">
                    {item.children?.map((child, index) => (
                      <React.Fragment key={child.id || index}>
                        {child.children ? (
                          <NavCollapse item={child} />
                        ) : (
                          <NavItems item={child} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </React.Fragment>
              ))}
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
};

export default MobileSidebar;
