import Banner from '@/components/SubServiceDetails/Banner';
import { prisma } from '@/lib/prisma';
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{ slug: string }>; 
}

const page = async ({ params }: ServicePageProps) => {
      const { slug } = await params;

      if (!slug || typeof slug !== "string") {
      return notFound();
      }

      const service = await prisma.subService.findFirst({
            where: { slug },
            select: {
                  title: true,
                  image: true,
                  service: {
                        select: {
                              title: true,
                              slug: true,
                        }
                  }
            },
      })

      if (!service) {
            return notFound();
      }

  return (
    <div>
      <Banner service={service} />
    </div>
  )
}

export default page
