import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/admin";

import BreadcrumbComp from "@/components/Admin/layout/shared/breadcrumb/BreadcrumbComp/BreadcrumbComp";
import ProductCreateForm from "@/components/Admin/products/ProductCreateForm";

import { getProductFormOptions } from "@/server/queries/product-form";

const BCrumb = [
  { to: "/admin/dashboard", title: "Home" },
  { title: "New Product" },
];

export default async function NewProductPage() {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect("/login");

  if (!isAdminRole(session.user.role)) {
    redirect("/");
  }

  const { services, categories } = await getProductFormOptions();

  return (
    <>
      <BreadcrumbComp title="New Product" items={BCrumb} />

      <ProductCreateForm
        services={services}
        categories={categories}
      />
    </>
  );
}