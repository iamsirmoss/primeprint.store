import React from 'react'
import ProductCard from '../ProductCard'

interface ProductProps {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  images: string[];
}

const Products = ({products}: {products: ProductProps[]}) => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h1 className='text-5xl font-bold'>Todays deals !</h1>
            <div className='mt-16 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8'>
                  {
                        products.map((product) => (
                              <ProductCard 
                                    key={product.id} 
                                    slug={product.slug}
                                    title={product.title}
                                    description={product.description ?? ""}
                                    price={product.price}
                                    images={product.images}
                              />
                        ))
                  }
            </div>
      </div>
  )
}

export default Products
