"use client";
import React, { useContext } from "react";
import { Card } from "@/components/ui/card";
import { useCustomizer } from "@/hooks/use-customizer";

interface MyAppProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}
const TitleCard: React.FC<MyAppProps> = ({ children, className, title }) => {
  const { activeMode, isCardShadow, isBorderRadius } =
    useCustomizer();
  return (
    <Card
      className={`card no-inset no-ring ${className} ${
        isCardShadow
          ? "dark:shadow-dark-md shadow-md p-0"
          : "shadow-none border border-ld p-0"
      } `}
      style={{
        borderRadius: `${isBorderRadius}px`,
      }}
    >
      <div className="border-b border-ld px-6 py-4">
        <h5 className="card-title">{title}</h5>
      </div>
      <div className="pt-4 p-6">{children}</div>
    </Card>
  );
};

export default TitleCard;
