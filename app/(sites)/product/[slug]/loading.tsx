import BannerSkeleton from '@/components/Skeletons/productDetails/BannerSkeleton'
import ProductDetailsSkeleton from '@/components/Skeletons/productDetails/ProductDetailsSkeleton'

const loading = () => {
  return (
    <div>
      <BannerSkeleton />
      <ProductDetailsSkeleton />
    </div>
  )
}

export default loading
