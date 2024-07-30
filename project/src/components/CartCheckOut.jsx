import React from 'react'
import {useContext} from 'react'
import { MyContext } from '../context/context'
import { loadStripe } from '@stripe/stripe-js';
import axiosConfig from '../lib/axiosConfig'


function CartCheckOut() {
  const {cost, cart} = useContext(MyContext)
  const processPayment = async() =>{
    const stripe = await loadStripe("pk_test_51PhdRkRoUFiBKOrcvpdtRJfsecqxFzui4ZOGBbaZxXYPF4DKz3BA7Z7WkTF7WqsFpu0JyJNcLl2YwGujy1imF1YJ00PLp6gc6i");
    const body = {
        products: cart
    };

    try {

        const response = await axiosConfig.post("/api/checkout", body);
        const session = response.data;

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
    }
  }

  return (
    <>
      <div className='flex justify-center mt-5 border-y gap-3 flex-col border-black p-5 lg:w-1/2 lg:mt-0 lg:border-y-0 lg:border-l lg:pb-0 lg:sticky'>
        <h2 className='text-center text-2xl uppercase'>Order Summary</h2>
        <p className='text-4xl text-center uppercase'>Subtotal: ${cost}</p>
        <p className='text-center text-xl'>Shipping rates would be calculated at the checkout</p>
        <div className='p-10'>
        <button className='w-full py-3 text-center rounded-3xl h-20 text-2xl  text-white bg-black hover:bg-gray-700' onClick={processPayment}>Proceed to Checkout</button>
      </div>
      </div>
      
    </>
  )
}

export default CartCheckOut
