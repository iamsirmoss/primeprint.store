import Image from 'next/image'
import image from '@/public/images/note.png'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import React from 'react'

const ProductCard = () => {
  return (
      <div className='group transition-transform duration-300 hover:scale-105 rounded border-b'>
            <Link href={'/'} className='relative'>
                  <div className='w-full overflow-hidden flex flex-col items-center justify-center bg-blue-100 rounded'>
                        <Image src={image} alt='image1' priority width={0} height={0} sizes='100vw'className='object-cover w-[45%] md:w-[60%]' />
                  </div>
                  <div className='absolute top-5 right-4 bg-white rounded-full flex flex-col items-center justify-center p-2'>
                        <Heart size={18} />
                  </div>
                  <div className='py-6 px-5'>
                        <div className='flex justify-between items-center'>
                              <h5 className='mt-2 text-xl font-medium'>Lorem ipsm</h5>
                              <h5 className='mt-2 text-lg font-bold max-w-fit text-red-500'>
                                    <span className='text-black'>$ </span>100.00
                              </h5>
                        </div>
                        <p className='text-gray-500 mt-3 text-sm'>Lorem ipsum vitae accumsan orci fringilla a</p>
                        <button className="mt-6 border rounded py-2 px-4 hover:bg-black hover:text-white transition-all duration-300">
                              <h5 className="text-sm">Add to cart</h5>
                        </button>
                  </div>
            </Link>
      </div>
  )
}

export default ProductCard
