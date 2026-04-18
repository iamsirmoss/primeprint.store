// components/Admin/orders/OrdersStats.tsx
"use client";

import MetricCard from "@/components/Admin/dashboards/Dashboard2/MetricCard";

interface OrdersStatsProps {
  statusCounts: {
    ALL: number;
    PENDING: number;
    PAID: number;
    PROCESSING: number;
    COMPLETED: number;
    CANCELED: number;
    REFUNDED: number;
  };
}

const OrdersStats = ({ statusCounts }: OrdersStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <MetricCard title="All Orders" value={statusCounts.ALL} />
      <MetricCard title="Pending" value={statusCounts.PENDING} />
      <MetricCard title="Paid" value={statusCounts.PAID} />
      <MetricCard title="Processing" value={statusCounts.PROCESSING} />
      <MetricCard title="Completed" value={statusCounts.COMPLETED} />
      <MetricCard title="Canceled" value={statusCounts.CANCELED} />
      <MetricCard title="Refunded" value={statusCounts.REFUNDED} />
    </div>
  );
};

export default OrdersStats;