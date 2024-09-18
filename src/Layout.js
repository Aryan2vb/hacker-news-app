import { Outlet, Link } from "react-router-dom";
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import NavbarDesktop from './components/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile';
import HeaderMobile from './components/HeaderMobile'

const Layout = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  
  return (
    <>

      {isDesktop ? null : <HeaderMobile />}

      {isDesktop ? <NavbarDesktop /> : <NavbarMobile />}

      {isDesktop ? <div className="flex justify-center align-content"> <Outlet /> </div> : <Outlet />}
    </>
  )
};

export default Layout;