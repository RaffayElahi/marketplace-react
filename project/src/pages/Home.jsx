import React from 'react'
import MainHomeSection from '../components/MainHomeSection'
import SiteProducts from '../components/SiteProducts'
import StaticHomeEnding from '../components/StaticHomeEnding'

function Home() {
  return (
    <>
      <MainHomeSection/>
      <SiteProducts main={true}/>
      <StaticHomeEnding/>
    </>
  )
}

export default Home
