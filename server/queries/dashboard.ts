// server/queries/dashboard.ts
import { prisma } from "@/lib/prisma";
import {
  OrderStatus,
  ProductStatus,
  ProofStatus,
  ReviewStatus,
  SellableType,
  UserRole,
} from "@/lib/generated/prisma/enums";

export function formatCurrency(
  cents: number | null | undefined,
  currency = "USD"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format((cents ?? 0) / 100);
}

function getMonthLabelsShort() {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
}

function getRecentMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(date);
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

async function getLowStockProductsCount() {
  try {
    const count = await prisma.product.count({
      where: {
        trackInventory: true,
        stockQty: { not: null },
        lowStockThreshold: { not: null },
        AND: [
          {
            stockQty: {
              lte: prisma.product.fields.lowStockThreshold,
            },
          },
        ],
      },
    });

    return count;
  } catch {
    const products = await prisma.product.findMany({
      where: {
        trackInventory: true,
        stockQty: { not: null },
        lowStockThreshold: { not: null },
      },
      select: {
        id: true,
        stockQty: true,
        lowStockThreshold: true,
      },
    });

    return products.filter(
      (product) =>
        product.stockQty !== null &&
        product.lowStockThreshold !== null &&
        product.stockQty <= product.lowStockThreshold
    ).length;
  }
}

async function getMonthlyRevenueSeries(year: number) {
  const months = Array.from({ length: 12 }, (_, i) => i);

  const results = await Promise.all(
    months.map(async (month) => {
      const start = new Date(year, month, 1, 0, 0, 0, 0);
      const end = new Date(year, month + 1, 1, 0, 0, 0, 0);

      const revenue = await prisma.order.aggregate({
        _sum: { totalCents: true },
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
          status: {
            in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.COMPLETED],
          },
        },
      });

      return revenue._sum.totalCents ?? 0;
    })
  );

  return results;
}

async function getRecentMonthlyRevenueSeries(monthsBack = 6) {
  const now = new Date();

  const months = Array.from({ length: monthsBack }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (monthsBack - 1 - index), 1);
    return date;
  });

  const series = await Promise.all(
    months.map(async (date) => {
      const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);

      const revenue = await prisma.order.aggregate({
        _sum: { totalCents: true },
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
          status: {
            in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.COMPLETED],
          },
        },
      });

      return revenue._sum.totalCents ?? 0;
    })
  );

  return {
    categories: months.map((date) => getRecentMonthLabel(date)),
    seriesCents: series,
  };
}

async function getWeeklyActivity() {
  const now = new Date();

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const results = await Promise.all(
    days.map(async (startDate) => {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);

      const [orders, contacts, revenue] = await Promise.all([
        prisma.order.count({
          where: {
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
        }),
        prisma.contact.count({
          where: {
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
          },
        }),
        prisma.order.aggregate({
          _sum: { totalCents: true },
          where: {
            createdAt: {
              gte: startDate,
              lt: endDate,
            },
            status: {
              in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.COMPLETED],
            },
          },
        }),
      ]);

      return {
        label: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(startDate),
        orders,
        contacts,
        revenueCents: revenue._sum.totalCents ?? 0,
      };
    })
  );

  return {
    categories: results.map((item) => item.label),
    ordersSeries: results.map((item) => item.orders),
    contactsSeries: results.map((item) => item.contacts),
    revenueSeriesCents: results.map((item) => item.revenueCents),
    totalOrders: results.reduce((sum, item) => sum + item.orders, 0),
    totalContacts: results.reduce((sum, item) => sum + item.contacts, 0),
    totalRevenueCents: results.reduce((sum, item) => sum + item.revenueCents, 0),
  };
}

async function getRevenueByProductData() {
  const items = await prisma.orderItem.findMany({
    where: {
      order: {
        status: {
          in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.COMPLETED],
        },
      },
    },
    select: {
      type: true,
      quantity: true,
      totalPriceCents: true,
      titleSnapshot: true,
      product: {
        select: {
          title: true,
          type: true,
        },
      },
      package: {
        select: {
          name: true,
          tier: true,
        },
      },
    },
  });

  const grouped = new Map<
    string,
    {
      name: string;
      group: "Products" | "Packages";
      unitsSold: number;
      revenueCents: number;
      orderLines: number;
    }
  >();

  for (const item of items) {
    const isPackage = item.type === SellableType.PACKAGE;
    const label =
      item.titleSnapshot ||
      item.product?.title ||
      item.package?.name ||
      (isPackage ? "Package" : "Product");

    const key = `${isPackage ? "package" : "product"}:${label}`;

    const current = grouped.get(key) ?? {
      name: label,
      group: isPackage ? "Packages" : "Products",
      unitsSold: 0,
      revenueCents: 0,
      orderLines: 0,
    };

    current.unitsSold += item.quantity ?? 0;
    current.revenueCents += item.totalPriceCents ?? 0;
    current.orderLines += 1;

    grouped.set(key, current);
  }

  const allItems = Array.from(grouped.values()).sort(
    (a, b) => b.revenueCents - a.revenueCents
  );

  const totalRevenueCents = allItems.reduce((sum, item) => sum + item.revenueCents, 0);

  const topProducts = allItems.slice(0, 8).map((item) => ({
    ...item,
    percentage:
      totalRevenueCents > 0 ? (item.revenueCents / totalRevenueCents) * 100 : 0,
  }));

  return {
    items: topProducts,
    totalRevenueCents,
  };
}

