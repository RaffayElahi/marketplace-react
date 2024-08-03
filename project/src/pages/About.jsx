import React from 'react'

function About() {
  return (
    <div className='flex flex-col border-b border-black h-auto lg:h-[90vh] w-full lg:flex-row lg:border-b-0 lg:border-black'>
      <div className='h-1/2 w-full p-12 border-black border-b lg:h-full lg:w-1/2 lg:border-b-0 lg:border-r lg:p-0'>
        <img className='h-full w-full object-cover object-center' src='https://cdn.shopify.com/s/files/1/0562/3493/4421/files/ourstore.jpg?v=1626240819'/>
      </div>
      <div className='h-1/2 w-full p-12 flex flex-col gap-10 lg:h-full lg:w-1/2 lg:justify-end'>
        <h1 className='text-4xl tracking-wider text-left text-balance uppercase my-8 lg:tracking-normal lg:text-3xl'>Marketplace</h1>
        <p className='text-xl tracking-wide text-balance sm:text-3xl lg:tracking-normal lg:text-xl'>A brand that began with a designer searching the world for natural, sustainable materials. The fruits of his search were then combined with the superlative technologies of Japan to create refined and elegant garments for the discerning adult.</p>
        <p className='text-xl tracking-wide text-balance sm:text-3xl lg:tracking-normal lg:text-xl'>Debut: 2009 Spring & Summer Season</p>
        <p className='text-xl tracking-wide text-balance sm:text-3xl lg:tracking-normal lg:text-xl'>Designer: JD.</p>
      </div>
    </div>
  )

}
export default About
