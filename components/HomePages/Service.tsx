"use client";

import Image from "next/image";
import Link from "next/link";

interface ServiceProps {
  id: string;
  slug: string;
  title: string;
  icon: string | null;
  products: { id: string; slug: string; title: string }[];
  subServices: { id: string; slug: string; title: string }[];
}

const Service = ({services}: {services: ServiceProps[]}) => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2  
    px-4 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] relative">
      {services.map((service) => (
        <div key={service.id} className="group hover:bg-white hover:shadow-2xl transition-all duration-300">
          <div className="">
            <Link
              href={`service/${service.slug}`}
              className="flex flex-col items-center justify-center px-2 py-9"
            >
              <Image
                src={`/images/${service.icon}`}
                alt={service.title}
                priority
                width={0}
                height={0}
                sizes="100vw"
                className="w-[25%] sm:w-[30%] md:w-[40%] lg:w-[45%]"
              />
              <h5 className="uppercase text-xs mt-5 text-center group-hover:text-black transition-all duration-300 font-semibold">
                {service.title}
              </h5>
            </Link>
          </div>

          {(service.products?.length > 0 || service.subServices?.length > 0) && (
            <div className="absolute left-0 right-0 bg-white shadow-2xl w-full p-10 z-30 opacity-0 translate-x-full
            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 px-6 xxl:px-44 xll:px-[360px] xxx:px-[24%] lll:px-[27%] py-20">
              <div className="flex items-start gap-10">

                {
                  service.products?.length > 0 && (
                  <div className="text-black capitalize">
                    <h6 className="font-semibold mb-4 text-lg border-b">Products</h6>
                    <ul className="mb-4">
                      {service.products.map((product) => (
                        <li key={product.id} className="mb-1 hover:text-blue-400 transition-all duration-500">
                          <Link href={`/product/${product.slug}`}>
                            - {product.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {
                  service.subServices?.length > 0 && (
                  <div className="text-black capitalize">
                    <h6 className="font-semibold mb-4 text-lg border-b">Sub-services</h6>
                    <ul className="">
                      {service.subServices.map((subService) => (
                        <li key={subService.id} className="mb-1 hover:text-blue-400 transition-all duration-500">
                          <Link href={`/service/sub-service/${subService.slug}`}>
                            - {subService.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Service;
