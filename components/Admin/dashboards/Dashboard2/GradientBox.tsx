"use client";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface UserAccountProps {
  user: {
    name?: string | null;
    email?: string | null;
    // image?: string | null;
    role: "USER" | "ADMIN" | "MANAGER" | "STAFF";
  };
}

const GradientBox = ({user}: UserAccountProps) => {
  return (
    <>
      <CardBox className="bg-linear-to-l from-primary to-[#5a52ff] relative overflow-hidden shadow-none px-6">
        <div className="bg-black/10 px-3 py-1.5 rounded-md w-fit">
          <div className="flex items-center gap-2 text-white">
            <Icon icon="solar:check-circle-outline" height={18} />
            This month <span className="font-semibold">+15% Profit</span>
          </div>
        </div>
        <div className="pt-20 relative z-1">
          <h5 className="text-2xl text-white">
            Hey,<span className="font-bold">{user.name}</span>
          </h5>
          <p className="font-normal opacity-75 text-white text-15 mt-1">
            Aenean vel libero id metus sollicitudin
          </p>
        </div>
        <Image
          src={"/images/backgrounds/welcome-bg2.png"}
          alt="background"
          className="absolute bottom-0 end-0 rtl:scale-x-[-1]"
          width={285}
          height={179}
        />
      </CardBox>
    </>
  );
};

export default GradientBox;
