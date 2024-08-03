import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
function NotFound() {
  return (
    <>
      <Header/> 
      <div className='w-full min-h-[90vh] flex items-center justify-center border-b border-black lg:border-b-0'>
        <h1 className='text-5xl text-black font-semibold tracking-tight uppercase'>Page Not-Found</h1>
      </div>
      <Footer/>
    </>
  )
}

export default NotFound
