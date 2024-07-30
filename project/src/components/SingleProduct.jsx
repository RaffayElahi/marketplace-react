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
  const [choosedColor, setChoosedColor] = useState(reqColors[0])
  console.log(reqColors)
  return (
    
      <div className={`w-full border-r border-l border-b border-black p-5 first:border-r-0 odd:border-r-0 odd:border-l-0 last:border-r-0 ${className}`}>
        <Link to={`/products/${productCode}`}>
            <div className='h-4/5 w-full '>
                <img src={`/upload/${mainImage}`}/>
            </div>
            <div className='flex flex-col mt-2 gap-1'>
                <div className='w-full flex justify-between'>
                    <span className='uppercase text-sm text-left'>Marketplace</span>
                    <span className='uppercase text-base text-right font-base'>{`$${price}`}</span>
                </div>
                <div>
                  <p className='text-xl'>{name}</p>
                  <br/>
                  <div className='w-full flex gap-2'>
                    <span className='uppercase text-sm text-left'>Colors: </span>
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
