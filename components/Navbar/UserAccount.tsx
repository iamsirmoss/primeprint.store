import { Lock, LogOut, Settings, User as Use, LayoutDashboard, LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import SignOutButton from "../AuthPages/Sign-out-button";

interface UserAccountProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: "USER" | "ADMIN";
  };
}

const UserAccount = ({user}: UserAccountProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full border border-white cursor-pointer">
          {
            user.image ? 
            (<Image
              src={user.image || ''}
              alt="User profile picture"
              priority width={0} height={0} sizes='100vw'
              className="aspect-square size-6 md:size-8 rounded-full object-cover"
            />) 
            : 
            (
              <div className="size-6 md:size-8 border border-primary rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <span className="uppercase text-sm font-semibold">
                  {user.name?.slice(0, 2)}
                </span>
              </div>
            )
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          { user.role === "ADMIN" && (
          <>
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard" className="cursor-pointer">
              <LayoutDashboardIcon className="mr-2 h-4 w-4 text-black" />
              <span className="text-sm">Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          </>
          )}
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <Use className="mr-2 h-4 w-4 text-black" />
              <span className="text-sm">Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild> 
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccount
