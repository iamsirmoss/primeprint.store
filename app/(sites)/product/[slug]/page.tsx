import Banner from '@/components/ProductDetails/Banner';
import { prisma } from '@/lib/prisma';
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>; 
}

const page = async ({ params }: ProductPageProps) => {
      const { slug } = await params;

      if (!slug || typeof slug !== "string") {
            return notFound();
      }

      const product = await prisma.product.findFirst({
            where: { slug },
            select: {
                  title: true,
                  images: true,
            },
      })

      if (!product) {
            return notFound();
      }

  return (
    <div>
      <Banner product={product} />
    </div>
  )
}

export default page
