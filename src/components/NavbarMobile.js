import React from 'react';
import styled from 'styled-components';
import { FaHome, FaRegClock, FaSearch, FaUser } from 'react-icons/fa';

const NavbarContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    padding: 10px 0;
    box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
    z-index: 1000;
`;

const Logo = styled.img`
    width: 80px; // Default size for small devices
    @media (min-width: 768px) {
        width: 100px; // Larger size for tablets and above
    }
`;

const NavItem = styled.div`
  cursor: pointer;
`;

const NavbarMobile = () => {
    return (
        <NavbarContainer>
            <NavItem><a href="/"><FaHome size={24} /></a></NavItem>
            <NavItem><a href="/newest"><FaRegClock size={24} /></a></NavItem>
            <NavItem><a href='/search'><FaSearch size={24} /></a></NavItem>
            <NavItem><a href="/login"><FaUser size={24} /></a></NavItem>
        </NavbarContainer>
    );
};

export default NavbarMobile;