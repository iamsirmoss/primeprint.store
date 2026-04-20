"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/lib/generated/prisma/enums";

const allowedStatuses = new Set<OrderStatus>([
  OrderStatus.PENDING,
  OrderStatus.PAID,
  OrderStatus.PROCESSING,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELED,
  OrderStatus.REFUNDED,
]);

export async function updateOrderStatusAction(
  orderId: string,
  status: string
) {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session || !isAdminRole(session.user.role)) {
    throw new Error("Unauthorized");
  }

  if (!allowedStatuses.has(status as OrderStatus)) {
    throw new Error("Invalid order status");
  }

  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true },
  });

  if (!existingOrder) {
    throw new Error("Order not found");
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: status as OrderStatus,
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}