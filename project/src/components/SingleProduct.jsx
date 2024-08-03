import React, { useState } from 'react'
import ShowColor from './showColor'
import {
  TooltipProvider,
} from "@/src/libs/ui/tooltip"
import { Link } from 'react-router-dom'
function SingleProduct({className, name, mainImage, price, variants, productCode}) {
  const getUniqueColors = (variants) =>{
    let colors = variants.map(obj => obj.color)
    let uniqueColorsSet = new Set(colors)
    let uniqueColors = Array.from(uniqueColorsSet)
    return uniqueColors.map(v=> v.toLowerCase())
  }
  const reqColors = getUniqueColors(variants)

  return (
    
      <div className={`w-full  lg:border-r lg:border-l lg:border-b-0 border-black p-5 first:border-r-0 odd:border-r-0 odd:border-l-0 last:border-r-0 ${className}`}>
        <Link to={`/products/${productCode}`}>
            <div className='h-auto w-full '>
                <img src={`/upload/${mainImage}`}/>
            </div>
            <div className='flex flex-col mt-2 gap-5 lg:gap-1'>
                <div className='w-full flex justify-between'>
                    <span className='uppercase text-xl tracking-wide lg:text-sm text-left'>Marketplace</span>
                    <span className='uppercase text-xl lg:text-base text-right font-base'>{`$${price}`}</span>
                </div>
                <div>
                  <p className='text-3xl lg:text-xl'>{name}</p>
                  <br/>
                  <div className='w-full flex gap-2'>
                    <span className='uppercase text-xl lg:text-sm text-left'>Colors: </span>
                    <TooltipProvider>
                    {
                      reqColors.map((color, index) => (
                          <ShowColor color={color} key={index} />
                      ))
                    }
                    </TooltipProvider>
                  </div>
                </div>
                
          </div>
        </Link>
      </div>
    
  )
}

export default SingleProduct
