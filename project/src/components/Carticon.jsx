import React,{useContext} from 'react';
import axiosConfig from '../lib/axiosConfig'
import { useQuery } from 'react-query';
import { MyContext } from '../context/context'

const fetchProductAndVariant = async (productCode, variantId) => {
  const response = await axiosConfig.get(`/api/product/product/${productCode}/variant/${variantId}`);
  return response.data;
};

function Carticon({ item, num, removeItem, updateQuantity }) {
  const {cart} = useContext(MyContext)
  console.log(item)
  const { data, error, isLoading } = useQuery(
    ['productAndVariant', item[1], item[0]],
    () => fetchProductAndVariant(item[1], item[0]),
    {

      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    }
  );
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data)
  const varaint = data.variant.filter(va => va._id === item[0])
  console.log(varaint)
  const increaseQuantity = () => {
    updateQuantity(cart[num][0], cart[num][2]+1);
  };

  const decreaseQuantity = () => {
    
    updateQuantity(cart[num][0], cart[num][2]-1);
    
  };
  console.log(num)
  return (
    <div className='flex w-full h-[250px] py-3 gap-5 pr-8 border-b border-gray-300'>
      <div className='w-[40%] h-full'>
        <img src={`/upload/${data.product.mainImage}`} className='w-full h-full object-cover'/>
      </div>
      <div className='flex flex-col w-[60%] h-full gap-3'>
        <h2 className='font-light text-black text-base tracking-tight leading-snug uppercase'>{data.product.name}</h2>
        <div className='flex justify-between'>
          <div className='flex gap-4 items-center'>
            <div className='w-5 h-5 rounded-full' style={{background: `${varaint[0].color}`}}></div>
            <h2 className='font-light text-black text-base tracking-tight leading-snug uppercase'>{varaint[0].color}</h2>
          </div>
          <h2 className='font-[400] text-black  text-base tracking-tight leading-snug uppercase'>${varaint[0].price}</h2>
        </div>
        <div className='flex gap-4 items-center'>
          <h2 className='font-[400] text-black  text-base tracking-tight leading-snug uppercase'>Size:</h2>
          <div className='size-9 rounded-full flex items-center justify-center border border-gray-600 group group-hover:border-black'>
            <h2 className='font-light text-black text-base tracking-tight leading-snug uppercase group-hover:font-[400]'>{varaint[0].size}</h2>
          </div>

        </div>
        <div className='flex items-center gap-2'>
          <button className='text-xl w-10 h-10' onClick={decreaseQuantity}>-</button>
          <p>{cart[num][2]}</p>
          <button className='text-xl w-10 h-10' onClick={increaseQuantity}>+</button>
        </div>
        <p onClick={() => removeItem(num)} className='cursor-pointer font-light text-sm uppercase'>Remove</p>
      </div>
    </div>
  );
}

export default Carticon;
