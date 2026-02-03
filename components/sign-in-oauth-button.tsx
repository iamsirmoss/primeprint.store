// "use client"

// import React, { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { signIn } from '@/lib/auth-client';
// import { toast } from 'sonner';

// interface SignInOAuthButtonProps {
//       provider: 'google' | 'github';
//       signUp?: boolean;
// }

// const SignInOAuthButton = ({ provider, signUp }: SignInOAuthButtonProps) => {

//       const [isPending, setIsPending] = useState(false);

//       const handleClick = async () => {
//             await signIn.social({
//               provider,
//               callbackURL: "/profile",
//               errorCallbackURL: "/login/error",
//               fetchOptions: {
//                 onRequest: () => {
//                   setIsPending(true)
//                 },
//                 onResponse: () => {
//                   setIsPending(false)
//                 },
//                 onError: (ctx) => {
//                   toast.error(ctx.error.message)
//                 }
//               }
//             })
//       }

//       const action = signUp ? 'up' : 'in';
//       const providerName = provider === 'google' ? 'google' : 'gitHub';

//   return (
//     <Button type='button' onClick={handleClick} disabled={isPending} className='flex flex-col justify-center items-center gap-3 py-7 rounded bg-black 
//     hover:bg-black/80 w-full transition-all duration-300 cursor-pointer'>
//       Sign {action} with {providerName}
//     </Button>
//   )
// }

// export default SignInOAuthButton

"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

interface SignInOAuthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
  callbackURL?: string; // ✅ add
}

function safeCallback(cb?: string) {
  if (!cb) return "/profile";
  if (!cb.startsWith("/")) return "/profile";
  if (cb.startsWith("//")) return "/profile";
  return cb;
}

const SignInOAuthButton = ({ provider, signUp, callbackURL }: SignInOAuthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const cb = useMemo(() => safeCallback(callbackURL), [callbackURL]);

  const handleClick = async () => {
    await signIn.social({
      provider,
      callbackURL: cb, // ✅ use passed callback
      errorCallbackURL: "/login/error",
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => {toast.error(ctx.error.message)},
      },
    });
  };

  const action = signUp ? "up" : "in";
  const providerName = provider === "google" ? "Google" : "GitHub";

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="flex flex-col justify-center items-center gap-3 py-7 rounded bg-black hover:bg-black/80 w-full transition-all duration-300 cursor-pointer"
    >
      {isPending ? "Redirecting..." : `Sign ${action} with ${providerName}`}
    </Button>
  );
};

export default SignInOAuthButton;
