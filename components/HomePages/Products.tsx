import React from 'react'
import ProductCard from '../ProductCard'

const Products = () => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h1 className='text-5xl font-bold'>Todays deals !</h1>
            {/* <div className='mt-12 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                  <button className='bg-red-500 rounded py-2 px-4'>
                        <h5 className='text-white text-sm'>All</h5>
                  </button>
                  {
                       Array.from({ length: 5 }).map((_, index) => (
                              <button className='border rounded py-2 px-4 hover:bg-red-500 hover:text-white transition-all duration-500' 
                              key={index}>
                                    <h5 className='text-sm'>Lorem</h5>
                              </button>
                       )) 
                  }
            </div> */}
            <div className='mt-16 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8'>
                  {
                        Array.from({ length: 8 }).map((_, index) => (
                              <ProductCard key={index} />
                        ))
                  }
            </div>
      </div>
  )
}

export default Products
