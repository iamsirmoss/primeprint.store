import React from 'react'

const TopNav = ({ isHome }: { isHome: boolean }) => {
  return (
    <div className={`w-full py-0.5 xl:py-3 flex justify-between items-center px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] 
      lll:px-[25%] ${isHome ? 'bg-blue-400' : 'bg-blue-400'} gap-4`}>
      <p className='text-white uppercase text-ss pl-7 hidden sm:block'>store#98118</p>
      <p className='text-white uppercase text-ss'>open until 7pm today</p>
      <p className='text-white uppercase text-ss'>206 771 0038</p>
    </div>
  )
}

export default TopNav
