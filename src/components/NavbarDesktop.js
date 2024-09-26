import React, { useState } from 'react';
import styled from 'styled-components';
import NotificationDisplay from "./NotificationDisplay";
// import img from '../../public/img.png';

// Assuming NotificationDisplay is a component you created for displaying notifications

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket,faArrowTrendUp,faBell } from '@fortawesome/free-solid-svg-icons';
const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const Banner = styled.div`
  flex: 1;
  text-align: left;
  font-weight: bold;
`;
const Logo = styled.img`
    width: 50px; // Adjust to a visible size
    margin-right: 12px;
`;
const NavSection = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-around;
  align-items: center;
`;

const NavItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 5px;
  margin-left: 20px;
`;

const NavbarDesktop = () => {
  const [search, setSearch] = useState('');
  const [showNotification, setShowNotification] = useState(false); // State for notification display

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.replace(`/search?q=${search}`);


  };

    const toggleNotification = () => {
        setShowNotification(!showNotification); // Toggle the notification visibility
    };


    return (
        <div>
          <NavbarContainer>

            <a href="https://www.ycombinator.com/" >
                <Logo src="/logo.png" alt="Y Combinator Logo" />
            </a>


            <Banner><a href='/' className='text-orange-500'>Hacker News</a></Banner>
              <NavSection>
                  <NavItem><a href="/">Home <FontAwesomeIcon icon={faArrowTrendUp}/></a></NavItem>
                  <NavItem><a href="/newest">Newest</a></NavItem>
                  <form onSubmit={handleSubmit}>
                      <SearchInput
                          type="text"
                          placeholder="Search..."
                          value={search}
                          onChange={handleChange}
                      />
                  </form>
                  <div align="center">
                      <NavItem>
                          <FontAwesomeIcon icon={faBell}
                                           onClick={toggleNotification}/> {/* Click handler for the bell icon */}
                      </NavItem>
                  </div>
                  <NavItem><a href="/login">Login <FontAwesomeIcon icon={faRightToBracket}/></a></NavItem>
              </NavSection>
          </NavbarContainer>
        {showNotification && <NotificationDisplay />}
    </div>

);
};

export default NavbarDesktop