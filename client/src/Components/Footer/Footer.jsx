import React from 'react'
import './style.scss';
import Logo from '../../imgs/logo.svg'
const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="logo" />
      <span> 
      Made with xiang and <b>React.js</b>.
      </span>
    </footer>
  )
}

export default Footer;