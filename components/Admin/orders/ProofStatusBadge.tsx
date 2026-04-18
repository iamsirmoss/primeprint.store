// components/Admin/orders/ProofStatusBadge.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { ProofStatus } from "@/lib/generated/prisma/enums";

interface ProofStatusBadgeProps {
  status: ProofStatus;
}

const badgeVariantMap: Record<
  ProofStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  NOT_SENT: "outline",
  SENT: "secondary",
  APPROVED: "default",
  REVISION_REQUESTED: "secondary",
  REJECTED: "destructive",
};

const ProofStatusBadge = ({ status }: ProofStatusBadgeProps) => {
  return <Badge variant={badgeVariantMap[status]}>{status}</Badge>;
};

export default ProofStatusBadge;