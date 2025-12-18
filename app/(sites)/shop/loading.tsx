import ProductsSkeleton from '@/components/Skeletons/ProductsSkeleton'
import BannerSkeleton from '@/components/Skeletons/servicePage/BannerSkeleton'

const page = () => {
  return (
    <div>
      <BannerSkeleton />
      <ProductsSkeleton />
    </div>
  )
}

export default page
