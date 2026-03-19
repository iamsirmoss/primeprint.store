import Image from "next/image";
import image from "@/public/images/imprimante.jpg";

const About = () => {
  return (
    <section className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10 md:py-20">
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        <div className="lg:w-[55%]">
          <p className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-gray-500">
            About us
          </p>

          <h1 className="mt-4 text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight">
            PrimePrint<span className="text-blue-500">.store</span>
          </h1>

          <p className="mt-8 text-gray-500 text-sm md:text-base lg:text-[17px] leading-7">
            Prime Print Store is a modern printing and business solutions
            platform built to make ordering simple, fast, and reliable. From
            business cards, flyers, and banners to custom printed materials, we
            help individuals and businesses turn ideas into professional
            products.
          </p>

          <p className="mt-5 text-gray-500 text-sm md:text-base lg:text-[17px] leading-7">
            We go beyond printing by offering graphic design, passport photos,
            notary services, and practical business support in one place. Our
            mission is to deliver quality, convenience, and professional service
            so you can save time and get everything you need with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700">
              Custom Printing
            </span>
            <span className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700">
              Graphic Design
            </span>
            <span className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700">
              Business Services
            </span>
          </div>
        </div>

        <div className="lg:w-[45%] h-[300px] lg:h-[500px] mt-10 lg:mt-0 w-full">
          <Image
            src={image}
            alt="Prime Print Store printing equipment"
            priority
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default About;