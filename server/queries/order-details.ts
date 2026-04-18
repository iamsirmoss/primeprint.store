// server/queries/order-details.ts
import { prisma } from "@/lib/prisma";

export async function getAdminOrderById(orderId: string) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      user: true,
      billingAddress: true,
      shippingAddress: true,
      items: {
        include: {
          product: true,
          productVariant: true,
          package: true,
          proofApprovals: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      couponUsages: {
        include: {
          coupon: true,
          user: true,
        },
      },
    },
  });

  return order;
}