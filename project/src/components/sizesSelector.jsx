import React from 'react'

function SizesSelector({size, quantity, setSize, index, UserSize}) {
    const handleClick = (s) => {
        setSize(s)
    }
  return (
    <>
        <div onClick={()=>handleClick(size)} className={(size===UserSize)?
            `w-9 h-9 border cursor-pointer  border-black flex rounded-full justify-center items-center relative`:
            `w-9 h-9 border cursor-pointer  border-gray-400 flex rounded-full justify-center items-center relative `}>
            <div className='tex-xl uppercase'>{size}</div>
        </div>
        {/* <span className='uppercase text-sm text-left'>Remaining left: {quantity}</span> */}
    </>
  )
}

export default SizesSelector
