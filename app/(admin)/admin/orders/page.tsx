// app/(admin)/admin/orders/page.tsx
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminRole } from "@/lib/admin";
import { getAdminOrders } from "@/server/queries/orders";

import BreadcrumbComp from "@/components/Admin/layout/shared/breadcrumb/BreadcrumbComp/BreadcrumbComp"; 
import OrderTableTemplate from "@/components/Admin/orders/OrderTableTemplate";

export const metadata: Metadata = {
  title: "Orders",
};

const BCrumb = [
  {
    to: "/admin",
    title: "Home",
  },
  {
    to: "",
    title: "Orders",
  },
];

interface OrdersPageProps {
  searchParams?: Promise<{
    search?: string;
    status?: string;
  }>;
}

function formatCurrency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect("/login");
  if (!isAdminRole(session.user.role)) redirect("/");

  const params = (await searchParams) ?? {};

  const { orders, statusCounts } = await getAdminOrders({
    search: params.search ?? "",
    status: (params.status as any) ?? "ALL",
  });

  const transformedOrders = orders.map((order) => ({
    id: order.id,
    orderId: order.orderNumber,
    customerName: order.customerName || order.user?.name || "Guest",
    customerEmail: order.customerEmail || order.user?.email || "",
    status: order.status,
    date: new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(order.createdAt),
    time: new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    }).format(order.createdAt),
    amount: Number((order.totalCents / 100).toFixed(2)),
    amountFormatted: formatCurrency(order.totalCents, order.currency),
    address:
      order.shippingAddress?.line1 ||
      order.billingAddress?.line1 ||
      "No address",
    href: `/admin/orders/${order.id}`,
    items: order.items.map((item) => ({
      id: item.id,
      name:
        item.titleSnapshot ||
        item.product?.title ||
        item.package?.name ||
        "Untitled Item",
      sku: item.skuSnapshot || item.productVariant?.sku || "N/A",
      quantity: item.quantity,
      price: Number((item.unitPriceCents / 100).toFixed(2)),
      totalFormatted: formatCurrency(item.totalPriceCents, item.currency),
      fulfillmentStatus: item.fulfillmentStatus,
      uploadedFiles: item.uploadedFiles,
    })),
  }));

  const statsCards = [
    {
      title: formatCurrency(
        orders
          .filter((o) =>
            ["PAID", "PROCESSING", "COMPLETED"].includes(o.status)
          )
          .reduce((sum, o) => sum + o.totalCents, 0)
      ),
      status: "Income",
      icon: "solar:dollar-minimalistic-bold-duotone",
      iconColor: "info",
      cardColor: "lightinfo",
    },
    {
      title: String(statusCounts.PENDING),
      status: "Pending",
      icon: "solar:stopwatch-bold-duotone",
      iconColor: "warning",
      cardColor: "lightwarning",
    },
    {
      title: String(statusCounts.COMPLETED),
      status: "Completed",
      icon: "solar:bag-check-bold-duotone",
      iconColor: "success",
      cardColor: "lightsuccess",
    },
    {
      title: String(statusCounts.PROCESSING),
      status: "Processing",
      icon: "solar:hourglass-line-bold-duotone",
      iconColor: "primary",
      cardColor: "lightprimary",
    },
    {
      title: String(statusCounts.PAID),
      status: "Paid",
      icon: "solar:card-bold-duotone",
      iconColor: "secondary",
      cardColor: "lightsecondary",
    },
    {
      title: String(statusCounts.CANCELED + statusCounts.REFUNDED),
      status: "Canceled / Refunded",
      icon: "solar:forbidden-bold-duotone",
      iconColor: "error",
      cardColor: "lighterror",
    },
  ];

  return (
    <>
      <BreadcrumbComp title="Orders" items={BCrumb} />
      <OrderTableTemplate
        data={transformedOrders}
        statsCards={statsCards}
      />
    </>
  );
};

export default OrdersPage;