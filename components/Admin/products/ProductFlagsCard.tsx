"use client";

import CardBox from "@/components/Admin/shared/CardBox";

interface ProductFlagsCardProps {
  isFeatured: boolean;
  isActive: boolean;
  trackInventory: boolean;
  requiresUpload: boolean;
  requiresApproval: boolean;
  requiresAppointment: boolean;
  salesChannel: string;
}

const ProductFlagsCard = ({
  isFeatured,
  isActive,
  trackInventory,
  requiresUpload,
  requiresApproval,
  requiresAppointment,
  salesChannel,
}: ProductFlagsCardProps) => {
  const flags = [
    { label: "Featured", value: isFeatured ? "Yes" : "No" },
    { label: "Active", value: isActive ? "Yes" : "No" },
    { label: "Track Inventory", value: trackInventory ? "Yes" : "No" },
    { label: "Requires Upload", value: requiresUpload ? "Yes" : "No" },
    { label: "Requires Approval", value: requiresApproval ? "Yes" : "No" },
    {
      label: "Requires Appointment",
      value: requiresAppointment ? "Yes" : "No",
    },
    { label: "Sales Channel", value: salesChannel },
  ];

  return (
    <CardBox className="p-5 h-full">
      <h2 className="text-lg font-semibold mb-4">Product Flags</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {flags.map((flag) => (
          <div
            key={flag.label}
            className="rounded-lg border px-3 py-2 flex items-center justify-between"
          >
            <span className="text-sm text-muted-foreground">{flag.label}</span>
            <span className="text-sm font-medium">{flag.value}</span>
          </div>
        ))}
      </div>
    </CardBox>
  );
};

export default ProductFlagsCard;