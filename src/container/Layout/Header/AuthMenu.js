import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import './mystyle.css'

import { LOGIN_PAGE, REGISTRATION_PAGE, CART_PAGE } from 'settings/constant';

const AuthMenu = ({ className }) => {
  return (
    <Menu className={className}>
      <Menu.Item key="0">
        <NavLink to={LOGIN_PAGE}>Sign in</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to={REGISTRATION_PAGE}>Sign up</NavLink>
      </Menu.Item>
	  <Menu.Item key="3">
        <NavLink to={CART_PAGE}><svg id="cis-cart" viewBox="0 0 512 512">
  <polygon fill="var(--ci-primary-color, currentColor)" points="129.664 96 116.331 16 16 16 16 64 75.669 64 117 336 448 336 496 216 496 96 129.664 96" className="ci-primary"></polygon><circle cx="176" cy="432" r="64" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></circle><circle cx="400" cy="432" r="64" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></circle>
</svg><span className='badge badge-warning' id='lblCartCount'>{localStorage.getItem('itemsincart')}</span></NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default AuthMenu;
