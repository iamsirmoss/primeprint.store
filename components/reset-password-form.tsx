"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/auth-client";
import { EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);

    const password = String(formData.get("password"));
    if (!password) return toast.error("Please enter your email.");

    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    await resetPassword({
      newPassword: password,
      token,
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
          toast.success("Password reset successfully.");
          router.push("/login");
        },
      },
    });
  }

  return (
    <form className="w-full space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="relative mt-8">
        <EyeOff className="absolute top-1.5 text-blue-300" />
        <input type="password" id="password" name="password" placeholder="New password" className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
      hover:border-b-red-500 transition-all duration-300 bg-transparent" />
      </div>

      <div className="relative mt-8">
        <EyeOff className="absolute top-1.5 text-blue-300" />
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
      hover:border-b-red-500 transition-all duration-300 bg-transparent" />
      </div>

      <Button size='lg' type="submit" disabled={isPending} className="rounded cursor-pointer transition-all duration-300 hover:bg-blue-400">
        Reset password
      </Button>
    </form>
  );
};