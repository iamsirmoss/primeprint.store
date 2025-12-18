import ServiceSkeleton from "@/components/Skeletons/ServiceSkeleton";
import Banner2 from "@/components/HomePages/Banner2";
import Banner3 from "@/components/HomePages/Banner3";
import Articles from "@/components/HomePages/Articles";
import Reviews from "@/components/HomePages/Reviews";
import TestSkeleton from "@/components/Skeletons/DealsSkeleton";
import TopServiceSkeleton from "@/components/Skeletons/TopServiceSkeleton";
import ProductsSkeleton from "@/components/Skeletons/ProductsSkeleton";
import SellingsSkeleton from "@/components/Skeletons/SellingsSkeleton";
import BannerSkeleton from "@/components/Skeletons/BannerSkeleton";

export default function Loading() {

  return (
      <>
            <BannerSkeleton />
            <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2  
                  px-4 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]"
            >
                  {Array.from({ length: 8 }).map((_, i) => (
                        <ServiceSkeleton key={i} />
                  ))}
            </div>
            <TestSkeleton />
            <TopServiceSkeleton />
            <Banner2 />
            <ProductsSkeleton />
            <Banner3 />
            <SellingsSkeleton />
            <Reviews />
            <Articles />
    </>
  );
}
