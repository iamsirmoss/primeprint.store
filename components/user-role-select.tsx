"use client"

import { admin } from "@/lib/auth-client";
import { UserRole } from "@/lib/generated/prisma/enums";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserRoleSelectProps {
      userId: string;
      role: UserRole;
}

const UserRoleSelect = ({userId, role}: UserRoleSelectProps) => {

      const [isPending, setIsPending] = useState(false);
      const router = useRouter();

      const handleChange = async (evt: React.ChangeEvent<HTMLSelectElement>) => {
            const newRole = evt.target.value as UserRole;

            const canChangeRole = await admin.hasPermission({
                  permissions: {
                        user: ["set-role"]
                  }
            })

            if (canChangeRole.error) {
                  return toast.error("Forbidden");
            }

            await admin.setRole({
                  userId,
                  role: newRole,
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
                              toast.success("Role updated");
                              router.refresh();
                        }
                  }
            })

            setIsPending(true);
      }

  return (
    <select
      value={role}
      onChange={handleChange}
      disabled={role === "ADMIN" || isPending}
      className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
      <option value="USER">USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  )
}

export default UserRoleSelect
