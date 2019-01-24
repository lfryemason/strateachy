import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import SignOutButton from '../SignOut';
import { SignInForm } from '../SignIn';

const Navigation = ({ authUser} ) => (
        <div>{authUser ? <NavigationAuth /> : <br />}</div>
);

const NavigationAuth = () => (
    <div>
        <h2>Navigation</h2>
        <ul>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <SignOutButton />
            </li>
        </ul>
    </div>
);

export default Navigation;