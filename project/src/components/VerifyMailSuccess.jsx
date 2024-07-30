import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/libs/ui/button';
function VerifyMailSuccess({email}) {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-10 p-6 h-[65vh] justify-center w-full">
            <div>
                <svg height="200" width="200" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M44 24V9H24H4V24V39H24" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M31 36L36 40L44 30" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 9L24 24L44 9" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <h2 className='text-6xl uppercase text-center font-[500] text-black'>Account verified</h2>
            <div className='w-full flex justify-center flex-col items-center'>
              <p className='text-2xl text-center font-[400] w-2/5 text-black'>Congragulations! Your email address <span className='font-semibold text-2xl'>{email}</span> has been verified.</p>
              <br/>
              <p className='text-2xl text-center font-[400] w-2/5 text-black'>Please login to your account to continue surfing our site.</p>
            </div>
            <div className='flex flex-col space-y-2 w-1/5'>
                <Button className='w-full h-10 text-lg uppercase' onClick={()=>{navigate('/login')}}>Login</Button>
            </div>
        </div>
  )
}

export default VerifyMailSuccess
