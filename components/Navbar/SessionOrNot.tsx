"use client";

import { useSession } from "@/lib/auth-client";
import UserAccount from "./UserAccount";
import Accompte from "./Accompte";
import { Skeleton } from "@/components/ui/skeleton"

const SessionOrNot = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
  return (
    <div className="flex justify-center items-center">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}

  return session ? (
    <UserAccount user={session.user} />
  ) : (
    <Accompte />
  );
};

export default SessionOrNot;
