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
        <User className='text-black hover:text-blue-400 transition-all duration-300 cursor-pointer relative' />
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
