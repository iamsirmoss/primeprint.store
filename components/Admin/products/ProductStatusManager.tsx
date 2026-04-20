"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductStatusManagerProps {
  productId: string;
  status: string;
  onStatusChange: (
    productId: string,
    status: string
  ) => Promise<void | { success: boolean }>;
}

const statusVariantMap: Record<
  string,
  "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
> = {
  DRAFT: "outline",
  PUBLISHED: "secondary",
  ARCHIVED: "destructive",
};

const ProductStatusManager = ({
  productId,
  status,
  onStatusChange,
}: ProductStatusManagerProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <Badge variant={statusVariantMap[currentStatus] ?? "outline"}>
        {currentStatus}
      </Badge>

      <Select
        value={currentStatus}
        onValueChange={(value) => {
          startTransition(async () => {
            try {
              setError(null);
              setCurrentStatus(value);
              await onStatusChange(productId, value);
            } catch {
              setError("Unable to update product status.");
              setCurrentStatus(status);
            }
          });
        }}
        disabled={isPending}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Change status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="DRAFT">Draft</SelectItem>
          <SelectItem value="PUBLISHED">Published</SelectItem>
          <SelectItem value="ARCHIVED">Archived</SelectItem>
        </SelectContent>
      </Select>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
    </div>
  );
};

export default ProductStatusManager;