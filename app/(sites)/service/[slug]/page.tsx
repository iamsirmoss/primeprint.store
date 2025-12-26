import Banner from '@/components/ServiceDetails/Banner'
import Body from '@/components/ServiceDetails/Body';
import OtherServices from '@/components/ServiceDetails/OtherServices';
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

      const service = await prisma.service.findFirst({
            where: { slug },
            include: {
              subServices: {
                where: { isActive: true },
                orderBy: { position: "asc" },
                select: {
                  id: true,
                  slug: true,
                  title: true,
                  description: true,
                  image: true,
                  position: true,
                },
              }
            }
      })

      if (!service || !service.isActive) {
            return notFound();
      }

      const otherServices = await prisma.service.findMany({
        where: {
          isActive: true,
          slug: { not: slug },
        },
        orderBy: { position: "asc" },
        select: {
          slug: true,
          title: true,
          description: true,
          icon: true,
        },
        take: 4,
      });

  return (
    <div>
      <Banner service={service} />
      <Body service={service} />
      {otherServices.length > 0 && (
        <OtherServices currentSlug={slug} services={otherServices} />
      )}
    </div>
  )
}

export default page
