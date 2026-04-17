"use client";

import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SubscriptionsProps {
  totalPackages: number;
  activePackages: number;
  soldPackages: number;
  packageOrders: number;
}

const Subscriptions = ({
  totalPackages,
  activePackages,
  soldPackages,
  packageOrders,
}: SubscriptionsProps) => {
  const chartSeries = [
    {
      name: "Packages",
      data: [totalPackages, activePackages, soldPackages, packageOrders],
    },
    {
      name: "Reference",
      data: [
        Math.max(totalPackages, 1),
        Math.max(totalPackages, 1),
        Math.max(totalPackages, 1),
        Math.max(totalPackages, 1),
      ],
    },
  ];

  const chartOptions: any = {
    series: chartSeries,
    chart: {
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      type: "bar",
      height: 98,
      stacked: true,
      offsetX: 0,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ["var(--color-white)", "rgba(255,255,255,0.45)"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "26%",
        borderRadius: [3],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value: number) => `${value}`,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["Total", "Active", "Sold", "Orders"],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
  };

  return (
    <CardBox className="shadow-none px-6 bg-lighterror dark:bg-lighterror h-full">
      <div className="flex justify-between">
        <div>
          <p className="text-ld text-15 font-semibold">Packages</p>

          <div className="flex gap-3 items-center mb-4">
            <h5 className="text-2xl font-bold">
              {totalPackages.toLocaleString()}
            </h5>
            <span className="text-13 text-ld font-semibold pt-1">
              {activePackages} active
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>Sold: {soldPackages}</span>
            <span>Orders: {packageOrders}</span>
          </div>
        </div>

        <span className="h-12 w-12 shrink-0 flex items-center justify-center bg-white dark:bg-dark rounded-tw">
          <Icon
            icon="solar:layers-linear"
            className="text-error"
            height={20}
          />
        </span>
      </div>

      <div className="rounded-bars">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height="100px"
          width="100%"
        />
      </div>
    </CardBox>
  );
};

export default Subscriptions;