"use client";

import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import { Progress } from "@/components/ui/progress";

interface NewCustomersProps {
  newCustomersThisMonth: number;
  verifiedNewCustomersThisMonth: number;
  verifiedNewCustomersRate: number;
}

function formatPercent(value: number) {
  return `${value.toFixed(0)}%`;
}

const NewCustomers = ({
  newCustomersThisMonth,
  verifiedNewCustomersThisMonth,
  verifiedNewCustomersRate,
}: NewCustomersProps) => {
  return (
    <CardBox className="px-6">
      <div className="flex items-center gap-3">
        <span className="h-12 w-12 shrink-0 flex items-center justify-center bg-lightsecondary rounded-tw">
          <Icon
            icon="solar:users-group-rounded-outline"
            className="text-secondary"
            height={24}
          />
        </span>
        <span className="font-medium text-base text-ld">New Customers</span>
      </div>

      <div className="mt-8 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-ld text-15 font-medium">This month</span>
          <span className="text-ld text-15 font-medium">
            {newCustomersThisMonth.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Verified</span>
          <span className="text-sm font-medium">
            {verifiedNewCustomersThisMonth} / {newCustomersThisMonth}
          </span>
        </div>

        <Progress value={verifiedNewCustomersRate} className="mt-2" />

        <p className="text-xs text-muted-foreground pt-1">
          Verification rate: {formatPercent(verifiedNewCustomersRate)}
        </p>
      </div>
    </CardBox>
  );
};

export default NewCustomers;