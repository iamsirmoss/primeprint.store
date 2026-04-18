// components/Admin/orders/OrderAddressCard.tsx
"use client";

import CardBox from "@/components/Admin/shared/CardBox";

interface AddressData {
  fullName?: string | null;
  company?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phoneNumber?: string | null;
}

interface OrderAddressCardProps {
  title: string;
  address?: AddressData | null;
}

const OrderAddressCard = ({ title, address }: OrderAddressCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {!address ? (
        <p className="text-sm text-muted-foreground">No address available.</p>
      ) : (
        <div className="space-y-2 text-sm">
          {address.fullName ? <p className="font-medium">{address.fullName}</p> : null}
          {address.company ? <p>{address.company}</p> : null}
          {address.line1 ? <p>{address.line1}</p> : null}
          {address.line2 ? <p>{address.line2}</p> : null}

          {(address.city || address.state || address.postalCode) ? (
            <p>
              {[address.city, address.state, address.postalCode]
                .filter(Boolean)
                .join(", ")}
            </p>
          ) : null}

          {address.country ? <p>{address.country}</p> : null}
          {address.phoneNumber ? <p>{address.phoneNumber}</p> : null}
        </div>
      )}
    </CardBox>
  );
};

export default OrderAddressCard;