async function getSalesFromLocationData() {
  const orders = await prisma.order.findMany({
    where: {
      status: {
        in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.COMPLETED],
      },
    },
    select: {
      totalCents: true,
      shippingAddress: {
        select: {
          state: true,
          country: true,
          city: true,
        },
      },
      billingAddress: {
        select: {
          state: true,
          country: true,
          city: true,
        },
      },
    },
  });

  const grouped = new Map<
    string,
    {
      shortCode: string;
      city: string;
      revenueCents: number;
      orders: number;
    }
  >();

  for (const order of orders) {
    const address = order.shippingAddress || order.billingAddress;
    const rawLocation =
      address?.state || address?.city || address?.country || "Unknown";

    const normalized = rawLocation.trim() || "Unknown";
    const shortCode = normalized.slice(0, 2).toUpperCase();

    const current = grouped.get(normalized) ?? {
      shortCode,
      city: normalized,
      revenueCents: 0,
      orders: 0,
    };

    current.revenueCents += order.totalCents ?? 0;
    current.orders += 1;

    grouped.set(normalized, current);
  }

  const locations = Array.from(grouped.values())
    .sort((a, b) => b.revenueCents - a.revenueCents)
    .slice(0, 6);

  const totalRevenueCents = locations.reduce((sum, item) => sum + item.revenueCents, 0);

  return locations.map((item, index) => {
    const colors = [
      "primary",
      "secondary",
      "warning",
      "error",
      "success",
      "info",
    ] as const;

    return {
      name: item.shortCode,
      city: item.city,
      orders: item.orders,
      revenueCents: item.revenueCents,
      percentage:
        totalRevenueCents > 0 ? (item.revenueCents / totalRevenueCents) * 100 : 0,
      color: colors[index % colors.length],
    };
  });
}

async function getDailyActivitiesData() {
  const [recentOrders, recentContacts] = await Promise.all([
    prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    }),
    prisma.contact.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const orderActivities = recentOrders.map((order) => ({
    id: `order-${order.id}`,
    time: order.createdAt,
    title: formatTime(order.createdAt),
    subtitle: `Order ${order.orderNumber} from ${
      order.customerName || order.user?.name || "Guest"
    }`,
    meta:
      order.status === OrderStatus.PAID ||
      order.status === OrderStatus.PROCESSING ||
      order.status === OrderStatus.COMPLETED
        ? `${formatCurrency(order.totalCents, order.currency)} • ${order.status}`
        : order.status,
    color: "primary" as const,
  }));

  const contactActivities = recentContacts.map((contact) => ({
    id: `contact-${contact.id}`,
    time: contact.createdAt,
    title: formatTime(contact.createdAt),
    subtitle: `New contact from ${contact.name}`,
    meta: contact.subject || contact.email,
    color: "secondary" as const,
  }));

  const items = [...orderActivities, ...contactActivities]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 6)
    .map((item, index, array) => ({
      ...item,
      line: index !== array.length - 1,
    }));

  return items;
}

