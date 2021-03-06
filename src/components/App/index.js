import React from 'react';
import { BrowserRouter as Router,
         Route,
         } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HelpPage from '../Help';
import { withAuthenticationProvider } from '../Session';
import AccountPage from '../Account';
import HomePage from '../Home';

import * as ROUTES from '../../constants/routes';
import PasswordForgetPage from '../PasswordForget';

import './index.css'

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.HELP} component={HelpPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    </div>
  </Router>
);

export default withAuthenticationProvider(App);
