import { Skeleton } from "@/src/libs/ui/skeleton";

export default function ProductDetailCoverLoader() {
    return (
        <div className='w-full border-b border-black h-auto flex flex-col p-5 lg:flex-row lg:gap-8'>
            <div className='h-[40vh] lg:h-[90vh] w-full lg:w-1/2 relative'>
                <Skeleton className='w-full h-full rounded-xl' />
            </div>
            <div className='flex flex-col p-4 gap-4 lg:gap-6 lg:p-6 lg:pl-8 lg:pt-8 lg:pr-8 lg:w-1/2'>
                <div className='space-y-2'>
                    <Skeleton className='h-5 w-full rounded-xl' />
                    <Skeleton className='h-5 w-3/4 rounded-xl' />
                </div>
                <div>
                    <Skeleton className='h-5 w-3/4 rounded-xl' />
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <div className='w-full flex gap-4 items-center'>
                        <Skeleton className='h-5 w-2/5 rounded-xl' />
                        <div className='flex gap-3'>
                            <Skeleton className='w-7 h-7 rounded-full' />
                            <Skeleton className='w-7 h-7 rounded-full' />
                            <Skeleton className='w-7 h-7 rounded-full' />
                        </div>
                    </div>
                    <div className='w-full flex gap-4 items-center'>
                        <Skeleton className='h-5 w-3/5 rounded-xl' />
                        <div className='flex gap-3'>
                            <Skeleton className='w-7 h-7 rounded-full' />
                            <Skeleton className='w-7 h-7 rounded-full' />
                        </div>
                    </div>
                </div>
                <div className='p-4 flex justify-center items-center mt-6 lg:mt-8'>
                    <Skeleton className='h-8 w-full lg:w-4/5 rounded-xl' />
                </div>
                <div className='mt-6 lg:mt-8 p-4 flex flex-col gap-4'>
                    <Skeleton className='h-16 w-full rounded-xl' />
                    <Skeleton className='h-16 w-full rounded-xl' />
                    <Skeleton className='h-16 w-full rounded-xl' />
                    <Skeleton className='h-16 w-full rounded-xl' />
                </div>
            </div>
        </div>
    );
}