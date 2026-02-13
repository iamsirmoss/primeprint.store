"use client"

import { User } from 'lucide-react'
import Link from 'next/link'

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
        <div className='flex flex-col items-center cursor-pointer text-xs group'>
          <User className='text-black group-hover:text-black/45 transition-all duration-500 cursor-pointer relative' />
          <h5 className="text-xs md:text-sm group-hover:text-black/45 transition-all duration-500 font-semibold">Account</h5>
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
