import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'; // Add these
import '../styles/Footer.css';
import logo from '../imgs/logo.png';

const Footer = () => {
  return (
    <footer>
      <p>© 2023 Proreach,inc. All rights reserved.</p>
      {/* 他の情報やリンク */}
    </footer>
  );
};

export default Footer;
