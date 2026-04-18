// components/Admin/orders/OrderCustomerCard.tsx
"use client";

import CardBox from "@/components/Admin/shared/CardBox";

interface OrderCustomerCardProps {
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  } | null;
}

const OrderCustomerCard = ({
  customerName,
  customerEmail,
  customerPhone,
  user,
}: OrderCustomerCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <h2 className="text-lg font-semibold mb-4">Customer</h2>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-muted-foreground">Name</p>
          <p className="font-medium mt-1">
            {customerName || user?.name || "Guest"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Email</p>
          <p className="font-medium mt-1 break-all">
            {customerEmail || user?.email || "No email"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Phone</p>
          <p className="font-medium mt-1">{customerPhone || "No phone"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Linked Account</p>
          <p className="font-medium mt-1">{user ? "Yes" : "Guest checkout"}</p>
        </div>

        {user?.role ? (
          <div>
            <p className="text-muted-foreground">User Role</p>
            <p className="font-medium mt-1">{user.role}</p>
          </div>
        ) : null}
      </div>
    </CardBox>
  );
};

export default OrderCustomerCard;