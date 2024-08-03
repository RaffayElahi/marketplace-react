import React from 'react'
import CartBag from './CartBag'
import CartCheckOut from './CartCheckOut'
function CartMechanism() {
  return (
    <div className='flex flex-col w-full h-auto lg:max-h-[85vh] p-5 lg:flex-row'>
      <CartBag/>
      <CartCheckOut/>
    </div>
  )
}

export default CartMechanism
