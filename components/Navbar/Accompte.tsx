"use client"

import { User } from 'lucide-react'
import Link from 'next/link'
import { RiCloseFill } from 'react-icons/ri'

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
        <User className='text-2xl md:text-3xl text-black hover:text-blue-400 transition-all duration-300 cursor-pointer relative' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" align="start">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={'/login'} 
              className='cursor-pointer font-semibold text-lg'>
                Sign in        
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={'/register'} 
              className='cursor-pointer font-semibold text-lg border-t text-gray-500'>
                Sign up       
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Accompte
