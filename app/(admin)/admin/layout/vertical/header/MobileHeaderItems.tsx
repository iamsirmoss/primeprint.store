import { Icon } from "@iconify/react";
import Messages from "./Messages";

import Profile from "./Profile";
import { Language } from "./Language";

import AppLinks from "./AppLinks";
import Notifications from "./Notifications";
import { useCustomizer } from "@/hooks/use-customizer";


const MobileHeaderItems = () => {
  const { setActiveMode, activeMode } = useCustomizer();
  const toggleMode = () => {
    setActiveMode(activeMode === "light" ? "dark" : "light");
  };
  
  return (
    <nav className="rounded-none bg-white dark:bg-darkgray flex-1 px-9 ">
      {/* Toggle Icon   */}

      <div className="xl:hidden block w-full">
        <div className="flex justify-center items-center">
          {/* Theme Toggle */}
          {activeMode === "light" ? (
            <div
              className=" hover:text-primary px-4 group  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink relative"
              onClick={toggleMode}
            >
              <span className="flex items-center justify-center text-darklink dark:text-white relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary">
                <Icon
                  icon="solar:moon-line-duotone"
                  width={20}
                  height={20}
                />
              </span>
            </div>
          ) : (
            // Dark Mode Button
            <div
              className=" hover:text-primary px-4   dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-link dark:text-darklink group relative"
              onClick={toggleMode}
            >
              <span className="flex items-center justify-center text-darklink dark:text-white relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary">
                <Icon
                  icon="solar:sun-bold-duotone"
                  width="20"
                  className="group-hover:text-primary"
                />
              </span>
            </div>
          )}

          {/* Notifications Dropdown */}
          <Notifications />

          {/* App Link Dropwown   */}
          <AppLinks />

          {/* Language Dropdown*/}
          <Language />

          {/* Profile Dropdown */}
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default MobileHeaderItems;
