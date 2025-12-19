import React from 'react'

const TopNav = ({ isHome }: { isHome: boolean }) => {
  return (
    <div className={`w-full py-1 flex justify-between items-center px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] 
      lll:px-[25%] ${isHome ? 'bg-blue-400' : 'bg-black'}`}>
      <p className='text-white uppercase text-xs pl-7 hidden sm:block'>store#98118</p>
      <p className='text-white uppercase text-xs'>open until 7pm today</p>
      <p className='text-white uppercase text-xs'>206 771 0038</p>
    </div>
  )
}

export default TopNav
