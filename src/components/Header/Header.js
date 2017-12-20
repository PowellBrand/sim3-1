import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

import home_icon from '../../assets/home.png';
import search_icon from '../../assets/search.png';

export default function Header({ page, logout, history }) {
  
  return (
    <div className="Header__parent_container orange-gradient">
      <div className="Header__child_container">
        <div className="Header__child_left">
          <span className="Header__title open-sans-bold">Helo</span>

          <Link to="/">
            <img className="Header__home_img" src={ home_icon } alt="home" />
          </Link>
          
          <Link to="/search/1">
            <img className="Header__search_img" src={ search_icon } alt="search" />
          </Link>
        </div>

        <div className="Header__child_mid">
          <span className="Header__page open-sans">{ page }</span>
        </div>

        <div className="Header__child_right">
          <span onClick={ () => logout( history ) } className="Header__logout open-sans">Logout</span>
        </div>
      </div>
    </div>
  )
}