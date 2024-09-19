import React, { useState } from 'react';
import styled from 'styled-components';
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
  flex: 1;
  width: 10vw; /* Default size as 10% of the viewport width */
  max-width: 130px; /* Maximum width for larger screens */
  min-width: 60px; /* Minimum width for smaller screens */
  margin-right: 10px; /* Adds space between the image and the text */

  @media (max-width: 768px) {
    width: 15vw; /* Adjust size for tablets, 15% of viewport width */
  }

  @media (max-width: 480px) {
    width: 20vw; /* Adjust size for mobile, 20% of viewport width */
  }
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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.replace(`/search?q=${search}`);
  };

  return (
      <NavbarContainer>

        <a href="https://www.ycombinator.com/" target="_blank">
            <Logo src="y-comb.png" alt="Y Combinator Logo"/>
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
          <FontAwesomeIcon icon={faBell}/>
          <NavItem><a href="/login">Login <FontAwesomeIcon icon={faRightToBracket}/></a></NavItem>
        </NavSection>
      </NavbarContainer>
  );
};

export default NavbarDesktop