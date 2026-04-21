"use client";

import { useMemo, useState, useTransition } from "react";
import { Icon } from "@iconify/react";

import CardBox from "@/components/Admin/shared/CardBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { replaceProductVariantsAction } from "@/app/(admin)/admin/products/actions";

type VariantDraft = {
  id: string;
  name: string;
  sku: string;
  price: string;
  stockQty: string;
  options: string;
  isDefault: boolean;
  isActive: boolean;
};

interface ProductVariantsManagerProps {
  productId: string;
  variants: {
    id: string;
    name: string;
    sku: string | null;
    priceCents: number | null;
    stockQty: number | null;
    isDefault: boolean;
    isActive: boolean;
    options: unknown;
  }[];
}

function createEmptyVariant(index: number): VariantDraft {
  return {
    id: `variant-${index}-${Date.now()}`,
    name: "",
    sku: "",
    price: "",
    stockQty: "",
    options: "",
    isDefault: index === 0,
    isActive: true,
  };
}

function centsToString(cents: number | null | undefined) {
  if (cents === null || cents === undefined) return "";
  return (cents / 100).toFixed(2);
}

function optionsToString(options: unknown) {
  if (!options || typeof options !== "object") return "";
  const label = (options as { label?: unknown }).label;
  return typeof label === "string" ? label : "";
}

export default function ProductVariantsManager({
  productId,
  variants,
}: ProductVariantsManagerProps) {
  const [drafts, setDrafts] = useState<VariantDraft[]>(
    variants.length > 0
      ? variants.map((variant) => ({
          id: variant.id,
          name: variant.name,
          sku: variant.sku || "",
          price: centsToString(variant.priceCents),
          stockQty:
            variant.stockQty === null || variant.stockQty === undefined
              ? ""
              : String(variant.stockQty),
          options: optionsToString(variant.options),
          isDefault: variant.isDefault,
          isActive: variant.isActive,
        }))
      : []
  );

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const variantsJson = useMemo(() => JSON.stringify(drafts), [drafts]);

  return (
    <CardBox className="p-5">
      <form
        action={(formData) => {
          startTransition(async () => {
            try {
              setError(null);
              await replaceProductVariantsAction(formData);
            } catch (err) {
              setError(
                err instanceof Error ? err.message : "Unable to update variants."
              );
            }
          });
        }}
        className="space-y-5"
      >
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="variantsJson" value={variantsJson} />

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Variants</h2>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setDrafts((prev) => [...prev, createEmptyVariant(prev.length)])
              }
            >
              <Icon icon="solar:add-circle-linear" width={18} className="mr-2" />
              Add Variant
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Variants"}
            </Button>
          </div>
        </div>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <div className="space-y-4">
          {drafts.length === 0 ? (
            <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
              No variants yet.
            </div>
          ) : (
            drafts.map((variant, index) => (
              <div key={variant.id} className="rounded-xl border p-4 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-medium">Variant {index + 1}</h3>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      setDrafts((prev) =>
                        prev.filter((item) => item.id !== variant.id)
                      )
                    }
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={variant.name}
                      onChange={(e) =>
                        setDrafts((prev) =>
                          prev.map((item) =>
                            item.id === variant.id
                              ? { ...item, name: e.target.value }
                              : item
                          )
                        )
                      }
                      placeholder="Standard / Matte / 3.5x2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input
                      value={variant.sku}
                      onChange={(e) =>
                        setDrafts((prev) =>
                          prev.map((item) =>
                            item.id === variant.id
                              ? { ...item, sku: e.target.value }
                              : item
                          )
                        )
                      }
                      placeholder="BC-VAR-001"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={variant.price}
                      onChange={(e) =>
                        setDrafts((prev) =>
                          prev.map((item) =>
                            item.id === variant.id
                              ? { ...item, price: e.target.value }
                              : item
                          )
                        )
                      }
                      placeholder="29.99"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Stock Qty</Label>
                    <Input
                      type="number"
                      value={variant.stockQty}
                      onChange={(e) =>
                        setDrafts((prev) =>
                          prev.map((item) =>
                            item.id === variant.id
                              ? { ...item, stockQty: e.target.value }
                              : item
                          )
                        )
                      }
                      placeholder="50"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Options</Label>
                    <Input
                      value={variant.options}
                      onChange={(e) =>
                        setDrafts((prev) =>
                          prev.map((item) =>
                            item.id === variant.id
                              ? { ...item, options: e.target.value }
                              : item
                          )
                        )
                      }
                      placeholder="e.g. 16pt matte, 3.5x2, 100 qty"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={variant.isDefault}
                      onCheckedChange={(checked) =>
                        setDrafts((prev) =>
                          prev.map((item) => ({
                            ...item,
                            isDefault:
                              item.id === variant.id ? checked === true : false,
                          }))
                        )
                      }
                    />
                    <Label>Default Variant</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={variant.isActive}
                      onCheckedChange={(checked) =>
                        setDrafts((prev) =>
                          prev.map((item) =>
                            item.id === variant.id
                              ? { ...item, isActive: checked === true }
                              : item
                          )
                        )
                      }
                    />
                    <Label>Active</Label>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </form>
    </CardBox>
  );
}