import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import './stylemenu.css';
import {
  CART_PAGE,
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  AGENT_PROFILE_PAGE,
  PRICING_PLAN_PAGE,
} from 'settings/constant';

const MainMenu = ({ className }) => {
  var trues = localStorage.getItem("IsLoggedIn");
  var loginIn = Boolean(trues)
  if( loginIn === true){
  return (
    <Menu className={className}>
      <Menu.Item key="0">
        <NavLink exact to={`${HOME_PAGE}`}>
          Hotels
        </NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to={`${LISTING_POSTS_PAGE}`}>Listing</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to={`${AGENT_PROFILE_PAGE}`}>Agent</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={`${PRICING_PLAN_PAGE}`}>Pricing</NavLink>
      </Menu.Item>
      
      
    </Menu>
  );}else{
    return(
      <Menu className={className}>
      <Menu.Item key="0">
        <NavLink exact to={`${HOME_PAGE}`}>
          Hotels
        </NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to={`${LISTING_POSTS_PAGE}`}>Listing</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to={`${AGENT_PROFILE_PAGE}`}>Agent</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={`${PRICING_PLAN_PAGE}`}>Pricing</NavLink>
      </Menu.Item>
      </Menu>
    );
  }
};

export default MainMenu;
