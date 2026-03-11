"use client";

import { useSession } from "@/lib/auth-client";
import UserAccount from "./UserAccount";
import Accompte from "./Accompte";
import { Skeleton } from "@/components/ui/skeleton"

const SessionOrNot = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Skeleton className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-slate-200" />
      <Skeleton className="w-9 h-2 md:w-12 rounded bg-slate-200" />
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
