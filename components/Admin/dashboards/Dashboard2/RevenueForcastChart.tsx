"use client";

import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RevenueForcastChartProps {
  currentYear: number;
  previousYear: number;
  categories: string[];
  currentYearSeriesCents: number[];
  previousYearSeriesCents: number[];
  currentYearRevenueYtdCents: number;
  previousYearRevenueYtdCents: number;
  yearOverYearGrowthPercent: number;
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

const RevenueForcastChart = ({
  currentYear,
  previousYear,
  categories,
  currentYearSeriesCents,
  previousYearSeriesCents,
  currentYearRevenueYtdCents,
  previousYearRevenueYtdCents,
  yearOverYearGrowthPercent,
}: RevenueForcastChartProps) => {
  const chartSeries = [
    {
      name: `${currentYear}`,
      data: currentYearSeriesCents.map((value) => Number((value / 100).toFixed(2))),
    },
    {
      name: `${previousYear}`,
      data: previousYearSeriesCents.map((value) => Number((value / 100).toFixed(2))),
    },
  ];

  const chartOptions: any = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "bar",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 295,
      stacked: false,
      offsetX: -15,
    },
    colors: ["var(--color-primary)", "var(--color-error)"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "35%",
        borderRadius: [6],
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
      padding: {
        top: 0,
        bottom: 0,
        right: 0,
      },
      borderColor: "rgba(0,0,0,0.05)",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories,
      labels: {
        style: {
          fontSize: "13px",
          colors: "#adb0bb",
          fontWeight: "400",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `$${Math.round(value).toLocaleString()}`,
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value: number) => `$${value.toLocaleString()}`,
      },
    },
  };

  return (
    <CardBox className="px-6">
      <div className="md:flex justify-between items-center">
        <div>
          <h5 className="card-title">Revenue Forecast</h5>
          <p className="card-subtitle">Monthly revenue comparison by year</p>
        </div>

        <div className="flex gap-5 items-center md:mt-0 mt-4">
          <div className="flex gap-2 text-sm items-center">
            <span className="bg-primary rounded-full h-2 w-2"></span>
            <span className="text-ld opacity-80">{currentYear}</span>
          </div>

          <div className="flex gap-2 text-sm text-ld items-center">
            <span className="bg-error rounded-full h-2 w-2"></span>
            <span className="text-ld opacity-80">{previousYear}</span>
          </div>
        </div>
      </div>

      <div className="rounded-bars">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height="298px"
          width="100%"
        />
      </div>

      <div className="flex md:flex-row flex-col gap-3">
        <div className="md:basis-1/3 basis-full">
          <div className="flex gap-3 items-center">
            <span className="h-12 w-12 shrink-0 flex items-center justify-center bg-muted dark:bg-dark rounded-tw">
              <Icon
                icon="solar:pie-chart-2-linear"
                className="text-ld"
                height={24}
              />
            </span>
            <div>
              <p>{currentYear} YTD</p>
              <h5 className="font-medium text-lg">
                {formatCurrency(currentYearRevenueYtdCents)}
              </h5>
            </div>
          </div>
        </div>

        <div className="md:basis-1/3 basis-full">
          <div className="flex gap-3 items-center">
            <span className="h-12 w-12 shrink-0 flex items-center justify-center bg-lightprimary rounded-tw">
              <Icon
                icon="solar:dollar-minimalistic-linear"
                className="text-primary"
                height={24}
              />
            </span>
            <div>
              <p>{previousYear} YTD</p>
              <h5 className="font-medium text-lg">
                {formatCurrency(previousYearRevenueYtdCents)}
              </h5>
            </div>
          </div>
        </div>

        <div className="md:basis-1/3 basis-full">
          <div className="flex gap-3 items-center">
            <span className="h-12 w-12 shrink-0 flex items-center justify-center bg-lighterror rounded-tw">
              <Icon
                icon="solar:database-linear"
                className={
                  yearOverYearGrowthPercent >= 0 ? "text-success" : "text-error"
                }
                height={24}
              />
            </span>
            <div>
              <p>Growth</p>
              <h5 className="font-medium text-lg">
                {formatPercent(yearOverYearGrowthPercent)}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default RevenueForcastChart;