import React from 'react'
import {Button} from "@/src/libs/ui/button"

function StaticHomeEnding() {
  return (
    <div className='flex flex-col border-b lg:border-b-0 border-black lg:grid lg:grid-cols-2 lg:grid-rows-1'>
      <div className=' border-b lg:border-b-0 p-12 md:p-20 border-r border-black'>
        <img className='w-full h-full object-cover object-center' src='https://markaware.jp/cdn/shop/files/L1000182_rr_1200x1200_2400x2400_0da8b348-1bee-4a65-a760-e869b02af451_2400x2400.jpg?v=1638327946'/>
      </div>
      <div className='p-12 md:p-20 flex flex-col items-center gap-20'>
        
        <h1 className='text-6xl lg:text-5xl '>Discover the market of fashion at this site.</h1>
        <p className="text-xl text-muted-foreground sm:text-left sm:text-2xl">
          Explore our fashion marketplace, where style meets variety. Discover the latest trends, timeless classics, and unique pieces to enhance your wardrobe. Our curated collections from top designers and emerging talents ensure you find something special. Enjoy a seamless shopping experience with easy navigation and secure payment options. Discover the market of fashion at this site and elevate your personal style.        </p>
        <Button  className="text-lg w-1/2 self-start">Shop</Button>
      </div>
    </div>
  )
}

export default StaticHomeEnding
