"use client";

import React from "react";
import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AnnualProfitProps {
  fulfillmentRate: number;
  completedOrdersThisYear: number;
  requiresApprovalProducts: number;
  requiresUploadProducts: number;
  productOrderItems: number;
  packageOrderItems: number;
  productMixPercent: number;
  packageMixPercent: number;
  totalOrderItems: number;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

const AnnualProfit = ({
  fulfillmentRate,
  completedOrdersThisYear,
  requiresApprovalProducts,
  requiresUploadProducts,
  productOrderItems,
  packageOrderItems,
  productMixPercent,
  packageMixPercent,
  totalOrderItems,
}: AnnualProfitProps) => {
  const chartData: any = {
    chart: {
      id: "annual-profit",
      type: "area",
      height: 80,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    series: [
      {
        name: "Fulfillment",
        color: "var(--color-primary)",
        data: [
          0,
          Math.max(fulfillmentRate * 0.45, 1),
          Math.max(fulfillmentRate * 0.7, 1),
          Math.max(fulfillmentRate * 0.9, 1),
          fulfillmentRate,
        ],
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      color: "var(--color-primary)",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.1,
        opacityTo: 0.8,
        stops: [100],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
      y: {
        formatter: (value: number) => `${value.toFixed(1)}%`,
      },
    },
  };

  return (
    <CardBox className="h-full px-6">
      <div>
        <h5 className="card-title">Annual Operations</h5>

        <div className="bg-lightprimary mt-4 overflow-hidden rounded-md mb-1">
          <div className="py-7 px-6 flex justify-between items-center">
            <p className="text-ld">Fulfillment Rate</p>
            <h4 className="text-3xl">{formatPercent(fulfillmentRate)}</h4>
          </div>

          <Chart
            options={chartData}
            series={chartData.series}
            type="area"
            height="60px"
            width="100%"
            className="mt-4"
          />
        </div>

        <div className="flex items-center justify-between py-4 border-b border-ld">
          <div>
            <span className="font-medium text-ld opacity-80">
              Completed Orders
            </span>
            <p className="text-13">This year</p>
          </div>
          <div className="text-end">
            <h6 className="text-15 font-bold">
              {completedOrdersThisYear.toLocaleString()}
            </h6>
            <span className="text-13 text-success font-medium">
              done successfully
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-ld">
          <div>
            <span className="font-medium text-ld opacity-80">
              Approval Required Products
            </span>
            <p className="text-13">{requiresApprovalProducts} products</p>
          </div>
          <div className="text-end">
            <h6 className="text-15 font-bold">{requiresApprovalProducts}</h6>
            <span className="text-13 text-primary font-medium">
              review workflow
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-ld">
          <div>
            <span className="font-medium text-ld opacity-80">
              Upload Required Products
            </span>
            <p className="text-13">{requiresUploadProducts} products</p>
          </div>
          <div className="text-end">
            <h6 className="text-15 font-bold">{requiresUploadProducts}</h6>
            <span className="text-13 text-warning font-medium">
              file-based orders
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            <span className="font-medium text-ld opacity-80">Sales Mix</span>
            <p className="text-13">{totalOrderItems.toLocaleString()} items</p>
          </div>
          <div className="text-end">
            <h6 className="text-15 font-bold">
              P {formatPercent(productMixPercent)} / K {formatPercent(packageMixPercent)}
            </h6>
            <span className="text-13 text-success font-medium">
              {productOrderItems} products • {packageOrderItems} packages
            </span>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default AnnualProfit;