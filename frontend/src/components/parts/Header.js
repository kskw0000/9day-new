import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'; // Add these
import '../styles/Header.css';
import logo from '../imgs/logo.png';

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // メニューの開閉を管理する新しい状態変数

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
    onSearch('');
  };

  // メニューの開閉を切り替える関数
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav>
        <div className="header-left">
          <div className="hamburger-menu" onClick={toggleMenu}>  {/* Click handler added here */}
            <FontAwesomeIcon icon={faBars} />
          </div>

          {isMenuOpen && (
            <div className="dropdown-menu">
              <Link to="/admin">管理ページへ</Link>
            </div>
          )}

          <Link to="/">
            <img src={logo} alt="Logo" className="header-logo" />
          </Link>
        </div>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchText} 
            onChange={handleSearch} 
          />
          <button className="search-button" type="submit">
            <FontAwesomeIcon icon={faSearch} /> 
          </button>
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
