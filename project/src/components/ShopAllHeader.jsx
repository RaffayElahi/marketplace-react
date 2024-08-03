import React from 'react'
import DropdownMenuBoarding from './DropdownMenuBoarding'

function ShopAllHeader() {
  return (
    <div className='h-[12vh] w-full flex border-black border-b lg:grid lg:grid-cols-[2fr_1fr]'>
        <div className='w-1/2 h-full flex p-10 items-center'>
            <h2 className="text-black text-2xl lg:text-xl ">Shop All</h2>
        </div>
        <div className='w-1/2 h-full flex p-5 border-l border-black items-center'>
            <DropdownMenuBoarding />
        </div>
      
    </div>
  )
}

export default ShopAllHeader
