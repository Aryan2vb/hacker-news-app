import React, { useState } from 'react';
import NotificationDisplay from "./NotificationDisplay"; // Assuming NotificationDisplay is a component you created for displaying notifications
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faArrowTrendUp, faBell } from '@fortawesome/free-solid-svg-icons';

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
    width: 10vw;
    max-width: 130px;
    min-width: 60px;
    margin-right: 10px;

    @media (max-width: 768px) {
        width: 15vw;
    }

    @media (max-width: 480px) {
        width: 20vw;
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
                <a href="https://www.ycombinator.com/" target="_blank" rel="noopener noreferrer">
                    <Logo src="y-comb.png" alt="Y Combinator Logo" />
                </a>

                <Banner><a href='/' className='text-orange-500'>Hacker News</a></Banner>

                <NavSection>
                    <NavItem><a href="/">Home <FontAwesomeIcon icon={faArrowTrendUp} /></a></NavItem>
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
                            <FontAwesomeIcon icon={faBell} onClick={toggleNotification} /> {/* Click handler for the bell icon */}
                        </NavItem>
                    </div>

                    <NavItem><a href="/login">Login <FontAwesomeIcon icon={faRightToBracket} /></a></NavItem>
                </NavSection>
            </NavbarContainer>

            {/* Pass the showNotification state to NotificationDisplay */}
            {showNotification && <NotificationDisplay />}
        </div>
    );
};

export default NavbarDesktop;