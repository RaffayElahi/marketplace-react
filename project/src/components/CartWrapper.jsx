import React from 'react'
import CartPageHeader from './CartPageHeader'
import CartMechanism from './CartMechanism'
import { MyContext } from '../context/context';
import { useContext } from 'react';
function CartWrapper() {
  const {cart} = useContext(MyContext)
  return (
    <div>
      <CartPageHeader/>
      {(cart.length===0)? 
      <div className='min-h-[60vh] flex justify-center items-center border-b border-black lg:border-b-0'>
        <h3 className='text-5xl text-center lg:text-left uppercase'>Your Cart is empty.</h3>
      </div>
      : <CartMechanism/>}
      
    </div>
  )
}

export default CartWrapper
