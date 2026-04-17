"use client";

import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TotalIncomeProps {
  totalIncomeCents: number;
  incomeThisMonthCents: number;
  incomeLastMonthCents: number;
  incomeGrowthPercent: number;
  categories: string[];
  seriesCents: number[];
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function formatPercent(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

const TotalIncome = ({
  totalIncomeCents,
  incomeThisMonthCents,
  incomeLastMonthCents,
  incomeGrowthPercent,
  categories,
  seriesCents,
}: TotalIncomeProps) => {
  const chartOptions: any = {
    chart: {
      id: "sparkline-income",
      type: "line",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 80,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: "Income",
        color: "var(--color-error)",
        data: seriesCents.map((value) => Number((value / 100).toFixed(2))),
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
    },
    grid: {
      padding: {
        top: 6,
        bottom: 6,
        left: 0,
        right: 0,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: true,
        formatter: (_: unknown, opts: { dataPointIndex: number }) =>
          categories[opts.dataPointIndex] ?? "",
      },
      y: {
        formatter: (value: number) => `$${value.toLocaleString()}`,
      },
    },
  };

  return (
    <CardBox className="mt-7 px-6 py-5 overflow-hidden">
      <div className="flex items-center gap-3">
        <span className="h-12 w-12 shrink-0 flex items-center justify-center bg-lighterror rounded-tw">
          <Icon icon="solar:box-linear" className="text-error" height={24} />
        </span>
        <span className="font-medium text-base text-ld">Total Income</span>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div className="min-w-0">
          <h4 className="text-2xl font-bold leading-tight wrap-break-word">
            {formatCurrency(totalIncomeCents)}
          </h4>

          <span
            className={`mt-1 inline-block font-semibold ${
              incomeGrowthPercent >= 0 ? "text-success" : "text-error"
            }`}
          >
            {formatPercent(incomeGrowthPercent)}
          </span>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">This month</span>
              <span className="font-medium text-foreground">
                {formatCurrency(incomeThisMonthCents)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">Last month</span>
              <span className="font-medium text-foreground">
                {formatCurrency(incomeLastMonthCents)}
              </span>
            </div>
          </div>
        </div>

        <div className="min-w-0 w-full overflow-hidden">
          <div className="h-[90px] w-full">
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type="line"
              height="90px"
              width="100%"
            />
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default TotalIncome;