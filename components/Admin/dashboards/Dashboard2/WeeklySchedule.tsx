"use client";

import CardBox from "../../shared/CardBox";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface WeeklyScheduleProps {
  categories: string[];
  ordersSeries: number[];
  contactsSeries: number[];
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

const WeeklySchedule = ({
  categories,
  ordersSeries,
  contactsSeries,
  totalOrders,
  totalContacts,
  totalRevenueCents,
}: WeeklyScheduleProps) => {
  const chartData: any = {
    series: [
      {
        name: "Orders",
        data: ordersSeries,
      },
      {
        name: "Contacts",
        data: contactsSeries,
      },
    ],
    chart: {
      id: "weekly-activity",
      type: "bar",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "36%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: { fontSize: "13px", colors: "#adb0bb", fontWeight: "400" },
      },
    },
    yaxis: {
      labels: {
        style: { fontSize: "13px", colors: "#adb0bb", fontWeight: "400" },
      },
    },
    grid: {
      borderColor: "rgba(0,0,0,0.05)",
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <CardBox className="pb-4 px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h5 className="card-title">Weekly Activity</h5>
          <p className="card-subtitle">Orders and contacts over the last 7 days</p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Orders</span>
            <p className="font-semibold">{totalOrders}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Contacts</span>
            <p className="font-semibold">{totalContacts}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Revenue</span>
            <p className="font-semibold">{formatCurrency(totalRevenueCents)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-pill-bars">
        <Chart
          options={chartData}
          series={chartData.series}
          type="bar"
          height="303px"
          width="100%"
        />
      </div>
    </CardBox>
  );
};

export default WeeklySchedule;