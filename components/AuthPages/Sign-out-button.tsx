"use client"

import React, { use } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth-client'
import { toast } from 'sonner'

const SignOutButton = () => {

      const router = useRouter();

      async function handleSignOut() {
            await signOut({
                  fetchOptions: {
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
      <Button onClick={handleSignOut} size="sm" variant="destructive" >Sign Out</Button>
  )
}

export default SignOutButton
