import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function Layout() {
  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <Header />
      <Outlet />    
      <Footer />
    </>
  );
}

export default Layout;
