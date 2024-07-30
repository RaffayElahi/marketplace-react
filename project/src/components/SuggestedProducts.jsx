import React from "react"
import SingleProduct from './SingleProduct'
import SiteProducts from "./SiteProducts"
export default function SuggestedProducts(){
    return(
        <div className='h-auto w-full '>
            <div className='px-5 py-10 font-[500]  border-b border-black '>
                <h1 className="text-3xl uppercase text-left">Suggested Products</h1>
            </div>
            <SiteProducts/>
        </div>
    )
}