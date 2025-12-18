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
      position: "asc"
    },
    select: {
      id: true,
      slug: true,
      title: true,
      icon: true,
      products: {
        select: {
          id: true,
          slug: true,
          title: true
        }
      },
      subServices: {
        select: {
          id: true,
          slug: true,
          title: true
        }
      }
    },
  })

  const products = await prisma.product.findMany({
    take: 3,
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      price: true,
      images: true
    } 
  })

  const productsHome = await prisma.product.findMany({
    take: 8,
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
