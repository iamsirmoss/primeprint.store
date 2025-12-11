"use client";

import { deleteUserAction } from "@/actions/delete-user-action";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


interface DeleteUserButtonProps {
  userId: string;
}

export const DeleteUserButton = ({ userId }: DeleteUserButtonProps) => {

      const [isPending, setIsPending] = useState(false);

      async function handleDelete() {
            setIsPending(true);

            const {error} = await deleteUserAction({ userId });

            if (error) {
                  toast.error(error);
            } else {
                  toast.success("User deleted successfully");
            }

            setIsPending(false);
      }

      return <Button
            variant="destructive"
            size="icon"
            className="size-7 rounded-sm cursor-pointer"
            disabled={isPending}
            onClick={handleDelete}
      >
            <span className="sr-only">Delete User</span>
            <TrashIcon />
      </Button>
}

export const PlaceholderDeleteUserButton = () => {
      return <Button
            variant="destructive"
            size="icon"
            className="size-7 rounded-sm cursor-pointer"
            disabled
      >
            <span className="sr-only">Delete User</span>
            <TrashIcon />
      </Button>
}