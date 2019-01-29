import React from 'react';

import { withAuthorization, authCondition } from '../Session';

import Store, { StoreContext } from '../../Store';

const HomePage = () => (
  <div>
    <StoreContext.Provider value={new Store()}>
      <h1>Home</h1>
    </StoreContext.Provider>
  </div>
);

export default withAuthorization(authCondition)(HomePage);