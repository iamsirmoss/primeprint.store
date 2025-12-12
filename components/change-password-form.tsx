"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordAction } from "@/actions/change-password-action";
import { toast } from "sonner";
import { EyeOff } from "lucide-react";

export const ChangePasswordForm = () => {
  const [isPending, setIsPending] = useState(false);

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
        <EyeOff className="absolute top-2 text-blue-300" />
        <input type="password" id="currentPassword" name="currentPassword" placeholder="Current password ****" className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
      hover:border-b-red-500 transition-all duration-300 bg-transparent" />
      </div>

      <div className="relative mt-8">
        <EyeOff className="absolute top-2 text-blue-300" />
        <input type="password" id="newPassword" name="newPassword" placeholder="New password ****" className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
      hover:border-b-red-500 transition-all duration-300 bg-transparent" />
      </div>

      <Button size="lg" type="submit" disabled={isPending} className="rounded cursor-pointer transition-all duration-300 hover:bg-blue-400">
        Change Password
      </Button>
    </form>
  );
};