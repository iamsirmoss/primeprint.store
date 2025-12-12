"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Mail, StarIcon } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export const MagicLinkLoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email.");

    await signIn.magicLink({
      email,
      name: email.split("@")[0],
      callbackURL: "/profile",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Check your email for the magic link!");
          if (ref.current) ref.current.open = false;
          (evt.target as HTMLFormElement).reset()
        },
      },
    });
  }

  return (
    <details
      ref={ref}
      className="w-full rounded border border-blue-400 overflow-hidden"
    >
      <summary className="flex gap-2 items-center px-2 py-2 bg-black text-white hover:bg-black/80 transition duration-300 cursor-pointer">
        Try magic link <StarIcon size={16} />
      </summary>

      <form onSubmit={handleSubmit} className="px-2 py-1">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <div className="flex gap-2 items-center">
            <div className="relative w-full">
                  <Mail className="absolute top-2.5 text-blue-300" />
                  <input type="email" id="email" name="email" className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
                  hover:border-b-red-500 transition-all duration-300 bg-transparent" placeholder="Email" />
            </div>
          <Button disabled={isPending} className="rounded cursor-pointer transition-all duration-300 hover:bg-blue-400">Send</Button>
        </div>
      </form>
    </details>
  );
};