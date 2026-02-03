// "use client";

// import { useRef, useState } from "react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Mail, StarIcon } from "lucide-react";
// import { signIn } from "@/lib/auth-client";
// import { toast } from "sonner";

// export const MagicLinkLoginForm = () => {
//   const [isPending, setIsPending] = useState(false);
//   const ref = useRef<HTMLDetailsElement>(null);

//   async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
//     evt.preventDefault();
//     const formData = new FormData(evt.currentTarget);
//     const email = String(formData.get("email"));

//     if (!email) return toast.error("Please enter your email.");

//     await signIn.magicLink({
//       email,
//       name: email.split("@")[0],
//       callbackURL: "/profile",
//       fetchOptions: {
//         onRequest: () => {
//           setIsPending(true);
//         },
//         onResponse: () => {
//           setIsPending(false);
//         },
//         onError: (ctx) => {
//           toast.error(ctx.error.message);
//         },
//         onSuccess: () => {
//           toast.success("Check your email for the magic link!");
//           if (ref.current) ref.current.open = false;
//           (evt.target as HTMLFormElement).reset()
//         },
//       },
//     });
//   }

//   return (
//     <details
//       ref={ref}
//       className="w-full rounded border overflow-hidden"
//     >
//       <summary className="flex gap-2 items-center justify-center px-2 py-4 bg-black text-white hover:bg-black/80 transition duration-300 cursor-pointer text-sm font-semibold">
//         Continue with email link
//       </summary>

//       <form onSubmit={handleSubmit} className="px-2 py-1">
//         <Label htmlFor="email" className="sr-only">
//           Email
//         </Label>
//         <div className="flex gap-2 items-center">
//             <div className="relative w-full">
//                   <Mail className="absolute top-2.5" />
//                   <input type="email" id="email" name="email" className="peer w-full bg-transparent pl-9 py-2 focus:outline-none" placeholder="Email" />
//                   {/* base line */}
//                   <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />

//                   {/* focus line */}
//                   <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
//             </div>
//           <Button disabled={isPending} className="rounded cursor-pointer transition-all duration-300 hover:bg-blue-400">Send</Button>
//         </div>
//       </form>
//     </details>
//   );
// };

"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Mail } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

function safeCallback(cb?: string | null) {
  if (!cb) return "";
  if (!cb.startsWith("/")) return "";
  // optionnel: éviter des redirects vers des routes sensibles
  // if (cb.startsWith("/api")) return "";
  return cb;
}

export const MagicLinkLoginForm = ({
  callbackURL,
}: {
  callbackURL?: string;
}) => {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);
  const searchParams = useSearchParams();

  const cb =
    safeCallback(callbackURL) ||
    safeCallback(searchParams.get("callbackURL")) ||
    "/profile";

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email") || "").trim();

    if (!email) return toast.error("Please enter your email.");

    await signIn.magicLink({
      email,
      name: email.split("@")[0],
      callbackURL: cb,
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => {toast.error(ctx.error.message)},
        onSuccess: () => {
          toast.success("Check your email for the magic link!");
          if (ref.current) ref.current.open = false;
          (evt.target as HTMLFormElement).reset();
        },
      },
    });
  }

  return (
    <details ref={ref} className="w-full rounded border overflow-hidden">
      <summary className="flex gap-2 items-center justify-center px-2 py-4 bg-black text-white hover:bg-black/80 transition duration-300 cursor-pointer text-sm font-semibold">
        Continue with email link
      </summary>

      <form onSubmit={handleSubmit} className="px-2 py-1">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>

        <div className="flex gap-2 items-center">
          <div className="relative w-full">
            <Mail className="absolute top-2.5" />
            <input
              type="email"
              id="email"
              name="email"
              className="peer w-full bg-transparent pl-9 py-2 focus:outline-none"
              placeholder="Email"
              autoComplete="email"
            />
            <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
          </div>

          <Button
            disabled={isPending}
            className="rounded cursor-pointer transition-all duration-300 hover:bg-blue-400"
            type="submit"
          >
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>

        {/* petit helper optionnel */}
        <p className="mt-2 text-xs text-gray-500">
          After sign-in, you’ll be redirected to:{" "}
          <span className="font-mono">{cb}</span>
        </p>
      </form>
    </details>
  );
};
