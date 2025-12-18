import { ArrowRight } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link'

interface ProductProps {
      title: string;
      images: string[];
}

const Banner = ({product}: {product: ProductProps}) => {
  return (
    <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10'>
      <div className="mt-10 flex items-center gap-5 flex-wrap">
        <Link href="/" className="text-blue-400 hover:underline transition-all duration-500">
          Home
        </Link>
        <ArrowRight size={20} className="text-gray-400" />
        <Link href="/shop" className="text-blue-400 hover:underline transition-all duration-500">
          Shop
        </Link>
        <ArrowRight size={20} className="text-gray-400" />
        <span className="font-bold capitalize">{product.title}</span>
      </div>
      <div className='mt-6'>
            {product.images &&
                  <div className='h-52 w-52'>
                        <Image
                              src={product.images?.[0] ? `/images/${product.images[0]}` : "/images/placeholder.png"}
                              alt={product.title}
                              priority
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-full object-cover"
                        />
                  </div>
            }
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mt-4 capitalize'>
                  {product.title}
            </h1>
      </div>
    </div>
  )
}

export default Banner
