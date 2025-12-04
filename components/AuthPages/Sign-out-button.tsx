"use client"

import React, { use, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth-client'
import { toast } from 'sonner'
import { LogOut } from 'lucide-react'

const SignOutButton = () => {

      const [isPending, setPending] = useState(false);
      const router = useRouter();

      async function handleSignOut() {
            await signOut({
                  fetchOptions: {
                        onRequest: () => {
                              setPending(true);
                        },
                        onResponse: () => {
                              setPending(false);
                        },
                        onError: (ctx) => {
                              toast.error(ctx.error.message)
                        },
                        onSuccess: () => {
                              toast.success('Signed out successfully.')
                              router.push('/login');
                        }
                  }
            })
      }

  return (
      <button onClick={handleSignOut} disabled={isPending} className='flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer'>
            <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
            <span className='text-sm'>Sign Out</span>
      </button>
  )
}

export default SignOutButton
