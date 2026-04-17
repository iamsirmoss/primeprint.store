"use client";

import { Card } from "@/components/ui/card";
import { useCustomizer } from "@/hooks/use-customizer";
import React from "react";

interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}

const CardBox: React.FC<MyAppProps> = ({ children, className }) => {
  const { isCardShadow, isBorderRadius } = useCustomizer();

  return (
    <Card
      className={`card no-inset no-ring bg-white dark:bg-darkgray flex flex-col gap-2 ${className} ${
        isCardShadow
          ? "dark:shadow-dark-md shadow-md border-none! dark:border-none!"
          : "shadow-none border border-ld"
      }`}
      style={{
        borderRadius: `${isBorderRadius}px`,
      }}
    >
      {children}
    </Card>
  );
};

export default CardBox;