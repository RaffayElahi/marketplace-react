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
            <Cart header={true}/>
        </div>
    </header>
  )
}

export default Header
