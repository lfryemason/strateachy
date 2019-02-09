import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import SignOutButton from '../SignOut';

import { AuthUserContext } from '../Session';

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
        <div>
            <Link to={ROUTES.HOME}>Home</Link>
        </div>
        <div>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </div>
        <div>
            <SignOutButton />
        </div>
    </div>
);

export default Navigation;