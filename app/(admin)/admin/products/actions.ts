"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { ProductStatus } from "@/lib/generated/prisma/enums";

const allowedStatuses = new Set<ProductStatus>([
  ProductStatus.DRAFT,
  ProductStatus.PUBLISHED,
  ProductStatus.ARCHIVED,
]);

export async function updateProductStatusAction(
  productId: string,
  status: string
) {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session || !isAdminRole(session.user.role)) {
    throw new Error("Unauthorized");
  }

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