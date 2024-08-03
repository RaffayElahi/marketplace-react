import SingleProductSkeleton from './SingleProductSkeleton'
export default function ProductRow(){
    return(
        <div className='flex flex-col  md:grid md:grid-cols-2 md:auto-rows-[600px] lg:p-0 lg:grid lg:grid-cols-4 lg:auto-rows-[800px] border-b border-black'>
            <SingleProductSkeleton/>
            <SingleProductSkeleton/>
            <SingleProductSkeleton/>
            <SingleProductSkeleton/>
        </div>
        
    )
} 