export async function getDashboardStats() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const previousYear = currentYear - 1;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const startOfLastMonth = new Date(startOfMonth);
  startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);

  const startOfYear = new Date(currentYear, 0, 1, 0, 0, 0, 0);

  const [
    totalOrders,
    pendingOrders,
    paidOrders,
    processingOrders,
    completedOrders,

    totalUsers,
    adminUsers,
    managerUsers,
    staffUsers,
    verifiedUsers,
    newCustomersThisMonth,
    verifiedNewCustomersThisMonth,

    totalProducts,
    publishedProducts,
    draftProducts,
    lowStockProducts,
    pendingReviews,
    pendingProofs,

    totalPackages,
    activePackages,
    soldPackages,
    packageOrders,

    totalContacts,
    recentOrders,
    recentContacts,
    revenueTotal,
    revenueThisMonth,
    revenueLastMonth,
    revenueThisYear,
    currentYearRevenueSeries,
    previousYearRevenueSeries,
    recentMonthlyRevenue,
    weeklyActivity,
    revenueByProduct,
    salesFromLocation,
    dailyActivities,

    totalOrderItems,
    productOrderItems,
    packageOrderItems,
    requiresApprovalProducts,
    requiresUploadProducts,
    completedOrdersThisYear,
  ] = await Promise.all([
    prisma.order.count(),

    prisma.order.count({
      where: { status: OrderStatus.PENDING },
    }),

    prisma.order.count({
      where: { status: OrderStatus.PAID },
    }),

    prisma.order.count({
      where: { status: OrderStatus.PROCESSING },
    }),

    prisma.order.count({
      where: { status: OrderStatus.COMPLETED },
    }),

    prisma.user.count(),

    prisma.user.count({
      where: { role: UserRole.ADMIN },
    }),

    prisma.user.count({
      where: { role: UserRole.MANAGER },
    }),

    prisma.user.count({
      where: { role: UserRole.STAFF },
    }),

    prisma.user.count({
      where: { emailVerified: true },
    }),

    prisma.user.count({
      where: {
        createdAt: { gte: startOfMonth },
      },
    }),

    prisma.user.count({
      where: {
        createdAt: { gte: startOfMonth },
        emailVerified: true,
      },
    }),

    prisma.product.count(),

    prisma.product.count({
      where: { status: ProductStatus.PUBLISHED },
    }),

    prisma.product.count({
      where: { status: ProductStatus.DRAFT },
    }),

    getLowStockProductsCount(),

    prisma.review.count({
      where: { status: ReviewStatus.PENDING },
    }),

    prisma.proofApproval.count({
      where: {
        status: {
          in: [ProofStatus.SENT, ProofStatus.REVISION_REQUESTED],
        },
      },
    }),

    prisma.package.count(),

    prisma.package.count({
      where: { isActive: true },
    }),

    prisma.orderItem.count({
      where: {
        type: SellableType.PACKAGE,
        packageId: { not: null },
      },
    }),

    prisma.order.count({
      where: {
        items: {
          some: {
            type: SellableType.PACKAGE,
            packageId: { not: null },
          },
        },
      },
    }),

    prisma.contact.count(),

    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
        user: true,
      },
    }),

    prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),

    prisma.order.aggregate({
      _sum: { totalCents: true },
      where: {
        status: {
          in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.COMPLETED],
        },
      },
    }),

    prisma.order.aggregate({
      _sum: { totalCents: true },
      where: {
        createdAt: { gte: startOfMonth },
        status: {
          in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.COMPLETED],
        },
      },
    }),

    prisma.order.aggregate({
      _sum: { totalCents: true },
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfMonth,
        },
        status: {
          in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.COMPLETED],
        },
      },
    }),

    prisma.order.aggregate({
      _sum: { totalCents: true },
      where: {
        createdAt: { gte: startOfYear },
        status: {
          in: [OrderStatus.PAID, OrderStatus.PROCESSING, OrderStatus.COMPLETED],
        },
      },
    }),

    getMonthlyRevenueSeries(currentYear),
    getMonthlyRevenueSeries(previousYear),
    getRecentMonthlyRevenueSeries(6),
    getWeeklyActivity(),
    getRevenueByProductData(),
    getSalesFromLocationData(),
    getDailyActivitiesData(),

    prisma.orderItem.count(),

    prisma.orderItem.count({
      where: {
        type: SellableType.PRODUCT,
        productId: { not: null },
      },
    }),

    prisma.orderItem.count({
      where: {
        type: SellableType.PACKAGE,
        packageId: { not: null },
      },
    }),

    prisma.product.count({
      where: {
        requiresApproval: true,
      },
    }),

    prisma.product.count({
      where: {
        requiresUpload: true,
      },
    }),

    prisma.order.count({
      where: {
        status: OrderStatus.COMPLETED,
        createdAt: { gte: startOfYear },
      },
    }),
  ]);

  const currentMonthIndex = now.getMonth();

  const currentYearRevenueYtd = currentYearRevenueSeries
    .slice(0, currentMonthIndex + 1)
    .reduce((sum, value) => sum + value, 0);

  const previousYearRevenueYtd = previousYearRevenueSeries
    .slice(0, currentMonthIndex + 1)
    .reduce((sum, value) => sum + value, 0);

  const yearOverYearGrowthPercent =
    previousYearRevenueYtd > 0
      ? ((currentYearRevenueYtd - previousYearRevenueYtd) / previousYearRevenueYtd) * 100
      : currentYearRevenueYtd > 0
      ? 100
      : 0;

  const fulfillmentRate =
    totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;

  const productMixPercent =
    totalOrderItems > 0 ? (productOrderItems / totalOrderItems) * 100 : 0;

  const packageMixPercent =
    totalOrderItems > 0 ? (packageOrderItems / totalOrderItems) * 100 : 0;

  const verifiedNewCustomersRate =
    newCustomersThisMonth > 0
      ? (verifiedNewCustomersThisMonth / newCustomersThisMonth) * 100
      : 0;

  const incomeGrowthPercent =
    (revenueLastMonth._sum.totalCents ?? 0) > 0
      ? (((revenueThisMonth._sum.totalCents ?? 0) - (revenueLastMonth._sum.totalCents ?? 0)) /
          (revenueLastMonth._sum.totalCents ?? 0)) *
        100
      : (revenueThisMonth._sum.totalCents ?? 0) > 0
      ? 100
      : 0;

  const cards = [
    { label: "Total Orders", value: totalOrders },
    { label: "Pending Orders", value: pendingOrders },
    { label: "Paid Orders", value: paidOrders },
    { label: "Processing Orders", value: processingOrders },
    { label: "Completed Orders", value: completedOrders },
    { label: "Total Users", value: totalUsers },
    { label: "Total Products", value: totalProducts },
    { label: "Published Products", value: publishedProducts },
    { label: "Draft Products", value: draftProducts },
    { label: "Low Stock Products", value: lowStockProducts },
    { label: "Pending Reviews", value: pendingReviews },
    { label: "Pending Proofs", value: pendingProofs },
    { label: "Packages", value: totalPackages },
    { label: "Contacts", value: totalContacts },
  ];

  return {
    cards,
    totals: {
      totalOrders,
      pendingOrders,
      paidOrders,
      processingOrders,
      completedOrders,

      totalUsers,
      adminUsers,
      managerUsers,
      staffUsers,
      verifiedUsers,
      newCustomersThisMonth,
      verifiedNewCustomersThisMonth,

      totalProducts,
      publishedProducts,
      draftProducts,
      lowStockProducts,
      pendingReviews,
      pendingProofs,

      totalPackages,
      activePackages,
      soldPackages,
      packageOrders,

      totalContacts,

      revenueTotalCents: revenueTotal._sum.totalCents ?? 0,
      revenueThisMonthCents: revenueThisMonth._sum.totalCents ?? 0,
      revenueLastMonthCents: revenueLastMonth._sum.totalCents ?? 0,
      revenueThisYearCents: revenueThisYear._sum.totalCents ?? 0,
    },
    revenueForecast: {
      currentYear,
      previousYear,
      categories: getMonthLabelsShort(),
      currentYearSeriesCents: currentYearRevenueSeries,
      previousYearSeriesCents: previousYearRevenueSeries,
      currentYearRevenueYtdCents: currentYearRevenueYtd,
      previousYearRevenueYtdCents: previousYearRevenueYtd,
      yearOverYearGrowthPercent,
    },
    annualProfit: {
      fulfillmentRate,
      completedOrdersThisYear,
      requiresApprovalProducts,
      requiresUploadProducts,
      productOrderItems,
      packageOrderItems,
      productMixPercent,
      packageMixPercent,
      totalOrderItems,
    },
    newCustomers: {
      newCustomersThisMonth,
      verifiedNewCustomersThisMonth,
      verifiedNewCustomersRate,
    },
    totalIncome: {
      totalIncomeCents: revenueTotal._sum.totalCents ?? 0,
      incomeThisMonthCents: revenueThisMonth._sum.totalCents ?? 0,
      incomeLastMonthCents: revenueLastMonth._sum.totalCents ?? 0,
      incomeGrowthPercent,
      categories: recentMonthlyRevenue.categories,
      seriesCents: recentMonthlyRevenue.seriesCents,
    },
    weeklyActivity: {
      categories: weeklyActivity.categories,
      ordersSeries: weeklyActivity.ordersSeries,
      contactsSeries: weeklyActivity.contactsSeries,
      revenueSeriesCents: weeklyActivity.revenueSeriesCents,
      totalOrders: weeklyActivity.totalOrders,
      totalContacts: weeklyActivity.totalContacts,
      totalRevenueCents: weeklyActivity.totalRevenueCents,
    },
    weeklyStats: {
      categories: weeklyActivity.categories,
      ordersSeries: weeklyActivity.ordersSeries,
      totalOrders: weeklyActivity.totalOrders,
      totalContacts: weeklyActivity.totalContacts,
      totalRevenueCents: weeklyActivity.totalRevenueCents,
    },
    dailyActivities,
    revenueByProduct,
    salesFromLocation,
    recentOrders,
    recentContacts,
  };
}