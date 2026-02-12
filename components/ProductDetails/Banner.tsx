import { ChevronsRight } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link'

interface ProductProps {
      title: string;
      images: string[];
}

const Banner = ({product}: {product: ProductProps}) => {
  return (
    <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10'>
      <div className="mt-10 flex items-center gap-5 flex-wrap bg-slate-50 py-2 px-5 text-sm rounded">
        <Link href="/" className="text-gray-400 hover:underline transition-all duration-500">
          Home
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <Link href="/shop" className="text-gray-400 hover:underline transition-all duration-500">
          Shop
        </Link>
        <ChevronsRight size={20} className="text-black" />
        <span className="font-bold capitalize">{product.title}</span>
      </div>
    </div>
  )
}

export default Banner
