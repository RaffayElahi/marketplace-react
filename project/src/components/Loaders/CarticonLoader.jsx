import {
    Skeleton
  } from "@/src/libs/ui/skeleton"
export default function CarticonLoader(){
    return(
        <div className='flex w-full h-[250px] py-3 gap-5 pr-8 '>
            <Skeleton className='w-[50%] h-full rounded-xl'/>
            <div className='flex flex-col w-[60%] h-full gap-1'>
                <Skeleton  className='w-full h-4 mb-1 rounded-xl'/>
                <Skeleton  className='w-2/5 h-4 rounded-xl'/>
                <Skeleton className='mt-5 w-3/5 h-4 rounded-xl'/>
                <Skeleton className='w-full h-4 rounded-xl self-end'/>
            </div>
        </div>
    )
}