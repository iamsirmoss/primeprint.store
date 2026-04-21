"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import path from "path";
import { promises as fs } from "fs";

import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import {
  ProductStatus,
  ProductType,
  SalesChannel,
} from "@/lib/generated/prisma/enums";
import { redirect } from "next/navigation";

/* ---------------- helpers ---------------- */

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseMoneyToCents(value: string | null) {
  if (!value) return 0;
  const normalized = value.replace(/,/g, "").trim();
  if (!normalized) return 0;
  const amount = Number(normalized);
  if (Number.isNaN(amount)) return 0;
  return Math.round(amount * 100);
}

function parseOptionalMoneyToCents(value: string | null) {
  if (!value) return null;
  const normalized = value.replace(/,/g, "").trim();
  if (!normalized) return null;
  const amount = Number(normalized);
  if (Number.isNaN(amount)) return null;
  return Math.round(amount * 100);
}

function parseOptionalInt(value: string | null) {
  if (!value || !value.trim()) return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : Math.trunc(n);
}

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function normalizeImageUrl(url: string | null) {
  if (!url) return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/images/${trimmed}`;
}

async function saveUploadedFile(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const relativePath = `/uploads/products/${safeName}`;
  const absolutePath = path.join(process.cwd(), "public", relativePath);

  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, buffer);

  return relativePath;
}

async function requireAdmin() {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session || !isAdminRole(session.user.role)) {
    throw new Error("Unauthorized");
  }

  return session;
}

const allowedStatuses = new Set<ProductStatus>([
  ProductStatus.DRAFT,
  ProductStatus.PUBLISHED,
  ProductStatus.ARCHIVED,
]);

const allowedTypes = new Set<ProductType>([
  ProductType.PHYSICAL,
  ProductType.DIGITAL,
  ProductType.SERVICE,
  ProductType.PRINT_PRODUCT,
]);

const allowedChannels = new Set<SalesChannel>([
  SalesChannel.ONLINE,
  SalesChannel.IN_STORE,
  SalesChannel.BOTH,
]);

/* ---------------- status ---------------- */

export async function updateProductStatusAction(
  productId: string,
  status: string
) {
  await requireAdmin();

  if (!allowedStatuses.has(status as ProductStatus)) {
    throw new Error("Invalid product status");
  }

  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      status: status as ProductStatus,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
}

/* ---------------- images ---------------- */

export async function updateProductImagesAction(formData: FormData) {
  await requireAdmin();

  const productId = String(formData.get("productId") || "").trim();
  const mainImageAlt =
    String(formData.get("mainImageAlt") || "").trim() || null;

  if (!productId) {
    throw new Error("Missing product ID.");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  const imageUrls = formData
    .getAll("imageUrls")
    .map((value) => String(value).trim())
    .filter(Boolean)
    .map((url) => normalizeImageUrl(url))
    .filter(Boolean) as string[];

  const uploadedFiles = formData
    .getAll("imageFiles")
    .filter((file): file is File => file instanceof File && file.size > 0);

  const uploadedImagePaths: string[] = [];

  for (const file of uploadedFiles) {
    const savedPath = await saveUploadedFile(file);
    uploadedImagePaths.push(savedPath);
  }

  const allImageUrls = [...uploadedImagePaths, ...imageUrls];

  await prisma.productImage.deleteMany({
    where: { productId },
  });

  if (allImageUrls.length > 0) {
    await prisma.productImage.createMany({
      data: allImageUrls.map((url, index) => ({
        productId,
        url,
        alt: index === 0 ? mainImageAlt : null,
        position: index,
      })),
    });
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
}

/* ---------------- variants ---------------- */

type VariantPayload = {
  id?: string;
  name: string;
  sku?: string | null;
  price?: string | null;
  stockQty?: string | null;
  options?: string | null;
  isDefault?: boolean;
  isActive?: boolean;
};

export async function replaceProductVariantsAction(formData: FormData) {
  await requireAdmin();

  const productId = String(formData.get("productId") || "").trim();
  const variantsJson = String(formData.get("variantsJson") || "[]");

  if (!productId) {
    throw new Error("Missing product ID.");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  let parsedVariants: VariantPayload[] = [];
  try {
    parsedVariants = JSON.parse(variantsJson);
    if (!Array.isArray(parsedVariants)) {
      parsedVariants = [];
    }
  } catch {
    parsedVariants = [];
  }

  const cleanedVariants: Array<{
    name: string;
    sku: string | null;
    priceCents: number | null;
    stockQty: number | null;
    options?: { label: string };
    isDefault: boolean;
    isActive: boolean;
  }> = parsedVariants
    .map((variant, index) => ({
      name: String(variant.name || "").trim(),
      sku: String(variant.sku || "").trim() || null,
      priceCents: parseOptionalMoneyToCents(
        variant.price ? String(variant.price) : null
      ),
      stockQty: parseOptionalInt(
        variant.stockQty ? String(variant.stockQty) : null
      ),
      options: (() => {
        const raw = String(variant.options || "").trim();
        return raw ? { label: raw } : undefined;
      })(),
      isDefault: Boolean(variant.isDefault) || index === 0,
      isActive: variant.isActive !== false,
    }))
    .filter((variant) => variant.name);

  const duplicateVariantSku = cleanedVariants
    .filter((variant) => variant.sku)
    .map((variant) => variant.sku as string);

  if (duplicateVariantSku.length > 0) {
    const existingVariantSku = await prisma.productVariant.findFirst({
      where: {
        productId: { not: productId },
        sku: { in: duplicateVariantSku },
      },
      select: { sku: true },
    });

    if (existingVariantSku) {
      throw new Error(`Variant SKU already exists: ${existingVariantSku.sku}`);
    }
  }

  const firstDefaultIndex = cleanedVariants.findIndex((variant) => variant.isDefault);

  await prisma.productVariant.deleteMany({
    where: { productId },
  });

  if (cleanedVariants.length > 0) {
    await prisma.productVariant.createMany({
      data: cleanedVariants.map((variant, index) => ({
        productId,
        name: variant.name,
        sku: variant.sku,
        priceCents: variant.priceCents,
        stockQty: variant.stockQty,
        options: variant.options,
        isDefault:
          firstDefaultIndex === -1 ? index === 0 : index === firstDefaultIndex,
        isActive: variant.isActive,
      })),
    });
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
}

/* ---------------- product details edit ---------------- */

export async function updateProductDetailsAction(formData: FormData) {
  await requireAdmin();

  const productId = String(formData.get("productId") || "").trim();

  if (!productId) {
    throw new Error("Missing product ID.");
  }

  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      slug: true,
      sku: true,
    },
  });

  if (!existingProduct) {
    throw new Error("Product not found.");
  }

  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = slugify(rawSlug || title);
  const sku = String(formData.get("sku") || "").trim() || null;

  const type = String(formData.get("type") || ProductType.PHYSICAL);
  const status = String(formData.get("status") || ProductStatus.DRAFT);
  const currency = String(formData.get("currency") || "USD").trim() || "USD";
  const salesChannel = String(
    formData.get("salesChannel") || SalesChannel.BOTH
  );

  const rawServiceId = String(formData.get("serviceId") || "").trim();
  const rawCategoryId = String(formData.get("categoryId") || "").trim();

  const serviceId =
    rawServiceId && rawServiceId !== "none" ? rawServiceId : null;

  const categoryId =
    rawCategoryId && rawCategoryId !== "none" ? rawCategoryId : null;

  const shortDescription =
    String(formData.get("shortDescription") || "").trim() || null;
  const description =
    String(formData.get("description") || "").trim() || null;
  const instructions =
    String(formData.get("instructions") || "").trim() || null;
  const seoTitle = String(formData.get("seoTitle") || "").trim() || null;
  const seoDescription =
    String(formData.get("seoDescription") || "").trim() || null;

  if (!title) {
    throw new Error("Title is required.");
  }

  if (!slug) {
    throw new Error("Slug is required.");
  }

  if (!allowedTypes.has(type as ProductType)) {
    throw new Error("Invalid product type.");
  }

  if (!allowedStatuses.has(status as ProductStatus)) {
    throw new Error("Invalid product status.");
  }

  if (!allowedChannels.has(salesChannel as SalesChannel)) {
    throw new Error("Invalid sales channel.");
  }

  const duplicateSlug = await prisma.product.findFirst({
    where: {
      slug,
      id: {
        not: productId,
      },
    },
    select: {
      id: true,
    },
  });

  if (duplicateSlug) {
    throw new Error("This slug already exists.");
  }

  if (sku) {
    const duplicateSku = await prisma.product.findFirst({
      where: {
        sku,
        id: {
          not: productId,
        },
      },
      select: {
        id: true,
      },
    });

    if (duplicateSku) {
      throw new Error("This SKU already exists.");
    }
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      title,
      slug,
      sku,
      type: type as ProductType,
      status: status as ProductStatus,
      currency,
      salesChannel: salesChannel as SalesChannel,

      basePriceCents: parseMoneyToCents(String(formData.get("basePrice") || "")),
      compareAtPriceCents: parseOptionalMoneyToCents(
        String(formData.get("compareAtPrice") || "")
      ),

      stockQty: parseOptionalInt(String(formData.get("stockQty") || "")),
      lowStockThreshold: parseOptionalInt(
        String(formData.get("lowStockThreshold") || "")
      ),

      shortDescription,
      description,
      instructions,
      seoTitle,
      seoDescription,

      trackInventory: parseBoolean(formData.get("trackInventory")),
      requiresUpload: parseBoolean(formData.get("requiresUpload")),
      requiresApproval: parseBoolean(formData.get("requiresApproval")),
      requiresAppointment: parseBoolean(formData.get("requiresAppointment")),
      isFeatured: parseBoolean(formData.get("isFeatured")),
      isActive: parseBoolean(formData.get("isActive")),

      serviceId,
      categoryId,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();

  const productId = String(formData.get("productId") || "").trim();

  if (!productId) {
    throw new Error("Missing product ID.");
  }

  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });

  if (!existingProduct) {
    throw new Error("Product not found.");
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}