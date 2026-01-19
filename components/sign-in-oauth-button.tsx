"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/auth-client';
import { toast } from 'sonner';

interface SignInOAuthButtonProps {
      provider: 'google' | 'github';
      signUp?: boolean;
}

const SignInOAuthButton = ({ provider, signUp }: SignInOAuthButtonProps) => {

      const [isPending, setIsPending] = useState(false);

      const handleClick = async () => {
            await signIn.social({
              provider,
              callbackURL: "/profile",
              errorCallbackURL: "/login/error",
              fetchOptions: {
                onRequest: () => {
                  setIsPending(true)
                },
                onResponse: () => {
                  setIsPending(false)
                },
                onError: (ctx) => {
                  toast.error(ctx.error.message)
                }
              }
            })
      }

      const action = signUp ? 'up' : 'in';
      const providerName = provider === 'google' ? 'google' : 'gitHub';

  return (
    <Button type='button' onClick={handleClick} disabled={isPending} className='flex flex-col justify-center items-center gap-3 py-7 rounded bg-black 
    hover:bg-black/80 w-full transition-all duration-300 cursor-pointer'>
      Sign {action} with {providerName}
    </Button>
  )
}

export default SignInOAuthButton
