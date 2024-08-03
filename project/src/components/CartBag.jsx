import React, { useContext } from 'react';
import SingleMyCartProduct from './SingleMyCartProduct';
import { MyContext } from '../context/context';

function CartBag() {
  const { cart, updateQuantity, removeItem } = useContext(MyContext);

  return (
    <div className='flex flex-col w-full h-auto lg:w-1/2 '>
      {cart.length === 0 ? (
        <p className=''>No items in the cart</p>
      ) : (
        <>
          <div className='w-full h-[12-vh] flex p-3 items-center gap-4 border-b border-black'>
              <div className='flex items-center justify-center ' >
                <h2 className='text-2xl md:text-3xl text-centertext-black font-normal uppercase' >Your Cart</h2>
              </div>
            </div>
          <div className='max-h-full w-full lg:overflow-y-auto'>
            
            {cart.map((item, index) => (
              <SingleMyCartProduct item={item} key={index} num={index} updateQuantity={updateQuantity} removeItem={removeItem}/>
            ))}
          </div></>
        )}
      </div>
  );
}

export default CartBag;
