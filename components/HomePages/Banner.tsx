// "use client"

// import React from 'react'
// import Link from 'next/link'
// import { BsArrowRight } from 'react-icons/bs'
// import Image from 'next/image'
// import image1 from '@/public/images/IPAD.png'
// import image2 from '@/public/images/COMPUTERpng.png'
// import image3 from '@/public/images/note.png'
// import {motion} from 'motion/react'

// const Banner = () => {
//   return (
//       <>
//       <div className='grid-cols-1 gap-5 md:gap-4 lg:gap-10 grid md:grid-cols-3 pt-10 pb-28 md:py-10 lg:py-14 xl:py-20 w-full bg-blue-400 
//       px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
//             <div className=''>
//                   <motion.div
//                   initial={{ x: -200, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ duration: 1, ease: "easeInOut" }}
//                   >
//                         <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
//                         className='w-[18%] sm:w-[15%] md:w-[50%] md:mt-20 lg:mt-28' />
//                   </motion.div>
//                   <div className='flex flex-wrap items-center gap-4 mt-10'>
                        
//                         <Link href={'/services'} className='group'>
//                               <button
//                               className='bg-red-500 rounded-2xl px-4 py-4 md:px-5 md:py-5 border border-transparent
//                               shadow-[rgba(13,38,76,0.19)_0px_9px_20px] cursor-pointer flex items-center gap-2 group-hover:bg-transparent group-hover:border-color group-hover:border-white transition-all duration-500'>
                                    
//                                     <h5 className='font-semibold text-xs md:text-sm text-white'>Explore services</h5>
//                                     <BsArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
//                               </button>
//                         </Link>
//                         <Link href={'/shop'} className='group'>
//                               <button
//                               className='bg-white rounded-2xl px-4 py-4 md:px-5 md:py-5 shadow-[rgba(13,38,76,0.19)_0px_9px_20px] border border-transparent
//                               group-hover:bg-transparent group-hover:text-white group-hover:border-color group-hover:border-white transition-all duration-500 cursor-pointer'>
                                    
//                                     <h5 className='font-semibold text-xs md:text-sm group-hover:text-white'>Shop now</h5>
//                               </button>
//                         </Link>
//                   </div>
//             </div>
//             <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, ease: "easeInOut" }}
//             className='md:text-center'>
//                   <h2 className='text-[55px] md:text-[75px] lg:text-[90px] xl:text-[100px] font-extrabold
//                   leading-tight uppercase text-white'>
//                         prime print{" "}<span className='font-light text-[45px] md:text-[60px] lg:text-[80px] xl:text-[90px]'>store</span>
//                   </h2>
//                   <h1 className='text-base lg:text-2xl font-semibold text-white'>
//                         Your one stop shop for printing, notary and more.
//                   </h1>
//             </motion.div>
//             <div className='relative'>
//                   <motion.div
//                   initial={{ x: -100, y: 300, opacity: 0 }}
//                   animate={{ x: 0, y: 200, opacity: 1 }}
//                   transition={{ duration: 1, ease: "easeInOut" }}
//                   >
//                         <Image src={image3} alt='image1' priority width={0} height={0} sizes='100vw' 
//                         className='w-[15%] md:w-[50%] absolute -top-40 left-4 md:top-1/2 md:left-1/2 -translate-x-1/2 -translate-y-1/2' />
//                   </motion.div>
//                   <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1, ease: "easeInOut" }}
//                   >
//                         <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
//                         className='w-[35%] sm:w-[25%] md:w-[90%] absolute right-4 md:-bottom-12 lg:-bottom-16 xl:-bottom-20' />
//                   </motion.div>
//             </div>
//       </div>
//       </>
//   )
// }

// export default Banner


"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { BsArrowRight } from "react-icons/bs"
import { motion } from "framer-motion"

import image1 from "@/public/images/IPAD.png"
import image2 from "@/public/images/COMPUTERpng.png"
import image3 from "@/public/images/note.png"

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[-80px] top-[-80px] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-60px] h-80 w-80 rounded-full bg-red-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_25%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[720px] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:min-h-[760px] lg:grid-cols-2 lg:grid-cols-[1.1fr_1fr]">
        {/* Left content */}
        <div className="relative z-10">
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-sm">
              Printing • Notary Public • Passport Photos • Usps Mailing
            </span>
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-3xl text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl md:text-6xl xl:text-7xl"
          >
            Prime Print{" "}
            <span className="font-light text-white/90">Store</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-sm leading-7 text-white/90 sm:text-base md:text-lg"
          >
            Your one-stop shop for printing, notary, passport photos,
            design services, and more — fast, professional, and ready for
            individuals and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link href="/services" className="group">
              <button className="inline-flex items-center gap-3 rounded-2xl bg-red-500 px-6 py-4 md:py-6 text-sm font-semibold text-white shadow-xl shadow-red-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:bg-red-600">
                Explore services
                <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>

            <Link href="/shop" className="group">
              <button className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 md:py-6 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:translate-y-[-2px] hover:bg-white hover:text-sky-700">
                Shop now
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3"
          >
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white">Fast</h3>
              <p className="mt-1 text-sm text-white/80">Quick turnaround</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white">Pro</h3>
              <p className="mt-1 text-sm text-white/80">Clean quality output</p>
            </div>
          </motion.div>
        </div>

        {/* Right visuals */}
        <div className="relative flex min-h-[350px] xs:min-h-[500px] items-center justify-center md:min-h-[650px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative w-full max-w-[620px]"
          >
            {/* Main card */}
            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-white/10 p-4 sm:p-6">
                <Image
                  src={image2}
                  alt="Computer display"
                  priority
                  className="mx-auto h-auto w-full max-w-[550px] xs:max-w-[400px] sm:max-w-[500px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Floating iPad */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute -left-2 top-[-60px] xs:top-[-20px] w-[120px] sm:left-[-30px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
            >
              <div className="rounded-3xl border border-white/20 bg-white/15 p-3 shadow-xl backdrop-blur-md">
                <Image
                  src={image1}
                  alt="Tablet preview"
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>
            </motion.div>

            {/* Floating note */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: -30, rotate: 8 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -6 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="absolute bottom-[-20px] right-0 w-[80px] sm:right-[-10px] xs:w-[100px] md:w-[120px]"
            >
              <div className="rounded-2xl border border-white/20 bg-white/15 p-3 shadow-xl backdrop-blur-md">
                <Image
                  src={image3}
                  alt="Notebook preview"
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>
            </motion.div>

            {/* Small floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute left-[150px] xs:left-1/2 top-[2%] xs:top-[8%] -translate-x-1/2 rounded-full border border-white/20 bg-white/15 px-1 xs:px-4 py-1 xs:py-2 text-ss font-semibold text-white shadow-lg backdrop-blur-md sm:text-sm text-center"
            >
              Premium print solutions
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Banner