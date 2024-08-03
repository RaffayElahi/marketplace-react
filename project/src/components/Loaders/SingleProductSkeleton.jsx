import {
  Skeleton
} from "@/src/libs/ui/skeleton"

export default function SingleProductSkeleton() {
  return (
    <div className='w-full  h-[800px] p-5 flex flex-col border-r border-black'>
      <div className="h-4/5 w-full ">
        <Skeleton className='w-full h-full rounded-xl'/>
      </div>
      <div className='flex items-center justify-between mt-3'>
        <Skeleton className='h-5 rounded-xl w-2/5'/>
        <Skeleton className='h-5 rounded-xl w-1/5'/>
      </div>
      <div className="flex flex-col mt-3 gap-1 space-y-4">
        <Skeleton className='h-4 w-full'/>
      </div>
      <div className='flex mt-3 items-center justify-between'>
        <Skeleton className='w-1/2 h-4'/>
        <div className='flex gap-2'>
          <Skeleton className='size-8 rounded-full'/>
          <Skeleton className='size-8 rounded-full'/>
        </div>
      </div>
    </div>
  );
}
