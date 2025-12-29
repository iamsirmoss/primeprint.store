import Banner from '@/components/ProductDetails/Banner';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
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
            where: { slug, isActive: true },
            select: {
                  id: true,
                  slug: true,
                  description: true,
                  price: true,
                  title: true,
                  images: true,
                  sku: true,
            },
      })

      if (!product) {
            return notFound();
      }

      const reviews = [
      {
            id: "r1",
            name: "Helen M.",
            dateLabel: "Yesterday",
            rating: 5,
            text: "Excellent product. It fits very well and looks premium.",
      },
      {
            id: "r2",
            name: "Ann D.",
            dateLabel: "2 days ago",
            rating: 4,
            text: "Good quality overall. Would buy again.",
      },
      {
            id: "r3",
            name: "Andrew G.",
            dateLabel: "2 days ago",
            rating: 4,
            text: "Is it suitable for daily use? Works fine for me.",
      },
      ];

  return (
    <div>
      <Banner product={product} />
      <ProductDetails
            product={{
            ...product,
            }}
            reviews={reviews}
      />
    </div>
  )
}

export default page
