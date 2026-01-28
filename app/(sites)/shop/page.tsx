import Banner from '@/components/ShopPage/Banner'
import Products from '@/components/ShopPage/Products'
import { prisma } from '@/lib/prisma'

const page = async () => {

  // const products = await prisma.product.findMany({
  //   select: {
  //     id: true,
  //     slug: true,
  //     title: true,
  //     description: true,
  //     price: true,
  //     images: true
  //   } 
  // })

  const [services, products] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { position: "asc" },
      select: { id: true, slug: true, title: true },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        serviceId: true,
        slug: true,
        title: true,
        description: true,
        price: true,
        currency: true,
        stockQty: true,
        sku: true,
        images: true,
        isActive: true
      },
    }),
  ]);

  return (
      <div>
            <Banner />
            <Products title="Products" services={services} products={products}  />
      </div>
  )
}

export default page
