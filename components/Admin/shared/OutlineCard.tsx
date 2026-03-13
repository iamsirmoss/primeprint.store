"use client";

import { Card } from "@/components/ui/card";
import { useCustomizer } from "@/hooks/use-customizer";
import React, { useContext } from "react";


interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}
const OutlineCard: React.FC<MyAppProps> = ({ children, className }) => {
  const { activeMode, isCardShadow } = useCustomizer();
  return (
    <Card className={`card no-inset no-ring h-full w-full`}>{children}</Card>
  );

};

export default OutlineCard;