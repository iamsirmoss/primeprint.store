"use client";

import { useSession } from "@/lib/auth-client";
import UserAccount from "./UserAccount";
import Accompte from "./Accompte";

const SessionOrNot = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
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
