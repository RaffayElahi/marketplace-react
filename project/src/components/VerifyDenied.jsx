
import { Button } from '@/src/libs/ui/button';
function VerifyDenied() {
  return (
    <div className="flex flex-col items-center gap-8 p-6 h-[65vh] justify-center w-full">
            <div>
                <svg viewBox="0 0 48 48" height="200" width="200" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M44 24V9H24H4V24V39H24" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M40 31L32 39" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M32 31L40 39" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 9L24 24L44 9" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <h2 className='text-6xl uppercase text-center font-[500] text-black'>Email verification link denied</h2>
            <p className='text-2xl text-center font-[400] w-2/5 text-black'>Looks like the email link provided has been expired. No worries we can send the link again.</p>
            <div className='flex flex-col space-y-2 w-1/5'>
                <Button className='w-full h-10 text-lg uppercase'>Resend verification link</Button>
            </div>
        </div>
  )
}

export default VerifyDenied