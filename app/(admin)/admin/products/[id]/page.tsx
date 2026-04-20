import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { isAdminRole } from "@/lib/admin";

import BreadcrumbComp from "@/components/Admin/layout/shared/breadcrumb/BreadcrumbComp/BreadcrumbComp";
import CardBox from "@/components/Admin/shared/CardBox";
import ProductOverviewCard from "@/components/Admin/products/ProductOverviewCard";
import ProductGalleryCard from "@/components/Admin/products/ProductGalleryCard";
import ProductFlagsCard from "@/components/Admin/products/ProductFlagsCard";
import ProductVariantsCard from "@/components/Admin/products/ProductVariantsCard";
import ProductDescriptionCard from "@/components/Admin/products/ProductDescriptionCard";
import ProductStatusManager from "@/components/Admin/products/ProductStatusManager";

import { getAdminProductById } from "@/server/queries/product-details";
import { updateProductStatusAction } from "../actions";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect("/login");

  if (!isAdminRole(session.user.role)) {
    redirect("/");
  }

  const { id } = await params;

  const product = await getAdminProductById(id);

  if (!product) {
    notFound();
  }

  const BCrumb = [
    {
      to: "/admin/dashboard",
      title: "Home",
    },
    {
      to: "",
      title: product.title,
    },
  ];

  return (
    <>
      <BreadcrumbComp title={product.title} items={BCrumb} />

      <div className="space-y-7">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review product information, gallery, variants, stock, and status.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="xl:col-span-8 col-span-12">
            <ProductGalleryCard
              title={product.title}
              images={product.images.map((image) => ({
                id: image.id,
                url: image.url,
                alt: image.alt,
              }))}
            />
          </div>

          <div className="xl:col-span-4 col-span-12 space-y-7">
            <ProductOverviewCard
              title={product.title}
              slug={product.slug}
              type={product.type}
              currency={product.currency}
              stockQty={product.stockQty}
              lowStockThreshold={product.lowStockThreshold}
              basePriceCents={product.basePriceCents}
              category={product.category?.name}
              service={product.service?.title}
            />

            <CardBox className="p-5">
              <h2 className="text-lg font-semibold mb-4">Status</h2>
              <ProductStatusManager
                productId={product.id}
                status={product.status}
                onStatusChange={updateProductStatusAction}
              />
            </CardBox>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="xl:col-span-8 col-span-12">
            <ProductVariantsCard
              currency={product.currency}
              variants={product.variants.map((variant) => ({
                id: variant.id,
                name: variant.name,
                sku: variant.sku,
                priceCents: variant.priceCents,
                stockQty: variant.stockQty,
                isDefault: variant.isDefault,
                isActive: variant.isActive,
              }))}
            />
          </div>

          <div className="xl:col-span-4 col-span-12">
            <ProductFlagsCard
              isFeatured={product.isFeatured}
              isActive={product.isActive}
              trackInventory={product.trackInventory}
              requiresUpload={product.requiresUpload}
              requiresApproval={product.requiresApproval}
              requiresAppointment={product.requiresAppointment}
              salesChannel={product.salesChannel}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12">
            <ProductDescriptionCard
              shortDescription={product.shortDescription}
              description={product.description}
              seoTitle={product.seoTitle}
              seoDescription={product.seoDescription}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;