import BannerSkeleton from '@/components/Skeletons/subServiceDetails/BannerSkeleton'
import OtherSubServicesSkeleton from '@/components/Skeletons/subServiceDetails/OtherSubServicesSkeleton'
import SubServiceBodySkeleton from '@/components/Skeletons/subServiceDetails/SubServiceBodySkeleton'

const loading = () => {
  return (
    <div>
      <BannerSkeleton />
      <SubServiceBodySkeleton />
      <OtherSubServicesSkeleton />
    </div>
  )
}

export default loading
