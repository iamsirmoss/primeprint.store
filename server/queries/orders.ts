// server/queries/orders.ts
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/lib/generated/prisma/enums";

export interface GetAdminOrdersParams {
  search?: string;
  status?: OrderStatus | "ALL";
}

export async function getAdminOrders(params: GetAdminOrdersParams = {}) {
  const { search = "", status = "ALL" } = params;

  const trimmedSearch = search.trim();

  const orders = await prisma.order.findMany({
    where: {
      ...(status !== "ALL" ? { status } : {}),
      ...(trimmedSearch
        ? {
            OR: [
              {
                orderNumber: {
                  contains: trimmedSearch,
                  mode: "insensitive",
                },
              },
              {
                customerName: {
                  contains: trimmedSearch,
                  mode: "insensitive",
                },
              },
              {
                customerEmail: {
                  contains: trimmedSearch,
                  mode: "insensitive",
                },
              },
              {
                invoiceNumber: {
                  contains: trimmedSearch,
                  mode: "insensitive",
                },
              },
              {
                user: {
                  is: {
                    name: {
                      contains: trimmedSearch,
                      mode: "insensitive",
                    },
                  },
                },
              },
              {
                user: {
                  is: {
                    email: {
                      contains: trimmedSearch,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          }
        : {}),
    },
    include: {
      user: true,
      items: {
        include: {
          product: true,
          productVariant: true,
          package: true,
        },
      },
      billingAddress: true,
      shippingAddress: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const stats = await prisma.order.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
  });

  const statusCounts = {
    ALL: orders.length,
    PENDING: 0,
    PAID: 0,
    PROCESSING: 0,
    COMPLETED: 0,
    CANCELED: 0,
    REFUNDED: 0,
  };

  for (const item of stats) {
    statusCounts[item.status] = item._count._all;
  }

  return {
    orders,
    statusCounts,
  };
}