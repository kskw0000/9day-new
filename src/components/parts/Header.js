import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from './imgs/logo.png';

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <header>
      <nav>
        <div className="header-left">
          <div className="hamburger-menu">
            <FontAwesomeIcon icon={faBars} />
          </div>
          <Link to="/">
            <img src={logo} alt="Logo" className="header-logo" />
          </Link>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search" value={searchText} onChange={handleSearch} />
        </div>

        <div className="header-right">
          <Link to="/account">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
