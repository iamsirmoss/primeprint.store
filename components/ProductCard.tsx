import Image from 'next/image'
import image from '@/public/images/note.png'
import Link from 'next/link'
import { Heart } from 'lucide-react'

interface ProductProps {
  slug: string;
  title: string;
  description: string | null;
  price: number;
  images: string[];
}

const ProductCard = ({slug, title, description, price, images}: ProductProps) => {
  return (
      <div className='group transition-all duration-500 border rounded-md shadow-xs hover:shadow-lg hover:border-blue-400 p-2 relative'>
            <Link href={`/product/${slug}`}>
                  <div className='w-full overflow-hidden flex flex-col items-center justify-center bg-blue-100 rounded-md h-44'>
                        <Image src={images?.[0] ? `/images/${images[0]}` : "/images/placeholder.png"} alt='product images' 
                        priority width={0} height={0} sizes='100vw'className='object-cover w-[45%] md:w-[60%]' />
                  </div>
                  <div className='py-6 px-5'>
                        <div className='flex justify-between items-center mt-2'>
                              <h5 className='text-xl font-medium capitalize'>{title}</h5>
                              <Heart size={18} />
                        </div>
                        <p className='text-gray-500 mt-3 text-sm line-clamp-1'>{description}</p>
                  </div>
            
                  <div className='flex justify-between gap-2 items-center px-5 pb-4'>
                        <div>
                              <h5 className='mt-2 text-lg font-bold max-w-fit text-blue-400'>
                                    {price}.00 <span className='text-black text-lg'>$</span>
                              </h5>
                        </div>
                        <div className=''>
                              <button className="border bg-black rounded py-2 px-4 hover:bg-red-500 text-white transition-all duration-300 cursor-pointer">
                                    <h5 className="text-sm">Add to cart</h5>
                              </button>
                        </div>
                  </div>
            </Link>
      </div>
  )
}

export default ProductCard
