import React from 'react'
import {useContext} from 'react'
import { MyContext } from '../context/context'
import { loadStripe } from '@stripe/stripe-js';
import useAxiosPrivate from '../lib/AxiosPrivate'


function CartCheckOut() {
  const axiosPrivate = useAxiosPrivate();
  const {cost, cart} = useContext(MyContext)
  const processPayment = async() =>{
    const stripe = await loadStripe("pk_test_51PhdRkRoUFiBKOrcvpdtRJfsecqxFzui4ZOGBbaZxXYPF4DKz3BA7Z7WkTF7WqsFpu0JyJNcLl2YwGujy1imF1YJ00PLp6gc6i");
    const body = {
        products: cart
    };

    try {
        const response = await axiosPrivate.post("/api/checkout", body);
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
    <div className="flex h-[50vh] justify-center flex-col items-center border-b  border-black p-5 lg:h-auto lg:w-1/2 lg:mt-0 lg:border-y-0 lg:border-l lg:pb-0 lg:sticky lg:top-0">
      <h2 className="text-xl font-[500] md:text-2xl lg:text-3xl uppercase text-center mb-4">Order Summary</h2>
      <p className="text-2xl font-[500] md:text-3xl lg:text-4xl text-center uppercase mb-2">Subtotal: ${cost}</p>
      <p className="text-base md:text-lg lg:text-xl text-center mb-6">
        Shipping rates will be calculated at checkout
      </p>
      <div className="w-full flex justify-center">
        <button
          className="w-3/5 py-3 text-center rounded-xl text-lg md:text-xl lg:text-2xl lg:w-3/5  text-white bg-black hover:bg-gray-700"
          onClick={processPayment}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartCheckOut
