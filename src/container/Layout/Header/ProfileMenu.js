import React, { useContext, useState, useRef } from 'react';
import { Menu } from 'antd';
import useOnClickOutside from 'library/hooks/useOnClickOutside';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { AuthContext } from 'context/AuthProvider';
import './stylemenu.css'
import {
  AGENT_PROFILE_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE,
  ADD_HOTEL_PAGE,
  CART_PAGE,
} from 'settings/constant';

const ProfileMenu = ({ avatar, history }) => {
  const { logOut } = useContext(AuthContext);
  const [state, setState] = useState(false);
  const handleDropdown = () => {
    setState(!state);
  };
  const closeDropdown = () => {
    setState(false);
  };
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setState(false));
  function handleLogout() {
    logOut();
    history.push('/');
  }

  return (
    <>
    <div className="avatar-dropdown" ref={dropdownRef}>
    
      <div className="dropdown-handler" onClick={handleDropdown}>
        {avatar}
        
      </div>
    
      <div className="dropdown-handler" onClick={handleDropdown}>
      <Link className="CartMenu" to="/Cart">Add To Cart</Link>
      </div>

      <Menu className={`dropdown-menu ${state ? 'active' : 'hide'}`}>
        <Menu.Item onClick={closeDropdown} key="0">
          <NavLink to={AGENT_PROFILE_PAGE}>View Profile</NavLink>
        </Menu.Item>
        <Menu.Item onClick={closeDropdown} key="1">
          <NavLink to={ADD_HOTEL_PAGE}>Add Hotel</NavLink>
        </Menu.Item>
        <Menu.Item onClick={closeDropdown} key="2">
          <NavLink to={AGENT_ACCOUNT_SETTINGS_PAGE}>Account Settings</NavLink>
        </Menu.Item>
        <Menu.Item onClick={closeDropdown} key="3">
          <NavLink to={CART_PAGE}>Add To Cart</NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <button onClick={handleLogout}>Log Out</button>
        </Menu.Item>
      </Menu>
    </div>
    </>
  );
};

export default withRouter(ProfileMenu);
