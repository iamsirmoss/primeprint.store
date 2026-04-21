import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/admin";

import BreadcrumbComp from "@/components/Admin/layout/shared/breadcrumb/BreadcrumbComp/BreadcrumbComp";
import ProductsTableTemplate from "@/components/Admin/products/ProductsTableTemplate";

import { getAdminProducts } from "@/server/queries/products";
import { updateProductStatusAction, deleteProductAction } from "./actions";

const BCrumb = [
  { to: "/admin/dashboard", title: "Home" },
  { title: "Products" },
];

const ProductsPage = async () => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect("/login");

  if (!isAdminRole(session.user.role)) {
    redirect("/");
  }

  const products = await getAdminProducts();

  const transformedProducts = products.map((product) => {
    const defaultVariant =
      product.variants.find((v) => v.isDefault) || product.variants[0];

    const effectivePriceCents =
      defaultVariant?.priceCents ?? product.basePriceCents ?? 0;

    const rawImage = product.images[0]?.url;

    let mainImage = "/images/placeholder.png";

    if (rawImage) {
      if (rawImage.startsWith("http://") || rawImage.startsWith("https://")) {
        mainImage = rawImage;
      } else if (rawImage.startsWith("/")) {
        mainImage = rawImage;
      } else {
        mainImage = `/images/${rawImage}`;
      }
    }

    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      status: product.status,
      type: product.type,
      stockQty: product.stockQty,
      image: mainImage,
      priceFormatted: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: product.currency || "USD",
      }).format(effectivePriceCents / 100),
      createdAt: product.createdAt.toISOString(),
      href: `/admin/products/${product.id}`,
    };
  });

  const totalProducts = products.length;
  const published = products.filter((p) => p.status === "PUBLISHED").length;
  const draft = products.filter((p) => p.status === "DRAFT").length;
  const archived = products.filter((p) => p.status === "ARCHIVED").length;
  const lowStock = products.filter(
    (p) => p.stockQty !== null && p.stockQty <= 5
  ).length;

  const statsCards = [
    {
      title: String(totalProducts),
      status: "Total Products",
      icon: "solar:box-linear",
      iconColor: "primary",
      cardColor: "lightprimary",
    },
    {
      title: String(published),
      status: "Published",
      icon: "solar:check-circle-linear",
      iconColor: "success",
      cardColor: "lightsuccess",
    },
    {
      title: String(draft),
      status: "Draft",
      icon: "solar:file-text-linear",
      iconColor: "warning",
      cardColor: "lightwarning",
    },
    {
      title: String(archived),
      status: "Archived",
      icon: "solar:archive-linear",
      iconColor: "secondary",
      cardColor: "lightsecondary",
    },
    {
      title: String(lowStock),
      status: "Low Stock",
      icon: "solar:danger-triangle-linear",
      iconColor: "error",
      cardColor: "lighterror",
    },
  ];

  return (
    <>
      <BreadcrumbComp title="Products" items={BCrumb} />

      <ProductsTableTemplate
        data={transformedProducts}
        statsCards={statsCards}
        onStatusChange={updateProductStatusAction}
        onDeleteProduct={deleteProductAction}
      />
    </>
  );
};

export default ProductsPage;