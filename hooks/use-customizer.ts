"use client";

import { useContext } from "react";
import { CustomizerContext } from "@/components/CustomizerContext";

export function useCustomizer() {
  const context = useContext(CustomizerContext);

  if (!context) {
    throw new Error("useCustomizer must be used within CustomizerContextProvider");
  }

  return context;
}