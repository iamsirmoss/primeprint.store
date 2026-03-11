"use client";

import { Icon } from "@iconify/react";
import * as Notification from "./Data";
import SimpleBar from "simplebar-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  return (
    <div className="relative group/menu">
      <DropdownMenu>
        {/* === Trigger Icon === */}
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <span className="h-10 w-10 hover:bg-lightprimary text-darklink dark:text-white rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary dark:group-hover/menu:text-primary">
              <Icon icon="solar:bell-bing-line-duotone" height={20} />
            </span>
            <span className="rounded-full absolute end-1 top-1 bg-error text-[10px] h-4 w-4 flex justify-center items-center text-white">
              5
            </span>
          </div>
        </DropdownMenuTrigger>

        {/* === Dropdown Content === */}
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="w-screen sm:w-[360px] py-6 rounded-sm bg-white dark:bg-dark shadow-md"
        >
          {/* Header */}
          <div className="flex items-center px-6 justify-between">
            <h3 className="mb-0 text-lg font-semibold text-ld">Notifications</h3>
            <Badge className="bg-primary text-white">5 new</Badge>
          </div>

          {/* Notification List */}
          <SimpleBar className="max-h-80 mt-3">
            {Notification.Notification.map((links, index) => (
              <DropdownMenuItem
                asChild
                key={index}
                className="px-6 py-3 flex justify-between items-center bg-hover group/link w-full cursor-pointer focus:bg-hover focus:text-primary"
              >
                <Link href="#">
                  <div className="flex items-center w-full">
                    <div
                      className={`h-11 w-11 shrink-0 rounded-full flex justify-center items-center ${links.bgcolor}`}
                    >
                      <Icon
                        icon={links.icon}
                        height={20}
                        className={links.color}
                      />
                    </div>
                    <div className="ps-4 flex justify-between w-full">
                      <div className="w-3/4 text-start">
                        <h5 className="mb-1 text-15 font-semibold group-hover/link:text-primary">
                          {links.title}
                        </h5>
                        <div className="text-sm text-bodytext line-clamp-1">
                          {links.subtitle}
                        </div>
                      </div>

                      <div className="text-xs block self-start pt-1.5">
                        {links.time}
                      </div>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </SimpleBar>

          {/* Footer Button */}
          <div className="pt-5 px-6">
            <Button className="w-full bg-primary text-white hover:bg-primary/90">
              <Link href={"/apps/user-profile/profile"}>
                See All Notifications
              </Link>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notifications;
