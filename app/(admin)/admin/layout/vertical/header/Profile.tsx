"use client";

import { Icon } from "@iconify/react";
import React from "react";
import * as profileData from "./Data";
import Link from "next/link";
import Image from "next/image";
import SimpleBar from "simplebar-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  return (
    <div className="relative">
      <DropdownMenu>
        {/* === Trigger === */}
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="h-10 w-10 hover:text-primary rounded-full flex justify-center items-center group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
              <Image
                src="/images/profile/user-1.jpg"
                alt="User"
                height={35}
                width={35}
                className="rounded-full"
              />
            </span>
            <Icon
              icon="solar:alt-arrow-down-bold"
              className="hover:text-primary dark:text-primary group-hover/menu:text-primary"
              height={12}
            />
          </div>
        </DropdownMenuTrigger>

        {/* === Dropdown Content === */}
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="w-screen sm:w-[360px] pb-4 rounded-sm border-none bg-white dark:bg-dark shadow-md dark:shadow-dark-md"
        >
          {/* === Header Section === */}
          <div className="px-6">
            <div className="flex items-center gap-6 pb-5 border-b border-border dark:border-darkborder mt-5 mb-3">
              <Image
                src="/images/profile/user-1.jpg"
                alt="User Avatar"
                height={56}
                width={56}
                className="rounded-full"
              />
              <div>
                <h5 className="text-base font-semibold">
                  David McMichael <span className="text-success">Pro</span>
                </h5>
                <p className="text-sm text-ld font-medium opacity-60">info@MatDash.com</p>
              </div>
            </div>
          </div>

          {/* === Menu Items === */}
          <SimpleBar>
            {profileData.profileDD.map((items, index) => (
              <div key={index} className="px-6 mb-2">
                <DropdownMenuItem
                  asChild
                  className="px-3 py-2 flex justify-between items-center bg-hover group/link w-full rounded-md cursor-pointer focus:bg-hover focus:text-primary"
                >
                  <Link href={items.url} className="flex items-center w-full">
                    <div className="flex gap-3 w-full">
                      <h5 className="text-sm font-normal group-hover/link:text-primary">
                        {items.title}
                      </h5>
                      {items.url === "/apps/invoice" && (
                        <Badge variant={"outline"}>
                          4
                        </Badge>
                      )}
                    </div>
                  </Link>
                </DropdownMenuItem>
              </div>
            ))}
          </SimpleBar>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
