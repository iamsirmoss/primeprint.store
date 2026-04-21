"use client";

import { useMemo, useState, useTransition, ChangeEvent } from "react";
import { createProductAction } from "@/app/(admin)/admin/products/new/actions";

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
import { Icon } from "@iconify/react";

interface ProductCreateFormProps {
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

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

export default function ProductCreateForm({
  services,
  categories,
}: ProductCreateFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [imageUrlInputs, setImageUrlInputs] = useState<string[]>([""]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [variants, setVariants] = useState<VariantDraft[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const variantsJson = useMemo(() => JSON.stringify(variants), [variants]);

  const filePreviewUrls = useMemo(() => {
    return selectedFiles.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
    }));
  }, [selectedFiles]);

  const imageUrlPreviewList = useMemo(() => {
    return imageUrlInputs
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url, index) => ({
        id: `url-${index}`,
        url,
      }));
  }, [imageUrlInputs]);

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          try {
            setError(null);
            await createProductAction(formData);
          } catch (err) {
            setError(
              err instanceof Error ? err.message : "Unable to create product."
            );
          }
        });
      }}
      className="space-y-7"
    >
      <input type="hidden" name="variantsJson" value={variantsJson} />

      <div className="grid grid-cols-12 gap-7">
        <div className="xl:col-span-8 col-span-12 space-y-7">
          <CardBox className="p-5">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    const nextTitle = e.target.value;
                    setTitle(nextTitle);
                    if (!slugTouched) {
                      setSlug(slugify(nextTitle));
                    }
                  }}
                  placeholder="Business Cards Premium"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(slugify(e.target.value));
                  }}
                  placeholder="business-cards-premium"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" name="sku" placeholder="BC-PRM-001" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  name="currency"
                  defaultValue="USD"
                  placeholder="USD"
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select name="type" defaultValue="PHYSICAL">
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
                <Select name="status" defaultValue="DRAFT">
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
                <Select name="serviceId" defaultValue="none">
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
                <Select name="categoryId" defaultValue="none">
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
            </div>
          </CardBox>

          <CardBox className="p-5">
            <h2 className="text-lg font-semibold mb-4">Images</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="imageFiles">Upload image(s)</Label>
                <Input
                  id="imageFiles"
                  name="imageFiles"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                />
                <p className="text-xs text-muted-foreground">
                  You can upload one or multiple images.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <Label>Image URL(s)</Label>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setImageUrlInputs((prev) => [...prev, ""])
                    }
                  >
                    <Icon
                      icon="solar:add-circle-linear"
                      width={18}
                      className="mr-2"
                    />
                    Add URL
                  </Button>
                </div>

                <div className="space-y-3">
                  {imageUrlInputs.map((value, index) => (
                    <div key={`image-url-${index}`} className="flex gap-2">
                      <Input
                        name="imageUrls"
                        value={value}
                        onChange={(e) =>
                          setImageUrlInputs((prev) =>
                            prev.map((item, i) =>
                              i === index ? e.target.value : item
                            )
                          )
                        }
                        placeholder="https://example.com/image.jpg"
                      />

                      {imageUrlInputs.length > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            setImageUrlInputs((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  Use this for external https image links.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainImageAlt">Main Image Alt</Label>
                <Input
                  id="mainImageAlt"
                  name="mainImageAlt"
                  placeholder="Main product image alt text"
                />
              </div>

              {(filePreviewUrls.length > 0 || imageUrlPreviewList.length > 0) && (
                <div className="space-y-4">
                  <p className="text-sm font-medium">Preview</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filePreviewUrls.map((file, index) => (
                      <div
                        key={`file-preview-${index}`}
                        className="rounded-xl border p-3"
                      >
                        <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="text-xs line-clamp-2">{file.name}</p>
                      </div>
                    ))}

                    {imageUrlPreviewList.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border p-3"
                      >
                        <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.url}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="text-xs break-all line-clamp-2">
                          {item.url}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardBox>

          <CardBox className="p-5">
            <h2 className="text-lg font-semibold mb-4">Pricing & Inventory</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price</Label>
                <Input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  step="0.01"
                  placeholder="25.00"
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
                  placeholder="35.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockQty">Stock Qty</Label>
                <Input
                  id="stockQty"
                  name="stockQty"
                  type="number"
                  placeholder="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                <Input
                  id="lowStockThreshold"
                  name="lowStockThreshold"
                  type="number"
                  placeholder="5"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Sales Channel</Label>
                <Select name="salesChannel" defaultValue="BOTH">
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
          </CardBox>

          <CardBox className="p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold">Variants</h2>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setVariants((prev) => [...prev, createEmptyVariant(prev.length)])
                }
              >
                <Icon
                  icon="solar:add-circle-linear"
                  width={18}
                  className="mr-2"
                />
                Add Variant
              </Button>
            </div>

            <div className="space-y-4">
              {variants.length === 0 ? (
                <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  No variants added yet. You can create the product without
                  variants, or add one or more now.
                </div>
              ) : (
                variants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="rounded-xl border p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-medium">Variant {index + 1}</h3>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                          setVariants((prev) =>
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
                            setVariants((prev) =>
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
                            setVariants((prev) =>
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
                            setVariants((prev) =>
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
                            setVariants((prev) =>
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
                            setVariants((prev) =>
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
                            setVariants((prev) =>
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
                            setVariants((prev) =>
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
          </CardBox>

          <CardBox className="p-5">
            <h2 className="text-lg font-semibold mb-4">Descriptions</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Short summary of the product"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Full product description"
                  className="min-h-[140px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  placeholder="Customer or production instructions"
                />
              </div>
            </div>
          </CardBox>

          <CardBox className="p-5">
            <h2 className="text-lg font-semibold mb-4">SEO</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input id="seoTitle" name="seoTitle" placeholder="SEO title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  name="seoDescription"
                  placeholder="SEO description"
                />
              </div>
            </div>
          </CardBox>
        </div>

        <div className="xl:col-span-4 col-span-12 space-y-7">
          <CardBox className="p-5">
            <h2 className="text-lg font-semibold mb-4">Flags</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox id="trackInventory" name="trackInventory" />
                <Label htmlFor="trackInventory">Track Inventory</Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="requiresUpload" name="requiresUpload" />
                <Label htmlFor="requiresUpload">Requires Upload</Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="requiresApproval" name="requiresApproval" />
                <Label htmlFor="requiresApproval">Requires Approval</Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="requiresAppointment" name="requiresAppointment" />
                <Label htmlFor="requiresAppointment">
                  Requires Appointment
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="isFeatured" name="isFeatured" />
                <Label htmlFor="isFeatured">Featured</Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="isActive" name="isActive" defaultChecked />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
          </CardBox>

          <CardBox className="p-5">
            <h2 className="text-lg font-semibold mb-4">Publish</h2>

            {error ? (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                {error}
              </div>
            ) : null}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create Product"}
            </Button>
          </CardBox>
        </div>
      </div>
    </form>
  );
}