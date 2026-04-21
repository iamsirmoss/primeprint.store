"use client";

import { useState, useTransition } from "react";
import { deleteProductAction } from "@/app/(admin)/admin/products/actions";
import { Button } from "@/components/ui/button";

interface DeleteProductButtonProps {
  productId: string;
  productTitle: string;
}

export default function DeleteProductButton({
  productId,
  productTitle,
}: DeleteProductButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        const confirmed = window.confirm(
          `Are you sure you want to delete "${productTitle}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        startTransition(async () => {
          try {
            setError(null);
            await deleteProductAction(formData);
          } catch (err) {
            setError(
              err instanceof Error ? err.message : "Unable to delete product."
            );
          }
        });
      }}
      className="space-y-3"
    >
      <input type="hidden" name="productId" value={productId} />

      <Button
        type="submit"
        variant="destructive"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete Product"}
      </Button>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
    </form>
  );
}