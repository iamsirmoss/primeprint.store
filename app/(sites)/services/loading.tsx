import BannerSkeleton from '@/components/Skeletons/servicePage/BannerSkeleton'
import ServicesSkeleton from '@/components/Skeletons/servicePage/ServicesSkeleton'

const page = () => {
  return (
    <div>
      <BannerSkeleton />
      <ServicesSkeleton />
    </div>
  )
}

export default page
