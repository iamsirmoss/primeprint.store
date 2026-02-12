import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { BsArrowRight } from 'react-icons/bs';

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

const Body = ({service}: {service: ServiceProps}) => {
  return (
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] pb-20">

            {/* SUB-SERVICES */}
            <section className="pb-14">
                  <div className="flex items-end justify-between flex-wrap gap-4">
                        <div className='max-w-3xl'>
                              <h2 className="text-2xl xs:text-3xl lg:text-5xl font-bold">
                                    Specialized services
                              </h2>
                        </div>

                        <span className="text-sm text-gray-500">
                              {service.subServices.length} item(s)
                        </span>
                  </div>

                  {service.subServices.length === 0 ? (
                  <div className="mt-20 rounded-2xl border border-gray-200 bg-white p-6 text-gray-600">
                        No sub-services available at this time.
                  </div>
                  ) : (
                  <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {service.subServices.map((ss) => (
                        <Link
                              key={ss.id}
                              href={`/service/sub-service/${ss.slug}`}
                              className="group rounded-lg border border-gray-200 bg-white px-5 py-8 transition-all hover:shadow-lg duration-500"
                        >
                              <div className="flex items-start flex-col gap-4">
                                    {/* vignette */}
                                    <div className="relative h-14 w-14 p-4 shrink-0 overflow-hidden rounded-xl bg-gray-100 border border-gray-200">
                                          {ss.image ? (
                                          <Image
                                                src={ss.image}
                                                alt={ss.title}
                                                fill
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-full h-full object-cover"
                                          />
                                          ) : (
                                          <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                                                IMG
                                          </div>
                                    )}
                                    </div>

                                    <div className="min-w-0">
                                          <h3 className="font-bold text-xl text-gray-900 capitalize group-hover:text-blue-400 transition-all duration-500">
                                                {ss.title}
                                          </h3>
                                          <p className="mt-1 line-clamp-3 text-sm text-gray-500">
                                                {ss.description ?? "See details and options."}
                                          </p>
                                    </div>
                              </div>
                              <button
                                    className="mt-10 px-4 py-2 bg-transparent border rounded group
                                    transition-all duration-500 ease-in-out flex items-center gap-2 capitalize cursor-pointer"
                                    >
                                          more
                                          <BsArrowRight className='group-hover:translate-x-2 transition-all duration-500' />
                              </button>
                        </Link>
                        ))}
                  </div>
                  )}
            </section>
      </div>
  )
}

export default Body
