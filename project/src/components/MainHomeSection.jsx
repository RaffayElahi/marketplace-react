import React from 'react'


function MainHomeSection() {
  return (
    <div className='h-mainPortionheight w-full flex border-b border-black'>
      <div className='w-1/2 bg-white h-full px-10 flex items-end'>
        <div className='w-full h-1/3 flex flex-col justify-evenly'>
            <h1 className='font-display text-5xl'>Organic Wool Jacket</h1>
            <button className='font-display text-2xl w-fit px-10 py-2 rounded-xl border border-black'>Shop</button>
        </div>
      </div>
      <div className='w-1/2  h-full'>
        <img className='object-cover w-full h-full object-center' src="https://markaware.jp/cdn/shop/files/20240524_87349_2400x2400.jpg?v=1720094591"/>
      </div>
    </div>
  )
}

export default MainHomeSection
