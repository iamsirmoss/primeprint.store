import { Lock, LogOut, Settings, User as Use, LayoutDashboard } from "lucide-react";
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
  };
}

const UserAccount = ({user}: UserAccountProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full border border-red-500 cursor-pointer">
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
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <Use className="mr-2 h-4 w-4 text-black" />
              <span className="text-sm">Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/parametres" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-black" />
              <span className="text-sm">Paramètres</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild> 
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccount
