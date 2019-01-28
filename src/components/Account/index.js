import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

import { AuthUserContext, withAuthorization, authCondition } from '../Session';

const AccountPage = () => (
  <AuthUserContext.Consumer >
    {authUser => (
    <div>
      <h1>Account</h1>
      <h3>{authUser.email}</h3>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>)}
  </AuthUserContext.Consumer>
);

export default withAuthorization(authCondition)(AccountPage);