import React from 'react'
import ProductCard from '../ProductCard'

const Sellings = () => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h1 className='text-5xl font-bold'>Most selling products</h1>
            <div className='mt-16 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8'>
                  {
                        Array.from({ length: 4 }).map((_, index) => (
                              <ProductCard key={index} />
                        ))
                  }
            </div>
      </div>
  )
}

export default Sellings
