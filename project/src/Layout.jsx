import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function Layout() {
  return (
    <div className='grid grid-rows-[1fr_2fr_1fr] h-full w-full'>
      <Header />
      <Outlet />    
      <Footer />
    </div>
  );
}

export default Layout;
