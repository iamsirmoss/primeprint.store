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
      <div className='group transition-all duration-500 border border-transparent rounded shadow-xs hover:shadow-lg hover:border-gray-300 p-1 relative pb-14'>
            <Link href={`/product/${slug}`}>
                  <div className='w-full overflow-hidden flex flex-col items-center justify-center bg-blue-100 rounded h-44'>
                        <Image src={images?.[0] ? `/images/${images[0]}` : "/images/placeholder.png"} alt='product images' 
                        priority width={0} height={0} sizes='100vw'className='object-cover w-[45%] md:w-[60%]' />
                  </div>
                  {/* <div className='absolute top-5 right-4 bg-white rounded-full flex flex-col items-center justify-center p-2 z-20'>
                        <Heart size={18} />
                  </div> */}
                  <div className='py-6 px-5'>
                        <div className='flex justify-between items-center'>
                              <h5 className='mt-2 text-xl font-medium'>{title}</h5>
                              <h5 className='mt-2 text-lg font-bold max-w-fit text-red-500'>
                                    <span className='text-black text-sm'>$ </span>{price}.00
                              </h5>
                        </div>
                        <p className='text-gray-500 mt-3 text-sm'>{description}</p>
                        
                  </div>
            </Link>
            <div className='absolute bottom-2 right-4'>
                  <button className="mt-6 border rounded py-2 px-4 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
                        <h5 className="text-sm">Add to cart</h5>
                  </button>
            </div>
      </div>
  )
}

export default ProductCard
