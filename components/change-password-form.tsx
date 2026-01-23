"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordAction } from "@/actions/change-password-action";
import { toast } from "sonner";
import { Eye, EyeOff, KeySquare } from "lucide-react";

export const ChangePasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    setIsPending(true);

    const { error } = await changePasswordAction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Password changed successfully");
      (evt.target as HTMLFormElement).reset();
    }

    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 mt-10">
      <div className="relative mt-8">
        <KeySquare className="absolute top-2" />
        <input 
        type={showPassword ? "text" : "password"} 
        id="currentPassword" name="currentPassword" 
        placeholder="Current password ****" 
        className="peer w-full bg-transparent pl-9 py-2 pr-10 focus:outline-none" />
        {/* base line */}
        <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
                        
        {/* focus line */}
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                        
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
        <KeySquare className="absolute top-2" />
        <input 
        type={showPassword2 ? "text" : "password"} 
        id="newPassword" name="newPassword" 
        placeholder="New password ****" 
        className="peer w-full bg-transparent pl-9 py-2 pr-10 focus:outline-none" />
        {/* base line */}
        <span className="absolute left-0 bottom-0 h-px w-full bg-gray-300 transition-all duration-300" />
                        
        {/* focus line */}
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 peer-focus:w-full" />
                        
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

      <Button size="lg" type="submit" disabled={isPending} className="rounded cursor-pointer transition-all duration-300 hover:bg-blue-400">
        Change password
      </Button>
    </form>
  );
};