import BannerSkeleton from '@/components/Skeletons/serviceDetails/BannerSkeleton';
import BodySkeleton from '@/components/Skeletons/serviceDetails/BodySkeleton';
import OtherServicesSkeleton from '@/components/Skeletons/serviceDetails/OtherServicesSkeleton';

const page = () => {

  return (
    <div>
      <BannerSkeleton />
      <BodySkeleton />
      <OtherServicesSkeleton />
    </div>
  )
}

export default page
