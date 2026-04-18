// components/Admin/orders/OrdersFilters.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { useTransition } from "react";

const statusOptions: Array<OrderStatus | "ALL"> = [
  "ALL",
  "PENDING",
  "PAID",
  "PROCESSING",
  "COMPLETED",
  "CANCELED",
  "REFUNDED",
];

const OrdersFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = (searchParams.get("status") as OrderStatus | "ALL") ?? "ALL";

  const updateParams = (next: { search?: string; status?: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (typeof next.search === "string") {
      if (next.search.trim()) {
        params.set("search", next.search.trim());
      } else {
        params.delete("search");
      }
    }

    if (typeof next.status === "string") {
      if (next.status && next.status !== "ALL") {
        params.set("status", next.status);
      } else {
        params.delete("status");
      }
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input
        defaultValue={currentSearch}
        placeholder="Search order number, customer, email..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateParams({
              search: (e.target as HTMLInputElement).value,
            });
          }
        }}
      />

      <Select
        defaultValue={currentStatus}
        onValueChange={(value) =>
          updateParams({
            status: value,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center text-sm text-muted-foreground">
        {isPending ? "Updating filters..." : "Press Enter to search"}
      </div>
    </div>
  );
};

export default OrdersFilters;