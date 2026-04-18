// components/Admin/orders/OrderStatusBadge.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/generated/prisma/enums";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const badgeVariantMap: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "outline",
  PAID: "secondary",
  PROCESSING: "default",
  COMPLETED: "default",
  CANCELED: "destructive",
  REFUNDED: "destructive",
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return <Badge variant={badgeVariantMap[status]}>{status}</Badge>;
};

export default OrderStatusBadge;