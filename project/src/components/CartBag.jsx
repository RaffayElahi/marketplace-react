import React, { useContext } from 'react';
import SingleMyCartProduct from './SingleMyCartProduct';
import { MyContext } from '../context/context';

function CartBag() {
  const { cart, updateQuantity, removeItem } = useContext(MyContext);
  console.log(cart);

  return (
    <div className='flex flex-col w-full h-auto lg:w-1/2 '>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div className='max-h-full w-full overflow-y-auto'>
          {cart.map((item, index) => (
            <SingleMyCartProduct item={item} key={index} num={index} updateQuantity={updateQuantity} removeItem={removeItem}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartBag;
