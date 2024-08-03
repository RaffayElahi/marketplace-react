import {
    Skeleton
  } from "@/src/libs/ui/skeleton"
export default function SingleMyCartLoader(){
    return(
        <div className='flex h-[27vh] py-5 px-5 w-full gap-4 border-b border-black'>
            <div className='w-[50%] h-full lg:w-48'>
                <Skeleton className='w-full h-full rounded-xl'/>
            </div>
            <div className='flex flex-col gap-3 h-full w-4/5 lg:ml-4'>
                <Skeleton className='h-5 rounded-xl w-full'/>
                <Skeleton className='h-5 rounded-xl w-2/5'/>
                <div className='flex gap-3'>
                    <Skeleton className=' h-5 rounded-xl w-1/5 '/>
                    <Skeleton className='size-6 rounded-full'/>
                    <Skeleton className='size-6 rounded-full'/>
                    <Skeleton className='size-6 rounded-full'/>
                </div>
                <Skeleton className='h-5 rounded-xl w-3/5 mt-2'/>
                <Skeleton className='w-3/5 h-6 self-center mt-10 rounded-xl'/>
            </div>
            
        </div>
    )
}