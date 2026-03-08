"use client"

import Link from 'next/link'
import { FaUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'


const Accompte = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex flex-col items-center cursor-pointer text-xs group gap-1'>
          <FaUserCircle className='text-lg md:text-[24px] mt-1 text-black/90 group-hover:text-black transition-all duration-500 cursor-pointer relative' />
          <h5 className="text-xs md:text-sm group-hover:underline transition-all duration-500 font-medium">Login</h5>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" align="start">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={'/login'} 
              className='cursor-pointer font-medium text-lg'>
                Sign in        
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={'/register'} 
              className='cursor-pointer font-medium text-lg border-t'>
                Sign up       
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Accompte
