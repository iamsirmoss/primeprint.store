// components/Admin/orders/FulfillmentBadge.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { FulfillmentStatus } from "@/lib/generated/prisma/enums";

interface FulfillmentBadgeProps {
  status: FulfillmentStatus;
}

const badgeVariantMap: Record<
  FulfillmentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  NOT_STARTED: "outline",
  IN_PROGRESS: "secondary",
  READY: "default",
  DELIVERED: "default",
  CANCELED: "destructive",
};

const FulfillmentBadge = ({ status }: FulfillmentBadgeProps) => {
  return <Badge variant={badgeVariantMap[status]}>{status}</Badge>;
};

export default FulfillmentBadge;