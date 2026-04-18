// app/(admin)/admin/orders/[id]/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { isAdminRole } from "@/lib/admin";
import { getAdminOrderById } from "@/server/queries/order-details";

import BreadcrumbComp from "@/components/Admin/layout/shared/breadcrumb/BreadcrumbComp/BreadcrumbComp";
import OrderDetailStatusCard from "@/components/Admin/orders/OrderDetailStatusCard";
import OrderCustomerCard from "@/components/Admin/orders/OrderCustomerCard";
import OrderAddressCard from "@/components/Admin/orders/OrderAddressCard";
import OrderItemsCard from "@/components/Admin/orders/OrderItemsCard";
import OrderNotesCard from "@/components/Admin/orders/OrderNotesCard";

interface OrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect("/login");

  if (!isAdminRole(session.user.role)) {
    redirect("/");
  }

  const { id } = await params;

  const order = await getAdminOrderById(id);

  if (!order) {
    notFound();
  }

  const BCrumb = [
    {
      to: "/admin",
      title: "Home",
    },
    {
      to: "",
      title: order.orderNumber,
    },
  ];

  return (
    <>
      <BreadcrumbComp title={`Order ${order.orderNumber}`} items={BCrumb} />

      <div className="space-y-7">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Order Details</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review customer information, ordered items, payment, proof status,
            and notes.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="xl:col-span-5 col-span-12">
            <OrderDetailStatusCard
              orderNumber={order.orderNumber}
              status={order.status}
              totalCents={order.totalCents}
              currency={order.currency}
              paymentProvider={order.paymentProvider}
              paymentRef={order.paymentRef}
              invoiceNumber={order.invoiceNumber}
              paidAt={order.paidAt}
              createdAt={order.createdAt}
            />
          </div>

          <div className="xl:col-span-7 col-span-12">
            <OrderCustomerCard
              customerName={order.customerName}
              customerEmail={order.customerEmail}
              customerPhone={order.customerPhone}
              user={order.user}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="lg:col-span-6 col-span-12">
            <OrderAddressCard
              title="Billing Address"
              address={order.billingAddress}
            />
          </div>

          <div className="lg:col-span-6 col-span-12">
            <OrderAddressCard
              title="Shipping Address"
              address={order.shippingAddress}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="xl:col-span-8 col-span-12">
            <OrderItemsCard items={order.items} />
          </div>

          <div className="xl:col-span-4 col-span-12">
            <OrderNotesCard
              notes={order.notes}
              invoicePdfUrl={order.invoicePdfUrl}
              invoiceSentAt={order.invoiceSentAt}
              couponUsages={order.couponUsages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;