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


export default function Home() {
  return (
    <div>
      <Banner />
      <Service />
      <Test />
      <TopService />
      {/* <GetUp /> */}
      <Banner2 />
      <Products />
      <Banner3 />
      <Sellings />
      {/* <Trendings /> */}
      {/* <Help /> */}
      <Reviews />
      <Articles />
    </div>
  );
}
