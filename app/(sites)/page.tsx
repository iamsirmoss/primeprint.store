import Banner from "@/components/HomePages/Banner";
import Service from "@/components/HomePages/Service";
import Test from "@/components/HomePages/Deals";
import GetUp from "@/components/HomePages/GetUp";
import Products from "@/components/HomePages/Products";
import Banner2 from "@/components/HomePages/Banner2";
import Banner3 from "@/components/HomePages/Banner3";
import Sellings from "@/components/HomePages/Sellings";
import Trendings from "@/components/HomePages/Trendings";
import Help from "@/components/HomePages/Help";
import TopService from "@/components/HomePages/TopService";
import Articles from "@/components/HomePages/Articles";
import Reviews from "@/components/HomePages/Reviews";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const services = await prisma.service.findMany({
    take: 8,
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      image: true,
      products: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      subServices: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
    },
  });

  const productsRaw = await prisma.product.findMany({
    take: 3,
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      basePriceCents: true,
      stockQty: true,
      isActive: true,
      images: {
        orderBy: {
          position: "asc",
        },
        select: {
          url: true,
        },
      },
    },
  });

  const productsHomeRaw = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      basePriceCents: true,
      stockQty: true,
      isActive: true,
      images: {
        orderBy: {
          position: "asc",
        },
        select: {
          url: true,
        },
      },
    },
  });

  const products = productsRaw.map((product) => ({
    ...product,
    description: product.description ?? "",
    images: product.images.map((image) => image.url),
  }));

  const productsHome = productsHomeRaw.map((product) => ({
    ...product,
    description: product.description ?? "",
    images: product.images.map((image) => image.url),
  }));

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Banner />
      <Service services={services} />
      <Test products={products} />
      <TopService services={services} />
      {/* <GetUp /> */}
      <Banner2 />
      <Products products={productsHome} />
      <Banner3 />
      <Sellings products={productsHome} />
      {/* <Trendings /> */}
      {/* <Help /> */}
      <Reviews />
      <Articles />
    </div>
  );
}