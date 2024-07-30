import React from 'react'

function Footer() {
  return (
    <footer className= "h-footer w-full grid grid-cols-[1fr_2fr_1fr] auto-rows-fr border-y border-black ">
      <div className=" border-r border-black flex justify-center items-center">
        <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" viewBox="0, 0, 400,400"><g id="svgg"><path id="path0" d="M205.572 185.401 C 199.572 191.801,194.569 197.037,194.455 197.037 C 194.341 197.037,191.425 194.079,187.975 190.463 C 184.525 186.847,179.569 181.660,176.962 178.935 L 172.222 173.981 172.222 196.064 L 172.222 218.148 175.185 218.148 L 178.148 218.148 178.148 204.047 C 178.148 192.864,178.245 189.970,178.616 190.065 C 178.874 190.131,182.499 193.685,186.672 197.963 C 190.845 202.241,194.350 205.785,194.461 205.839 C 194.572 205.893,198.046 202.351,202.183 197.968 C 206.319 193.586,209.853 190.000,210.037 190.000 C 210.229 190.000,210.370 195.976,210.370 204.074 L 210.370 218.148 213.519 218.148 L 216.667 218.148 216.667 195.926 C 216.667 183.704,216.625 173.717,216.574 173.734 C 216.523 173.751,211.572 179.001,205.572 185.401 M229.380 211.008 C 228.340 211.198,226.794 212.749,226.592 213.805 C 225.867 217.597,230.248 220.065,232.934 217.379 C 235.623 214.690,233.181 210.312,229.380 211.008 " stroke="none" fill="#141414" fill-rule="evenodd"></path><path id="path1" d="" stroke="none" fill="#040404" fill-rule="evenodd"></path><path id="path2" d="" stroke="none" fill="#0c0c0c" fill-rule="evenodd"></path><path id="path3" d="" stroke="none" fill="#14180c" fill-rule="evenodd"></path><path id="path4" d="" stroke="none" fill="#080410" fill-rule="evenodd"></path></g></svg>
      </div>
      <div className=" border-r border-black flex items-center justify-center px-10 ">
        <ul className='grid grid-cols-4 grid-rows-2 w-full grid-flow-col'>
          <li className='text-black font-display text-lg'>About</li>
          <li className='text-black font-display text-lg'>Shop</li>
          <li className='text-black font-display text-lg'>Conditions</li>
          <li className='text-black font-display text-lg'>Privacy Policy</li>
          <li className='text-black font-display text-lg'>Email</li>
          <li className='text-black font-display text-lg'>Instagram</li>
          <li className='text-black font-display text-lg'>Shopping guide</li>
          <li className='text-black font-display text-lg'>Customer policy</li>
          <li></li>
        </ul>
      </div>
      <div className="  border-black flex justify-start items-center px-10">
        <div className='grid grid-rows-2 '>
          <p className='text-black font-display text-lg'>Site by <span className='underline cursor-pointer'>Raffay Elahi</span></p>
          <p className='text-black font-display text-lg'>All rights resereved.</p>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
