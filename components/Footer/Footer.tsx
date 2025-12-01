import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import image1 from '@/public/images/logo-footer.png'
import { FaApplePay, FaStripe } from "react-icons/fa";
import { RiVisaLine } from 'react-icons/ri';

const Footer = () => {
  return (
      <footer className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] bg-black text-gray-300'>
            
            <div className='py-20 block lg:flex items-end gap-10'>
                  <div className='w-full sm:w-[85%] lg:w-[40%]'>
                        <div className='w-[170px] md:w-[200px] xl:w-[220px]'>
                              <Link href='/'>
                                    <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' className='w-full' />
                              </Link>
                        </div>
                        <p className='text-gray-500 mt-10 max-w-full md:max-w-xs'>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                              Donec convallis ipsum massa, vitae accumsan orci fringilla a.
                        </p>
                        <div className='mt-10'>
                              <h4 className='font-bold text-xl'>Accepted payments</h4>
                              <div className='mt-5 grid grid-cols-3 gap-2'>
                                    <div className='border px-2 flex flex-col items-center justify-center rounded-md'>
                                          <FaStripe size={40} className='text-blue-400' />
                                    </div>
                                    <div className='border px-2 flex flex-col items-center justify-center rounded-md'>
                                          <RiVisaLine size={40} className='text-blue-400' />
                                    </div>
                                    <div className='border px-2 flex flex-col items-center justify-center rounded-md'>
                                          <FaApplePay size={40} className='text-blue-400' />
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 mt-10 lg:mt-0 w-[70%]'>
                  <div className=''>
                        <h4 className='font-bold text-xl'>Department</h4>
                        <div className='mt-5'>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Flyers
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Brochures
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Invitations
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Newsletters
                                    </Link>
                              </h5>
                        </div>
                  </div>
                  <div>
                        <h4 className='font-bold text-xl'>About us</h4>
                        <div className='mt-5'>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          About
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          News & blog
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Press center
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Careers
                                    </Link>
                              </h5>
                        </div>
                  </div>
                  <div>
                        <h4 className='font-bold text-xl'>Services</h4>
                        <div className='mt-5'>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Printing
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Notary public
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Shredding
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Computer rental
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Faxes
                                    </Link>
                              </h5>
                        </div>
                  </div>
                  <div>
                        <h4 className='font-bold text-xl'>Help</h4>
                        <div className='mt-5'>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Shopcart help
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Contact us
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Feedback
                                    </Link>
                              </h5>
                              <h5 className='font-normal mt-1 max-w-fit hover:translate-x-2 transition-all duration-300 text-gray-500'>
                                    <Link href={'/'}>
                                          Track orders
                                    </Link>
                              </h5>
                        </div>
                  </div>
                  </div>
            </div>
            <hr className='border-t border-gray-500 my-0.5' />
            <div className='py-2'>
                  <p>Copyright ©2025 <span className='text-white underline'>primeprint.store</span></p>
            </div>
      </footer>
  )
}

export default Footer
