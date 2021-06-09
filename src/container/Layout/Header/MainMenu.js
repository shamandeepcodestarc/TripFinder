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
      <Menu.Item>
      <NavLink to={CART_PAGE}><svg id="cis-cart" viewBox="0 0 512 512">
      <polygon fill="var(--ci-primary-color, currentColor)" points="129.664 96 116.331 16 16 16 16 64 75.669 64 117 336 448 336 496 216 496 96 129.664 96" className="ci-primary"></polygon><circle cx="176" cy="432" r="64" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></circle><circle cx="400" cy="432" r="64" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></circle>
      </svg><span className='badge badge-warning' id='cartcount'>{localStorage.getItem('itemsincart')}</span></NavLink>
     
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
