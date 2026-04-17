"use client";

import React from "react";
import { Icon } from "@iconify/react";
import CardBox from "../../shared/CardBox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface RevenueByProductItem {
  name: string;
  group: "Products" | "Packages";
  unitsSold: number;
  revenueCents: number;
  orderLines: number;
  percentage: number;
}

interface RevenueByProductProps {
  items: RevenueByProductItem[];
  totalRevenueCents: number;
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

const RevenueByProduct = ({
  items,
  totalRevenueCents,
}: RevenueByProductProps) => {
  return (
    <CardBox className="pb-3 px-6">
      <div className="sm:flex justify-between align-baseline">
        <div>
          <h5 className="card-title">Revenue by Product</h5>
          <p className="card-subtitle">
            Top selling products and packages by revenue
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center gap-2 text-sm text-muted-foreground">
          <Icon icon="solar:dollar-minimalistic-linear" height={16} />
          <span>Total: {formatCurrency(totalRevenueCents)}</span>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader className="border-b border-bordergray dark:border-darkborder">
            <TableRow>
              <TableHead className="py-2 px-3 ps-0 text-ld font-normal">
                Item
              </TableHead>
              <TableHead className="text-ld font-normal">Type</TableHead>
              <TableHead className="text-ld font-normal">Units</TableHead>
              <TableHead className="text-ld font-normal">Share</TableHead>
              <TableHead className="text-ld font-normal">Revenue</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-bordergray dark:divide-darkborder">
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="ps-0 py-6 text-muted-foreground">
                  No revenue data available yet.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={`${item.group}-${item.name}-${index}`}>
                  <TableCell className="whitespace-nowrap ps-0">
                    <div className="flex gap-3 items-center">
                      <span className="h-12 w-12 rounded-tw bg-muted flex items-center justify-center">
                        <Icon
                          icon={
                            item.group === "Packages"
                              ? "solar:layers-linear"
                              : "solar:box-linear"
                          }
                          height={20}
                          className="text-primary"
                        />
                      </span>

                      <div className="truncate line-clamp-2 sm:text-wrap max-w-56">
                        <h6 className="text-sm">{item.name}</h6>
                        <p>{item.orderLines} order lines</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <Badge variant={item.group === "Packages" ? "secondary" : "default"}>
                      {item.group}
                    </Badge>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <p className="text-sm card-subtitle">{item.unitsSold}</p>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <p className="text-sm card-subtitle">
                      {item.percentage.toFixed(1)}%
                    </p>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <p className="text-ld">{formatCurrency(item.revenueCents)}</p>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </CardBox>
  );
};

export default RevenueByProduct;