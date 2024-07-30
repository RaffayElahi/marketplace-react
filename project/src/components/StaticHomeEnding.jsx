import React from 'react'
import {Button} from "@/src/libs/ui/button"

function StaticHomeEnding() {
  return (
    <div className='grid grid-cols-2 grid-rows-1'>
      <div className='p-20 border-r border-black'>
        <img className='w-full h-full object-cover object-center' src='https://markaware.jp/cdn/shop/files/L1000182_rr_1200x1200_2400x2400_0da8b348-1bee-4a65-a760-e869b02af451_2400x2400.jpg?v=1638327946'/>
      </div>
      <div className='p-20 flex flex-col items-center gap-20'>
        
        <h1 className='text-5xl '>Discover the market of fashion at this site.</h1>
        <p className="text-balance text-center text-muted-foreground sm:text-left sm:text-2xl">
          Explore our fashion marketplace, where style meets variety. Discover the latest trends, timeless classics, and unique pieces to enhance your wardrobe. Our curated collections from top designers and emerging talents ensure you find something special. Enjoy a seamless shopping experience with easy navigation and secure payment options. Discover the market of fashion at this site and elevate your personal style.        </p>
        <Button  className="w-1/2 self-start">Shop</Button>
      </div>
    </div>
  )
}

export default StaticHomeEnding
