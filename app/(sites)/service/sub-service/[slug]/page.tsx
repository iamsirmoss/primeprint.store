import Banner from "@/components/SubServiceDetails/Banner";
import Body from "@/components/SubServiceDetails/Body";
import OtherSubServices from "@/components/SubServiceDetails/OtherServices";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;

  if (!slug) return notFound();

  const subService = await prisma.subService.findFirst({
    where: { slug, isActive: true },
    select: {
      id: true,
      slug: true,
      title: true,
      image: true,
      description: true,
      packages: { select: { id: true, tier: true, name: true, description: true, priceByMonth: true, priceByYear: true, image: true, points: true } },
      service: {
        select: { id: true, slug: true, title: true },
      },
    },
  });

  if (!subService) return notFound();

  const otherSubServices = await prisma.subService.findMany({
    where: {
      isActive: true,
      id: { not: subService.id },
      serviceId: subService.service.id,
    },
    orderBy: { position: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      image: true,
      position: true,
    },
    take: 4,
  });

  return (
    <div>
      <Banner service={subService} />
      <Body service={subService} />
      {otherSubServices.length > 0 && (
        <OtherSubServices
          serviceSlug={subService.service.slug}
          subServices={otherSubServices}
        />
      )}
    </div>
  );
};

export default page;
