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
    <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10'>
      <div className="mt-10 flex items-center gap-5 flex-wrap border-b border-slate-200 py-3 px-5">
        <Link href="/" className="text-blue-400 hover:underline transition-all duration-500">
          Home
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <Link href="/services" className="text-blue-400 hover:underline transition-all duration-500 capitalize">
          Services
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <Link href={`/service/${service.service.slug}`} className="text-blue-400 hover:underline transition-all duration-500 capitalize">
            {service.service.title}
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <span className="font-bold capitalize">{service.title}</span>
      </div>
      
            {/* <section className="pt-20 pb-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
      
                  <h1 className="mt-2 text-3xl md:text-[64px] font-bold text-gray-900 capitalize">
                    {service.title}
                  </h1>
      
                  {service.description ? (
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  ) : (
                    <p className="mt-4 text-gray-500">
                      No description available at this time.
                    </p>
                  )}
      
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/services"
                      className="inline-flex items-center rounded border border-transparent bg-black px-6 py-4 text-base font-medium text-white hover:bg-white 
                      hover:text-black hover:border-black transition-all duration-500"
                    >
                      ← All services
                    </Link>
      
                  </div>
                </div>
      
                {service.image ? (
                  <div className="w-[220px] md:w-[300px] lg:w-[420px] rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <Image
                      src={`/images/${service.image}`}
                      alt={service.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-[220px] md:w-[300px] lg:w-[420px] h-60 rounded-2xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
            </section> */}
    </div>
  )
}

export default Banner
