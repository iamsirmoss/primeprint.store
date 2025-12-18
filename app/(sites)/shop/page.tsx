import Banner from '@/components/ShopPage/Banner'
import Products from '@/components/ShopPage/Products'
import { prisma } from '@/lib/prisma'

const page = async () => {

  const products = await prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      price: true,
      images: true
    } 
  })

  return (
      <div>
            <Banner />
            <Products products={products} />
      </div>
  )
}

export default page
