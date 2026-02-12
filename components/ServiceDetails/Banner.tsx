import { ArrowRight, ChevronsRight } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link'

interface ServiceProps {
      description: string | null;
      slug: string;
      id: string;
      title: string;
      icon: string | null;
      isActive: boolean;
      position: number;
      createdAt: Date;
      updatedAt: Date;
      subServices: {
        image: string | null;
        description: string | null;
        id: string;
        title: string;
        slug: string;
        position: number;
    }[];
}

const Banner = ({service}: {service: ServiceProps}) => {
  return (
    <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10'>
      <div className="mt-10 flex items-end gap-5 flex-wrap bg-slate-50 py-2 px-5 text-sm rounded">
        <Link href="/" className="text-gray-400 hover:underline transition-all duration-500">
          Home
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <Link href="/services" className="text-gray-400 hover:underline transition-all duration-500">
          Services
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <span className="font-semibold capitalize">{service.title}</span>
      </div>

            <section className="pt-20 pb-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
      
                  <h1 className="mt-2 text-2xl md:text-3xl lg:text-[64px] font-bold text-gray-900 capitalize">
                    {service.title}
                  </h1>
      
                  {service.description ? (
                    <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
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
      
                    {/* <Link
                      href="/order"
                      className="inline-flex items-center rounded bg-red-500 px-6 py-4 text-sm font-medium text-white hover:bg-blue-400 transition-all duration-500"
                    >
                      Order now
                    </Link> */}
                  </div>
                </div>
      
                {service.icon ? (
                  <div className="w-[220px] md:w-[300px] lg:w-[420px] rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <Image
                      src={`/images/${service.icon}`}
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
                    Image
                  </div>
                )}
              </div>
            </section>

    </div>
  )
}

export default Banner
