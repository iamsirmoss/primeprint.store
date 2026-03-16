import React from 'react'
import ProductCard from '../ProductCard'

interface ProductProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  basePriceCents?: number;
  compareAtPriceCents?: number | null;
  images: string[];
  currency: string;
  stockQty?: number | null;
  lowStockThreshold?: number | null;
  sku?: string | null;
  isActive?: boolean;
  isFeatured?: boolean;
  requiresUpload?: boolean;
  requiresApproval?: boolean;
  requiresAppointment?: boolean;
  type?: string;
  salesChannel?: string;
  category?: {
    name: string;
    slug: string;
  } | null;
  service?: {
    title: string;
    slug: string;
  } | null;
  ratingAverage?: number | null;
  reviewCount?: number;
}

const Sellings = ({products}: {products: ProductProps[]}) => {
  return (
      <div className='py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h1 className='text-2xl xs:text-3xl lg:text-5xl font-bold'>Most selling products</h1>
            <div className='mt-16 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                  {
                        products.slice(0, 4).map((product) => (
                              <ProductCard 
                                    key={product.id}
                                    id={product.id}
                                    slug={product.slug}
                                    title={product.title}
                                    description={product.description ?? ""}
                                    price={product.price}
                                    basePriceCents={product.basePriceCents}
                                    compareAtPriceCents={product.compareAtPriceCents}
                                    images={product.images}
                                    currency={product.currency ?? "USD"}
                                    stockQty={product.stockQty}
                                    lowStockThreshold={product.lowStockThreshold}
                                    sku={product.sku}
                                    isActive={product.isActive}
                                    isFeatured={product.isFeatured}
                                    requiresUpload={product.requiresUpload}
                                    requiresApproval={product.requiresApproval}
                                    requiresAppointment={product.requiresAppointment}
                                    type={product.type}
                                    salesChannel={product.salesChannel}
                                    category={product.category}
                                    service={product.service}
                                    ratingAverage={product.ratingAverage}
                                    reviewCount={product.reviewCount}
                               />
                        ))
                  }
            </div>
      </div>
  )
}

export default Sellings
