import ReviewsPageClient from "@/components/ReviewsPage/ReviewsClient";
import { prisma } from "@/lib/prisma";

const Page = async () => {
  const reviewsRaw = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      product: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  });

  const reviews = reviewsRaw.map((review) => ({
    ...review,
    comment: review.comment ?? "",
    createdAt: review.createdAt.toISOString(),
  }));

  return <ReviewsPageClient reviews={reviews} />;
};

export default Page;