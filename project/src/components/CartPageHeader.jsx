import React from 'react'
import { useNavigate } from 'react-router-dom'
function CartPageHeader() {
  const navigate = useNavigate()
  
  const navigater = () =>{
    navigate('/shop')
  }
  return (
    <div className='w-full h-[12-vh] flex p-4 items-center gap-4 border-b border-black'>
      <div className='flex items-center justify-center cursor-pointer' onClick={navigater}>
        <svg width="20px" height="20px" viewBox="-102.4 -102.4 1228.80 1228.80" className="icon mt-[2px]" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.01024"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"></path></g></svg>
        <h2 className='text-xl text-black font-normal uppercase' >Continue to shopping</h2>
      </div>
    </div>
  )
}

export default CartPageHeader
