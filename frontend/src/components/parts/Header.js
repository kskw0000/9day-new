import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'; // remove faSearch, faTimes
import '../styles/Header.css';
import logo from '../imgs/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // メニューの開閉を管理する新しい状態変数

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
