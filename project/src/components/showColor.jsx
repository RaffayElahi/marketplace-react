import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/src/libs/ui/tooltip"

import {
    Package,
} from "lucide-react"

import { Link } from 'react-router-dom'
function ShowColor({color, index, selected, setSelected}) {
  console.log((color===selected))
  return (
    <Tooltip >
            <TooltipTrigger asChild>
              <div
              onClick={()=>{setSelected(color)}}
              className={(color===selected)?`w-7 cursor-pointer h-7 rounded-full border border-black flex items-center justify-center`
                :`w-7 cursor-pointer h-7 rounded-full hover:border hover:border-gray-400 flex items-center justify-center`
              }>
                <div className={`w-5 h-5 border rounded-full`} style={{background: `${color}`}}></div>
              </div>
            </TooltipTrigger>
            <TooltipContent className='bg-black text-white capitalize'>{color}</TooltipContent>
    </Tooltip>
  )
}

export default ShowColor
