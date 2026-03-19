import Image from "next/image";
import image from "@/public/images/as4.webp";

const Why = () => {
  return (
    <section className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] pt-4 lg:pt-16 pb-16">
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        <div className="lg:w-[50%] h-[300px] lg:h-[500px] relative w-full">
          <Image
            src={image}
            alt="Why choose Prime Print Store"
            priority
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="flex items-end gap-2 absolute bottom-2 lg:bottom-6 left-2 xl:left-6 right-2">
            <div className="py-4 md:py-6 px-5 md:px-8 lg:px-10 bg-blue-500 rounded-2xl">
              <h3 className="text-sm md:text-lg xl:text-xl font-semibold text-white">
                Happy Clients
              </h3>
              <h4 className="text-2xl md:text-4xl xl:text-5xl text-white my-3 font-bold">
                100+
              </h4>
              <p className="text-slate-100 text-xs md:text-sm xl:text-base">
                Satisfied customers
              </p>
            </div>

            <div className="py-4 md:py-6 px-5 md:px-8 lg:px-10 bg-gray-900 rounded-2xl">
              <h3 className="text-sm md:text-lg xl:text-xl font-semibold text-white">
                Projects Completed
              </h3>
              <h4 className="text-2xl md:text-4xl xl:text-5xl text-white my-3 font-bold">
                150+
              </h4>
              <p className="text-slate-100 text-xs md:text-sm xl:text-base">
                Print & design projects
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-[50%] mt-10 lg:mt-0">
          <p className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-gray-500">
            Why choose us
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight">
            Why work with PrimePrint.store?
          </h2>

          <p className="text-gray-500 mt-8 text-sm md:text-base lg:text-[17px] leading-7">
            We combine quality printing, thoughtful design, and reliable service
            to create a smooth experience from start to finish. Whether you need
            marketing materials, branded products, or everyday business support,
            we make the process simple and professional.
          </p>

          <p className="text-gray-500 mt-5 text-sm md:text-base lg:text-[17px] leading-7">
            Our focus is on speed, consistency, and results. With convenient
            online ordering, clear communication, and dependable production, we
            help businesses and individuals get the materials they need without
            unnecessary delays.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-gray-200 p-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Fast and simple ordering
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-500">
                Order online easily and get professional printing without a
                complicated process.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Professional quality
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-500">
                We focus on clean design, reliable production, and results you
                can confidently use for your business.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                More than printing
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-500">
                From design support to passport photos and notary services, we
                bring multiple solutions together in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;