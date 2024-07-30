import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart';


function Header() {

  return (
    <header className='w-full h-heading sticky flex z-10 bg-white top-0 left-0 items-center justify-between px-20 border-b border-black'>
        <nav className='flex h-full items-center gap-x-11'>
            <Link className='text-xl' to='/shop'>Shop</Link>
            <Link className='text-xl' to='/about'>About</Link>
        </nav>
        <div className='flex h-full items-center gap-x-11'>
            <Link className='text-xl' to='/login'>Log in</Link>
            <div >
                <svg fill="#000000" width="30px" height="30px" viewBox="0 0 32.00 32.00" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00032"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.3439999999999999"></g><g id="SVGRepo_iconCarrier"> <title>search</title> <path d="M30.885 29.115l-10.103-10.103c1.538-1.911 2.468-4.368 2.468-7.042 0-6.229-5.050-11.279-11.279-11.279s-11.279 5.050-11.279 11.279c0 6.229 5.050 11.279 11.279 11.279 2.674 0 5.13-0.93 7.063-2.485l-0.022 0.017 10.103 10.103c0.226 0.226 0.539 0.366 0.884 0.366 0.691 0 1.251-0.56 1.251-1.251 0-0.345-0.14-0.658-0.366-0.884l0 0zM3.25 12c0-4.832 3.918-8.75 8.75-8.75s8.75 3.918 8.75 8.75c0 4.832-3.918 8.75-8.75 8.75v0c-4.83-0.005-8.745-3.92-8.75-8.749v-0.001z"></path> </g></svg>
            </div>
            <Cart header={true}/>
        </div>
    </header>
  )
}

export default Header
