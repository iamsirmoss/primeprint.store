"use client";

import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface UsersBoxProps {
  totalUsers: number;
  adminUsers: number;
  managerUsers: number;
  staffUsers: number;
  verifiedUsers: number;
}

const UsersBox = ({
  totalUsers,
  adminUsers,
  managerUsers,
  staffUsers,
  verifiedUsers,
}: UsersBoxProps) => {
  const chartSeries = [
    {
      name: "Users",
      color: "var(--color-secondary)",
      data: [adminUsers, managerUsers, staffUsers, verifiedUsers, totalUsers],
    },
  ];

  const chartOptions: any = {
    chart: {
      id: "users-overview",
      type: "area",
      height: 95,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.2,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        formatter: (value: number) => `${value} users`,
      },
    },
  };

  const internalUsers = adminUsers + managerUsers + staffUsers;

  return (
    <CardBox className="shadow-none px-0 bg-lightsecondary dark:bg-lightsecondary overflow-hidden">
      <div className="flex justify-between px-6">
        <div>
          <p className="text-ld text-15 font-semibold">Users</p>
          <div className="flex gap-3 items-center mb-4">
            <h5 className="text-2xl font-bold">{totalUsers.toLocaleString()}</h5>
            <span className="text-13 text-ld font-semibold pt-1">
              {verifiedUsers} verified
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>Admins: {adminUsers}</span>
            <span>Managers: {managerUsers}</span>
            <span>Staff: {staffUsers}</span>
            <span>Internal: {internalUsers}</span>
          </div>
        </div>

        <span className="h-12 w-12 shrink-0 flex items-center justify-center bg-white dark:bg-dark rounded-tw">
          <Icon
            icon="solar:pie-chart-3-line-duotone"
            className="text-secondary"
            height={20}
          />
        </span>
      </div>

      <div>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height="98px"
          width="100%"
        />
      </div>
    </CardBox>
  );
};

export default UsersBox;