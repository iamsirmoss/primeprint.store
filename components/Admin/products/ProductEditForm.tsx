"use client";

import { useState, useTransition } from "react";
import { updateProductDetailsAction } from "@/app/(admin)/admin/products/actions";

import CardBox from "@/components/Admin/shared/CardBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductEditFormProps {
  product: {
    id: string;
    title: string;
    slug: string;
    sku: string | null;
    type: string;
    status: string;
    currency: string;
    salesChannel: string;
    basePriceCents: number | null;
    compareAtPriceCents: number | null;
    stockQty: number | null;
    lowStockThreshold: number | null;
    shortDescription: string | null;
    description: string | null;
    instructions: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    isFeatured: boolean;
    isActive: boolean;
    trackInventory: boolean;
    requiresUpload: boolean;
    requiresApproval: boolean;
    requiresAppointment: boolean;
    serviceId: string | null;
    categoryId: string | null;
  };
  services: {
    id: string;
    title: string;
    slug: string;
  }[];
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

function centsToValue(cents: number | null | undefined) {
  if (cents === null || cents === undefined) return "";
  return (cents / 100).toFixed(2);
}

export default function ProductEditForm({
  product,
  services,
  categories,
}: ProductEditFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <CardBox className="p-5">
      <form
        action={(formData) => {
          startTransition(async () => {
            try {
              setError(null);
              await updateProductDetailsAction(formData);
            } catch (err) {
              setError(
                err instanceof Error ? err.message : "Unable to update product."
              );
            }
          });
        }}
        className="space-y-6"
      >
        <input type="hidden" name="productId" value={product.id} />

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={product.title} required />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={product.slug} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" name="sku" defaultValue={product.sku || ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              name="currency"
              defaultValue={product.currency}
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select name="type" defaultValue={product.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PHYSICAL">Physical</SelectItem>
                <SelectItem value="DIGITAL">Digital</SelectItem>
                <SelectItem value="SERVICE">Service</SelectItem>
                <SelectItem value="PRINT_PRODUCT">Print Product</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select name="status" defaultValue={product.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Service</Label>
            <Select
              name="serviceId"
              defaultValue={product.serviceId ?? "none"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No service</SelectItem>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              name="categoryId"
              defaultValue={product.categoryId ?? "none"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No category</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="basePrice">Base Price</Label>
            <Input
              id="basePrice"
              name="basePrice"
              type="number"
              step="0.01"
              defaultValue={centsToValue(product.basePriceCents)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compareAtPrice">Compare At Price</Label>
            <Input
              id="compareAtPrice"
              name="compareAtPrice"
              type="number"
              step="0.01"
              defaultValue={centsToValue(product.compareAtPriceCents)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stockQty">Stock Qty</Label>
            <Input
              id="stockQty"
              name="stockQty"
              type="number"
              defaultValue={product.stockQty ?? ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
            <Input
              id="lowStockThreshold"
              name="lowStockThreshold"
              type="number"
              defaultValue={product.lowStockThreshold ?? ""}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Sales Channel</Label>
            <Select name="salesChannel" defaultValue={product.salesChannel}>
              <SelectTrigger>
                <SelectValue placeholder="Select sales channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ONLINE">Online</SelectItem>
                <SelectItem value="IN_STORE">In Store</SelectItem>
                <SelectItem value="BOTH">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={product.shortDescription || ""}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product.description || ""}
              className="min-h-[140px]"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              name="instructions"
              defaultValue={product.instructions || ""}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              name="seoTitle"
              defaultValue={product.seoTitle || ""}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              name="seoDescription"
              defaultValue={product.seoDescription || ""}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id="trackInventory"
              name="trackInventory"
              defaultChecked={product.trackInventory}
            />
            <Label htmlFor="trackInventory">Track Inventory</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="requiresUpload"
              name="requiresUpload"
              defaultChecked={product.requiresUpload}
            />
            <Label htmlFor="requiresUpload">Requires Upload</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="requiresApproval"
              name="requiresApproval"
              defaultChecked={product.requiresApproval}
            />
            <Label htmlFor="requiresApproval">Requires Approval</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="requiresAppointment"
              name="requiresAppointment"
              defaultChecked={product.requiresAppointment}
            />
            <Label htmlFor="requiresAppointment">Requires Appointment</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="isFeatured"
              name="isFeatured"
              defaultChecked={product.isFeatured}
            />
            <Label htmlFor="isFeatured">Featured</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="isActive"
              name="isActive"
              defaultChecked={product.isActive}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
        </div>
      </form>
    </CardBox>
  );
}