"use client";

import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";
import Link from "next/link";
import { CustomizerContext } from "@/components/CustomizerContext";
import Miniicons from "./MiniSidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/Admin/ui/sidebar";
import { useCustomizer } from "@/hooks/use-customizer";

export const IconSidebar = () => {
  const { selectedIconId, setSelectedIconId, setIsCollapse, isCollapse } =
    useCustomizer() || {};
  const { openMobile, setOpenMobile } = useSidebar();

  const handleClick = (id: any) => {
    setSelectedIconId(id);
    setIsCollapse("full-sidebar");
  };

  return (
    <div className="minisidebar-icon dark:bg-dark!">
      {/* Brand Logo / Hamburger Toggle */}
      <div className="barnd-logo">
        <Link
          href="#"
          className="nav-link"
          onClick={() => {
            if (isCollapse === "full-sidebar") {
              setIsCollapse("mini-sidebar");
            } else {
              setIsCollapse("full-sidebar");
            }

          }}
        >
          <Icon
            icon="solar:hamburger-menu-line-duotone"
            height={24}
            className="text-black dark:text-white dark:hover:text-primary"
            onClick={() => {
              if (window.innerWidth < 1280) {
                setOpenMobile(false)
              }
            }}
          />
        </Link>
      </div>

      {/* Sidebar Icons */}
      <SimpleBar className="miniicons">
        <TooltipProvider>
          {Miniicons.map((links, index) => (
            <React.Fragment key={links.id}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-12 w-12 rounded-tw flex justify-center items-center mx-auto mb-2 transition-colors
                      ${links.id === selectedIconId
                        ? "text-white bg-primary dark:bg-primary hover:bg-primary hover:text-white"
                        : "text-darklink dark:text-white/70 bg-transparent dark:bg-transparent hover:bg-lightprimary hover:text-primary dark:hover:bg-lightprimary"
                      }`}
                    onClick={() => handleClick(links.id)}
                  >
                    <Icon icon={links.icon} width={24} height={24} className="w-6! h-6!" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent side="right" className="px-2 py-1 text-xs">
                  {links.tooltip}
                </TooltipContent>
              </Tooltip>

              {/* Horizontal separator every 3 icons */}
              {index > 0 &&
                (index + 1) % 3 === 0 &&
                index + 1 !== Miniicons.length && (
                  <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                )}
            </React.Fragment>
          ))}
        </TooltipProvider>
      </SimpleBar>
    </div>
  );
};
