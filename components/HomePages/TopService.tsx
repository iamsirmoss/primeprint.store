import TopServiceCard from '../CardTopService'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

interface ServiceProps {
  id: string;
  slug: string;
  title: string;
  image: string | null;
  products: { id: string; slug: string; title: string }[];
  subServices: { id: string; slug: string; title: string }[];
}

const TopService = ({services}: {services: ServiceProps[]}) => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h2 className='text-2xl xs:text-3xl lg:text-5xl font-bold'>Discover our top services </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-20">
              {services.slice(0, 4).map((service, index) => (
                <TopServiceCard
                  key={index}
                  title={service.title}
                  image={service.image ?? ""}
                  slug={service.slug}
                />
              ))}
            </div>
            <div className='mt-10 text-xl border-b text-blue-400 w-fit border-b-blue-400'>
                  <Link href={'/services'} className='flex items-center gap-2 group text-sm mdtext-base'>
                        View all
                        <BsArrowRight className='text-xl group-hover:translate-x-2 transition-all duration-500' />
                  </Link>
            </div>
      </div>
  )
}

export default TopService
