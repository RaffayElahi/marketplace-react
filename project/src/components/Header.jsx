import React, { useContext, useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap';
import { Link } from 'react-router-dom'
import axiosConfig from '../lib/axiosConfig'
import Cart from './Cart';
import { MyContext } from '../context/context';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/libs/ui/hover-card"
import {
  Button
} from "@/src/libs/ui/button"



function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "100vh",
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        y: 20,
        duration: 0.1,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const {auth, setAuth} = useContext(MyContext)
  const logout = async() =>{
    setIsOpen(false)
    setAuth({})
    await axiosConfig.post('/api/auth/logout')
  }
  return (
    <>
      <header className= 'w-full h-heading sticky px-4 md:px-10 flex z-10 bg-white top-0 left-0 items-center justify-between lg:px-20 border-b border-black'>
          <nav className='hidden lg:flex h-full items-center gap-x-11'>
              <Link className='text-xl' to='/shop'>Shop</Link>
              <Link className='text-xl' to='/about'>About</Link>
              {(auth.username)&&<Link className='text-xl' to='/cart'>Cart</Link>}
          </nav>
          <div className='hidden lg:block'>
            <Link to='/'><img src='/marketplace.svg'/></Link>
          </div>
          <div className='block lg:hidden'>
            <Link to='/'><img src='/m..svg'/></Link>
          </div>
          <div className='hidden lg:flex h-full items-center gap-x-11'>
              {(auth.username)? 
              <HoverCard>
                <HoverCardTrigger asChild>
                  <p className='text-xl cursor-pointer'>@{auth.username}</p>
                </HoverCardTrigger>
                <HoverCardContent className='w-80 mt-3'>
                  <div className="space-y-1">
                    <h4 className="text-lg font-normal">Welcome @{auth.username}</h4>
                    <Button className='uppercase w-full' onClick={logout}>Log out</Button>
                  </div>
                </HoverCardContent>
              </HoverCard> : <Link className='text-xl' to='/login'>Log in</Link>}
              <Cart header={true}/>
          </div>
          <div className='flex gap-3 lg:hidden'>
            <Cart header={true}/>
            <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none"
            viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
            onClick={handleClick}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )} 
            </svg>
          </div>
      </header>
      <div
        ref={contentRef}
        className={`fixed z-10 w-full h-0 p-10  opacity-0 bg-white border border-gray-200 shadow-lg ${
          isOpen ? 'block opacity-100 translate-y-0' : ' hidden opacity-0 translate-y-4'
        } transition-all duration-300 ease-out`}
      >
        <div className='flex flex-col h-1/2 w-full space-y-5'>
          <Link className='text-4xl  md:text-7xl uppercase' to='/' onClick={()=> setIsOpen(false)}>Home</Link>
          <Link className='text-4xl  md:text-7xl uppercase' to='/shop' onClick={()=> setIsOpen(false)}>Shop</Link>
          <Link className='text-4xl  md:text-7xl uppercase' to='/about' onClick={()=> setIsOpen(false)}>About</Link>
          {(auth.username)&&<Link className='text-xl' to='/cart' onClick={()=> setIsOpen(false)}>Cart</Link>}
        </div>
        <div className='h-1/3 w-full flex flex-col justify-end space-y-5'>
          {(auth.username)?
          <>
            <p className='text-2xl md:text-5xl uppercase'>Welcome @{auth.username}</p>
            <p className='text-2xl md:text-5xl uppercase' onClick={()=> logout()}>Log Out</p>
          </>
          :
          <Link className='text-4xl md:text-7xl uppercase' to='/login' onClick={()=> setIsOpen(false)}>Login</Link>}
        </div>
      </div>
    </>
  )
}

export default Header
