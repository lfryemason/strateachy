import React from 'react';


import { withAuthorization, authCondition } from '../Session';

const HelpPage = () => (
  <h1>help page</h1>
);

export default withAuthorization(authCondition)(HelpPage);