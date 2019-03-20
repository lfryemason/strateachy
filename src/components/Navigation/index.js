import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import SignOutButton from '../SignOut';

import { AuthUserContext } from '../Session';

import logo_text from '../../res/Strateachy_logo_text.png';

import './index.css'

const Navigation = () => (
        <div>
            <AuthUserContext.Consumer >
                {authUser => authUser ? <NavigationAuth /> : <br />}
            </ AuthUserContext.Consumer>
        </div>
);

const NavigationAuth = () => (
  <div className="navigation_bar">
  
    <Link to={ROUTES.HOME}
      className="header_logo_div">
      <img 
        className="header_logo"
        rel="Strateachy"
        src={logo_text}
        alt="Logo"
      />
    </Link>

    <div className="navigation_links">
      <Link to={ROUTES.ACCOUNT} 
        className="navigation_account">Account</Link>

      <div className="navigation_sign_out">
        <SignOutButton/>
      </div>
    </div>
  </div>
);

export default Navigation;