"use client";

import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { Separator } from "@/components/ui/separator";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface WeeklyStatsProps {
  categories: string[];
  ordersSeries: number[];
  totalOrders: number;
  totalContacts: number;
  totalRevenueCents: number;
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

const WeeklyStats = ({
  categories,
  ordersSeries,
  totalOrders,
  totalContacts,
  totalRevenueCents,
}: WeeklyStatsProps) => {
  const maxValue = Math.max(...ordersSeries, 1);

  const chartData: any = {
    series: [
      {
        name: "Weekly Orders",
        data: ordersSeries,
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
      height: 220,
      type: "bar",
      offsetX: -10,
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    colors: ordersSeries.map((value) =>
      value === maxValue ? "var(--color-primary)" : "rgba(173,176,187,.15)"
    ),
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "55%",
        distributed: true,
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <CardBox className="flex flex-col px-6">
      <div>
        <h5 className="card-title">Weekly Stats</h5>
        <p className="card-subtitle">Orders over the last 7 days</p>
      </div>

      <div className="-me-12 rtl:me-0 rtl:-ms-12">
        <Chart
          options={chartData}
          series={chartData.series}
          type="bar"
          height="220px"
          width="100%"
        />
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between gap-4">
        <div className="basis-3/6">
          <div className="flex gap-3 items-center">
            <span className="h-12 w-12 shrink-0 flex items-center justify-center bg-lighterror rounded-tw">
              <Icon
                icon="solar:course-down-linear"
                className="text-error"
                height={24}
              />
            </span>
            <div>
              <p className="text-ld opacity-80">Weekly Revenue</p>
              <h5 className="font-bold text-15">
                {formatCurrency(totalRevenueCents)}
              </h5>
            </div>
          </div>
        </div>

        <div className="basis-3/6 ps-3">
          <div className="flex gap-3 items-center">
            <span className="h-12 w-12 shrink-0 flex items-center justify-center bg-lightprimary rounded-tw">
              <Icon
                icon="solar:chart-linear"
                className="text-primary"
                height={24}
              />
            </span>
            <div>
              <p className="text-ld opacity-80">Orders / Contacts</p>
              <h5 className="font-bold text-15">
                {totalOrders} / {totalContacts}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default WeeklyStats;