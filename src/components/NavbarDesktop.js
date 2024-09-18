import React, { useState } from 'react';
import styled from 'styled-components';

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
      <Banner><a href='/' className='text-orange-500'>Hacker News Client</a></Banner>
      <NavSection>
        <NavItem><a href="/">Home</a></NavItem>
        <NavItem><a href="/newest">Newest</a></NavItem>
        <form onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
          />
        </form>
        <NavItem><a href="/login">Login</a></NavItem>
      </NavSection>
    </NavbarContainer>
  );
};

export default NavbarDesktop