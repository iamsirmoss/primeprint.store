import Banner from "@/components/ShopPage/Banner";
import Products from "@/components/ShopPage/Products";
import { prisma } from "@/lib/prisma";

const page = async () => {
  const [services, productsRaw] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { position: "asc" },
      select: { id: true, slug: true, title: true },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        serviceId: true,
        slug: true,
        title: true,
        description: true,
        basePriceCents: true,
        currency: true,
        stockQty: true,
        sku: true,
        images: {
          orderBy: {
            position: "asc",
          },
          select: {
            url: true,
          },
        },
        isActive: true,
      },
    }),
  ]);

  const products = productsRaw.map((product) => ({
    ...product,
    description: product.description ?? "",
    images: product.images.map((image) => image.url),
  }));

  return (
    <div>
      <Banner />
      <Products title="Products" services={services} products={products} />
    </div>
  );
};

export default page;