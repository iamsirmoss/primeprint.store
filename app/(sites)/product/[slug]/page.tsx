import Banner from "@/components/ProductDetails/Banner";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    return notFound();
  }

  const productRaw = await prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      shortDescription: true,
      description: true,
      basePriceCents: true,
      compareAtPriceCents: true,
      currency: true,
      sku: true,
      stockQty: true,
      isActive: true,
      type: true,
      requiresUpload: true,
      requiresApproval: true,
      requiresAppointment: true,
      instructions: true,
      service: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      category: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
      images: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          url: true,
          alt: true,
          position: true,
        },
      },
      reviews: {
        where: {
          status: "APPROVED",
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          rating: true,
          title: true,
          comment: true,
          isVerified: true,
          createdAt: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!productRaw) {
    return notFound();
  }

  const product = {
    id: productRaw.id,
    slug: productRaw.slug,
    title: productRaw.title,
    shortDescription: productRaw.shortDescription,
    description: productRaw.description,
    basePriceCents: productRaw.basePriceCents,
    compareAtPriceCents: productRaw.compareAtPriceCents,
    currency: productRaw.currency,
    sku: productRaw.sku,
    stockQty: productRaw.stockQty,
    isActive: productRaw.isActive,
    type: productRaw.type,
    requiresUpload: productRaw.requiresUpload,
    requiresApproval: productRaw.requiresApproval,
    requiresAppointment: productRaw.requiresAppointment,
    instructions: productRaw.instructions,
    service: productRaw.service,
    category: productRaw.category,
    images: productRaw.images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      position: img.position,
    })),
  };

  const reviews = productRaw.reviews.map((review) => ({
    id: review.id,
    name: review.user?.name ?? "Anonymous",
    dateLabel: new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(review.createdAt),
    rating: review.rating,
    text: review.comment ?? "",
    title: review.title ?? "",
    isVerified: review.isVerified,
  }));

  return (
    <div>
      <Banner product={product} />
      <ProductDetails product={product} reviews={reviews} />
    </div>
  );
};

export default page;