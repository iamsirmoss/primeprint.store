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

const salesFromLocationData: {
  name: string;
  city: string;
  percentage: number;
  color: Variant;
}[] = [
  {
    name: "LA",
    city: "Los Angeles",
    percentage: 28,
    color: "primary",
  },
  {
    name: "NY",
    city: "New York",
    percentage: 21,
    color: "secondary",
  },
  {
    name: "AT",
    city: "Atlanta",
    percentage: 18,
    color: "warning",
  },
  {
    name: "CH",
    city: "Chicago",
    percentage: 12,
    color: "error",
  },
];

const SalesFromLocation = () => {
  return (
    <CardBox className="px-6">
      <div>
        <h5 className="card-title">Sales from Locations</h5>
        <p className="card-subtitle">United States</p>

        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {salesFromLocationData.map((item) => (
              <div
                key={item.name}
                className="rounded-lg bg-background p-3 text-center shadow-sm"
              >
                <p className="text-xs text-muted-foreground">{item.city}</p>
                <h6 className="mt-1 text-lg font-semibold">{item.percentage}%</h6>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {salesFromLocationData.map((item, index) => (
            <div
              className="mb-4 grid grid-cols-12 items-center gap-[15px]"
              key={index}
            >
              <div className="col-span-2">
                <h6 className="text-sm font-medium">{item.name}</h6>
              </div>

              <div className="col-span-7 lg:col-span-8">
                <Progress
                  value={item.percentage}
                  className={`h-2 bg-muted ${progressColorMap[item.color]}`}
                />
              </div>

              <div className="col-span-3 text-end lg:col-span-2">
                <h6 className="text-sm opacity-80">{item.percentage}%</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardBox>
  );
};

export default SalesFromLocation;