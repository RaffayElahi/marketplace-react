import React, { useContext, useState, useEffect } from 'react';
import { Button } from "@/src/libs/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/src/libs/ui/sheet";
import { MyContext } from '../context/context';
import Carticon from './Carticon';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/src/libs/ui/use-toast";


function Cart({ header, product, Usersize, selectedColor, filterFunction }) {
  const { toast } = useToast();
  const { cart, addToCart, removeItem, updateQuantity, cost, errors, setError } = useContext(MyContext);
  const navigate = useNavigate() 


  useEffect(() => {
    if (errors.length > 0) {
        toast({
          title: "Not Enough Products in inventory",
          description: `${errors[0]}`,
          variant: "destructive"
        }); 
        setError([]); 
      }
    
  }, [errors, toast]);

  const handler = () => {
    
    console.log(filterFunction(product, selectedColor, Usersize))
    addToCart(filterFunction(product, selectedColor, Usersize));
  };

  const totalQuantity = cart.reduce((total, product) => total + product[2], 0);
  console.log(cart)
  return (
    <Sheet>
      <SheetTrigger asChild>
        {header ? (
          <Button variant="outline" className='h-10 w-10 rounded-full flex justify-center items-center border border-black'>
            {totalQuantity}
          </Button>
        ) : (
          <Button className="w-full text-lg tracking-wider uppercase h-12 rounded-[2rem]" onClick={handler}>Add to Cart</Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[80%] overflow-y-auto">
          {cart.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            <div className=''>
              {cart.map((item, index) => (
                <Carticon key={index} num={index} item={item} removeItem={removeItem} updateQuantity={updateQuantity}></Carticon>
              ))}
            </div>
          )}
        </div>
        <div className='flex py-5'>
            <h2 className="uppercase font-medium text-2xl">Total Price</h2>
            <h2 className="uppercase font-medium ml-auto text-2xl">${cost}</h2>
          </div>
        <SheetFooter className='p-5'>
          
          <SheetClose asChild>
            <Button className="w-full uppercase font-medium text-lg rounded-xl" onClick={()=>{navigate('/cart')}} type="submit">Continue to Cart</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;