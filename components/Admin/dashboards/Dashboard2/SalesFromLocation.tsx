"use client";

import CardBox from "../../shared/CardBox";
import { Progress } from "@/components/ui/progress";

type Variant =
  | "primary"
  | "secondary"
  | "warning"
  | "error"
  | "default"
  | "success"
  | "info";

const progressColorMap: Record<Variant, string> = {
  primary: "[&>div]:bg-primary",
  secondary: "[&>div]:bg-secondary",
  warning: "[&>div]:bg-yellow-500",
  error: "[&>div]:bg-red-500",
  default: "[&>div]:bg-gray-500",
  success: "[&>div]:bg-green-500",
  info: "[&>div]:bg-blue-500",
};

interface SalesLocationItem {
  name: string;
  city: string;
  orders: number;
  revenueCents: number;
  percentage: number;
  color: Variant;
}

interface SalesFromLocationProps {
  items: SalesLocationItem[];
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

const SalesFromLocation = ({ items }: SalesFromLocationProps) => {
  return (
    <CardBox className="px-6">
      <div>
        <h5 className="card-title">Sales from Locations</h5>
        <p className="card-subtitle">Based on order addresses</p>

        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.length === 0 ? (
              <div className="col-span-full text-sm text-muted-foreground">
                No location sales data available yet.
              </div>
            ) : (
              items.slice(0, 3).map((item) => (
                <div
                  key={item.city}
                  className="rounded-lg bg-background p-3 text-center shadow-sm"
                >
                  <p className="text-xs text-muted-foreground">{item.city}</p>
                  <h6 className="mt-1 text-lg font-semibold">
                    {item.percentage.toFixed(1)}%
                  </h6>
                  <p className="text-ss text-muted-foreground mt-1">
                    {item.orders} orders
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6">
          {items.map((item, index) => (
            <div
              className="mb-4 grid grid-cols-12 items-center gap-[15px]"
              key={`${item.city}-${index}`}
            >
              <div className="col-span-2">
                <h6 className="text-sm font-medium">{item.name}</h6>
              </div>

              <div className="col-span-7 lg:col-span-6">
                <Progress
                  value={item.percentage}
                  className={`h-2 bg-muted ${progressColorMap[item.color]}`}
                />
              </div>

              <div className="col-span-3 lg:col-span-2 text-end">
                <h6 className="text-sm opacity-80">
                  {item.percentage.toFixed(1)}%
                </h6>
              </div>

              <div className="hidden lg:block lg:col-span-2 text-end">
                <h6 className="text-xs text-muted-foreground">
                  {formatCurrency(item.revenueCents)}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardBox>
  );
};

export default SalesFromLocation;