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
import ProductImagesManager from "@/components/Admin/products/ProductImagesManager";
import ProductVariantsManager from "@/components/Admin/products/ProductVariantsManager";
import ProductEditForm from "@/components/Admin/products/ProductEditForm";
import DeleteProductButton from "@/components/Admin/products/DeleteProductButton";

import { getAdminProductById } from "@/server/queries/product-details";
import { getProductFormOptions } from "@/server/queries/product-form";
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

  const [product, formOptions] = await Promise.all([
    getAdminProductById(id),
    getProductFormOptions(),
  ]);

  if (!product) {
    notFound();
  }

  const { services, categories } = formOptions;

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

            <CardBox className="p-5 border border-red-200 dark:border-red-900">
              <h2 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
                Danger Zone
              </h2>

              <p className="text-sm mb-4">
                This action is irreversible. Deleting this product will permanently
                remove it from your catalog.
              </p>

              <DeleteProductButton
                productId={product.id}
                productTitle={product.title}
              />
            </CardBox>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12">
            <ProductEditForm
              product={{
                id: product.id,
                title: product.title,
                slug: product.slug,
                sku: product.sku,
                type: product.type,
                status: product.status,
                currency: product.currency,
                salesChannel: product.salesChannel,
                basePriceCents: product.basePriceCents,
                compareAtPriceCents: product.compareAtPriceCents,
                stockQty: product.stockQty,
                lowStockThreshold: product.lowStockThreshold,
                shortDescription: product.shortDescription,
                description: product.description,
                instructions: product.instructions,
                seoTitle: product.seoTitle,
                seoDescription: product.seoDescription,
                isFeatured: product.isFeatured,
                isActive: product.isActive,
                trackInventory: product.trackInventory,
                requiresUpload: product.requiresUpload,
                requiresApproval: product.requiresApproval,
                requiresAppointment: product.requiresAppointment,
                serviceId: product.serviceId,
                categoryId: product.categoryId,
              }}
              services={services}
              categories={categories}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-7">
          <div className="xl:col-span-8 col-span-12">
            <ProductImagesManager
              productId={product.id}
              title={product.title}
              images={product.images.map((image) => ({
                id: image.id,
                url: image.url,
                alt: image.alt,
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
          <div className="xl:col-span-8 col-span-12">
            <ProductVariantsManager
              productId={product.id}
              variants={product.variants.map((variant) => ({
                id: variant.id,
                name: variant.name,
                sku: variant.sku,
                priceCents: variant.priceCents,
                stockQty: variant.stockQty,
                isDefault: variant.isDefault,
                isActive: variant.isActive,
                options: variant.options,
              }))}
            />
          </div>

          <div className="xl:col-span-4 col-span-12">
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