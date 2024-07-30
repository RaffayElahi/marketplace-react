import React from 'react'
import SingleProduct from './SingleProduct'
import axiosConfig from '../lib/axiosConfig'
import { useQuery } from 'react-query'
function SiteProducts() {
  const fetchProducts = async () => {
    const { data } = await axiosConfig.get('/api/product/home');
    console.log(data)
    return data;
  };
  const { data, error, isLoading } = useQuery('products', fetchProducts, {
    staleTime: 10 * 60 * 1000,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  console.log(data)
  return (
      <div className='grid grid-cols-4 h-auto w-full  auto-rows-[850px] px-5  '>
        {
          data.map(product=>(
            <SingleProduct name={product.name} mainImage={product.mainImage}
             price={product.variants[0].price} variants={product.variants}
             productCode={product.productCode} className='border-b-0'
             />
          ))
        }
      </div>
  )
}

export default SiteProducts
