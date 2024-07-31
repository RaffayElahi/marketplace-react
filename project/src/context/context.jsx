import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axiosConfig from '../lib/axiosConfig'; // Import axiosConfig

export const MyContext = createContext();

const fetchCartData = async (cart) => {
  const response = await axiosConfig.get('/api/product/validate-cart', { params: { cart: JSON.stringify(cart) } });
  return response.data;
};

const MyProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [signupData, setSignupData] = useState(null)
  const [errors, setError] = useState([])
  const [cost, setCost] = useState()

  const { data: cartData, refetch } = useQuery(['cartData', cart], () => fetchCartData(cart), {
    enabled: !!cart.length,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
  useEffect(()=>{
    console.log(auth)
  }, [auth])
  useEffect(() => {
    if (cartData) {
      setCart(cartData.validatedCart)
      setCost(cartData.totalCost)

      if (!cartData.validationResult.isValid){
        setError(cartData.validationResult.errors)
        console.log(errors)
    }}

  }, [cartData, cart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    refetch(); 
  }, [cart, refetch]);

  const deleteCart = () =>{
    setCart([])
  }

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.some((item) => item[0] === product.id);
      if (productExists) {
        return prevCart.map((item) =>
          item[0] === product.id
            ? [item[0], item[1], item[2] + 1]
            : item
        );
      } else {
        return [...prevCart, [product.id, product.productCode, 1]];
      }
    });
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item[0] === id ? [item[0], item[1], newQuantity] : item
      )
    );
  };

  return (
    <MyContext.Provider value={{ cart, addToCart, removeItem, updateQuantity, cost, auth, setAuth,setError, errors, signupData, setSignupData, deleteCart}}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;