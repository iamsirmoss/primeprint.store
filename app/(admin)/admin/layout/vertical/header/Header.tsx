"use client";

import React, { useState, useEffect, useContext } from "react";

import Search from "./Search";
import { Icon } from "@iconify/react";
import AppLinks from "./AppLinks";
import Messages from "./Messages";
import Profile from "./Profile";
import { CustomizerContext } from "@/components/CustomizerContext";

import { Language } from "./Language";
import FullLogo from "../../shared/logo/FullLogo";
import MobileHeaderItems from "./MobileHeaderItems";
import HorizontalMenu from "../../horizontal/header/HorizontalMenu";

import Link from "next/link";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Sidebar from "../sidebar/Sidebar";

import { useSidebar } from "@/components/Admin/ui/sidebar";
import Notifications from "./Notifications";
import MobileSidebar from "../sidebar/MobileSidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface HeaderPropsType {
  layoutType: string;
}

const Header = ({ layoutType }: HeaderPropsType) => {
  const [isSticky, setIsSticky] = useState(false);

  const { toggleSidebar, setOpenMobile, openMobile } = useSidebar();

  const { setIsCollapse, isCollapse, isLayout, setActiveMode, activeMode, activeDir } =
    useContext(CustomizerContext);

  const [mobileMenu, setMobileMenu] = useState("");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setOpenMobile(false)
      }
    }

    // Run on mount and whenever screen resizes
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMobileMenu = () => {
    if (mobileMenu === "active") {
      setMobileMenu("");
    } else {
      setMobileMenu("active");
    }
  };
  if (!mounted) return null;

  // const toggleMode = () => {
  //   setActiveTheme((prevMode: string) =>
  //     prevMode === "light" ? "dark" : "light"
  //   );
  // };

  // Hydration-safe render
  // if (!mounted) return null;

  // const toggleMode = () => {
  //   const newMode = theme === "light" ? "dark" : "light";
  //   setTheme(newMode);
  //   setActiveMode(newMode);
  // };

  const toggleMode = () => {
    setActiveMode(activeMode === "light" ? "dark" : "light");
  };

  return (
    <>
      <header
        className={`top-0 z-5  ${isSticky
          ? "bg-white dark:bg-darkgray sticky"
          : "bg-transparent"
          }`}
      >
        <nav
          className={`px-2 dark:border-gray-700 rounded-none bg-transparent dark:bg-transparent py-4 sm:px-4 ${layoutType == "horizontal" ? "container mx-auto" : ""
            }  ${isLayout == "full" ? "max-w-full!" : ""}`}
        >
          <div className="mx-auto flex flex-wrap items-center justify-between">
            <span
              onClick={() => setOpenMobile(!openMobile)}
              className="px-[15px] hover:text-primary dark:hover:text-primary text-darklink dark:text-white relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent rounded-full xl:hidden flex justify-center items-center cursor-pointer"
            >
              <Icon icon="tabler:menu-2" height={20} />
            </span>

            {/* Toggle Icon   */}
            <div className="xl:block! hidden!">
              <div className="flex gap-0 items-center relative">
                {layoutType == "horizontal" ? (
                  <div className="me-3">
                    <FullLogo />
                  </div>
                ) : null}

                {/* {layoutType != "horizontal" ? (
                  <span
                    onClick={() => {
                      if (isCollapse === "full-sidebar") {
                        setIsCollapse("mini-sidebar");
                      } else {
                        setIsCollapse("full-sidebar");
                      }
                    }}
                    className="px-[15px] relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent text-link hover:text-primary dark:text-darklink dark:hover:text-primary rounded-full justify-center items-center cursor-pointer xl:flex hidden"
                  >
                    <Icon icon="tabler:menu-2" height={20} width={20} className="text-darklink dark:text-white"/>
                  </span>
                ) : null} */}

                <Search />

                <AppLinks />
              </div>
            </div>
            {/* mobile-logo */}
            <div className="block xl:hidden">
              <FullLogo />
            </div>
            <div className="xl:block! hidden! md:hidden!">
              <div className="flex gap-0 items-center">
                {/* Theme Toggle */}
                {activeMode === "light" ? (
                  <div
                    className="group hover:text-primary px-4 dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink relative"
                    onClick={toggleMode}
                  >
                    <span className="flex items-center justify-center text-darklink dark:text-white relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary">
                      <Icon
                        icon="solar:moon-line-duotone"
                        width={20}
                        height={20}
                        className="group-hover:text-primary"
                      />
                    </span>
                  </div>
                ) : (
                  // Dark Mode Button
                  <div
                    className="group hover:text-primary px-4 dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink group relative"
                    onClick={toggleMode}
                  >
                    <span className="flex items-center justify-center text-darklink dark:text-white relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary">
                      <Icon
                        icon="solar:sun-bold-duotone"
                        width={20}
                        height={20}
                        className="group-hover:text-primary"
                      />
                    </span>
                  </div>
                )}

                {/* Notifications Dropdown */}
                <Notifications />

                {/* Language Dropdown*/}
                <Language />

                {/* Profile Dropdown */}
                <Profile />
              </div>
            </div>
            {/* Mobile Toggle Icon */}
            <span
              className="h-10 w-10 flex xl:hidden text-darklink dark:text-white hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
              onClick={handleMobileMenu}
            >
              <Icon icon="tabler:dots" height={20} width={20} />
            </span>
          </div>
        </nav>

        <div
          className={`w-full  xl:hidden block mobile-header-menu ${mobileMenu}`}
        >
          <MobileHeaderItems />
        </div>

        {/* Horizontal Menu  */}
        {layoutType == "horizontal" ? (
          <div className="xl:border-y xl:border-ld xl:block hidden">
            <div
              className={`${isLayout == "full" ? "w-full px-6" : "container"}`}
            >
              <HorizontalMenu />
            </div>
          </div>
        ) : null}
      </header>

      {/* Mobile Sidebar */}

      <div>
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side={`${activeDir === "ltr" ? "left" : "right"}`} className="border-ld w-80">
            <VisuallyHidden>
              <SheetTitle>sidebar</SheetTitle>
            </VisuallyHidden>
            <MobileSidebar />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Header;
