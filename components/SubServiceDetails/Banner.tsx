import { ArrowRight, ChevronsRight } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link'

interface ServiceProps {
      title: string;
      image: string | null;
      description: string | null;
      service: {
        title: string;
        slug: string;
      };
}

const Banner = ({service}: {service: ServiceProps}) => {
  return (
    <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-2 md:py-10'>
      <div className="mt-10 flex items-center gap-5 flex-wrap bg-slate-50 py-2 px-5 text-xs md:text-sm rounded">
        <Link href="/" className="text-gray-400 hover:underline transition-all duration-500">
          Home
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <Link href="/services" className="text-gray-400 hover:underline transition-all duration-500 capitalize">
          Services
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <Link href={`/service/${service.service.slug}`} className="text-gray-400 hover:underline transition-all duration-500 capitalize">
            {service.service.title}
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <span className="font-bold capitalize">{service.title}</span>
      </div>
    </div>
  )
}

export default Banner
