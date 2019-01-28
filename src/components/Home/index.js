import React from 'react';

import { withAuthorization, authCondition } from '../Session';

const HomePage = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default withAuthorization(authCondition)(HomePage);