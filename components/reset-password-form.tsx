"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/auth-client";
import { Eye, EyeOff, KeySquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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
        <KeySquare className="absolute top-1.5 text-blue-300" />
        <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="New password" className="peer w-full bg-transparent pl-9 py-2 focus:outline-none" />
        {/* base line */}
        <span className="absolute left-0 bottom-0 h-px w-full bg-blue-300 transition-all duration-300" />
                                
        {/* focus line */}
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-500 transition-all duration-300 peer-focus:w-full" />
                                
        {/* Toggle icon */}
        <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-2 text-gray-400 hover:text-blue-400 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
        >
              {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <div className="relative mt-8">
        <KeySquare className="absolute top-1.5 text-blue-300" />
        <input type={showPassword2 ? "text" : "password"} id="confirmPassword" name="confirmPassword" placeholder="Confirm password" className="peer w-full bg-transparent pl-9 py-2 focus:outline-none" />
        {/* base line */}
        <span className="absolute left-0 bottom-0 h-px w-full bg-blue-300 transition-all duration-300" />
                                
        {/* focus line */}
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-500 transition-all duration-300 peer-focus:w-full" />
                                
        {/* Toggle icon */}
        <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-0 top-2 text-gray-400 hover:text-blue-400 transition"
              aria-label={showPassword2 ? "Hide password" : "Show password"}
        >
              {showPassword2 ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <Button size='lg' type="submit" disabled={isPending} className="rounded cursor-pointer transition-all duration-300 hover:bg-blue-400">
        Reset password
      </Button>
    </form>
  );
};