"use client"

import Link from 'next/link'
import { CircleUser } from 'lucide-react';
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
        <button className='flex flex-col items-center cursor-pointer group gap-1'>
          <div className='p-3 shadow-xl shadow-blue-500/30 backdrop-blur-md px-1.5 py-2 rounded-md bg-white hover:bg-gray-200 transition-all duration-300'>
            <CircleUser className='size-4 md:size-5 text-black/50' />
          </div>
          {/* <h5 className="text-xs md:text-sm group-hover:underline transition-all duration-500 font-medium">Login</h5> */}
        </button>
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
