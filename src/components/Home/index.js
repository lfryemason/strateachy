import React from 'react';

import { withAuthorization, AuthCondition } from '../Session';

const HomePage = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default withAuthorization(AuthCondition)(HomePage);