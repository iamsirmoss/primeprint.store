"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendVerificationEmail } from "@/lib/auth-client";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const SendVerificationEmailForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email.");

    await sendVerificationEmail({
      email,
      callbackURL: "/auth/verify",
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
          toast.success("Verification email sent successfully.");
          router.push("/auth/verify/success");
        },
      },
    });
  }

  return (
    <form className="w-full space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="relative mt-8">
            <Mail className="absolute top-2 text-blue-300" />
            <input
            name='email'
            type="email" 
            id="email"
            className="peer w-full bg-transparent pl-9 py-2 focus:outline-none" placeholder="Email"
            />
            {/* base line */}
            <span className="absolute left-0 bottom-0 h-px w-full bg-blue-300 transition-all duration-300" />

            {/* focus line */}
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-500 transition-all duration-300 peer-focus:w-full" />
      </div>

      <Button size="lg" type="submit" disabled={isPending} className="rounded cursor-pointer transition-all duration-300 hover:bg-blue-400">
        Resend verification email
      </Button>
    </form>
  );
};