"use client";

import React, { useState } from "react";
import { Services, service } from "@/data/Service";
import Image from "next/image";
import Link from "next/link";

const Service = () => {
  const [services, setServices] = useState<Services[]>(service);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2  
    px-4 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] relative">
      {services.map((service) => (
        <div key={service.id} className="group hover:bg-slate-100 transition-all duration-300">
          <div className="">
            <Link
              href={`service/${service.id}`}
              className="flex flex-col items-center justify-center px-2 py-9"
            >
              <Image
                src={`/images/${service.icon}`}
                alt={service.name}
                priority
                width={0}
                height={0}
                sizes="100vw"
                className="w-[40%] sm:w-[50%]"
              />
              <h5 className="uppercase text-xs mt-5 text-center group-hover:text-black transition-all duration-300">
                {service.name}
              </h5>
            </Link>
          </div>
          <div className="absolute left-0 right-0 bg-slate-100 w-full p-10 z-30 opacity-0 translate-x-full 
          group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700">
            <div className="flex items-start gap-10">
              <div className="text-black capitalize">
                <h6 className="font-semibold mb-4 text-lg">Products :</h6>
                <ul className="mb-4">
                  {service.products.map((product) => (
                    <li key={product.id} className="mb-1">
                      - {product.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-black capitalize">
                <h6 className="font-semibold mb-4 text-lg">Sub-services :</h6>
                <ul className="">
                  {service.subServices.map((subService) => (
                    <li key={subService.id} className="mb-1">
                      - {subService.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Service;
