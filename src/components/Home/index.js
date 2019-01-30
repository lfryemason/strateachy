import React from 'react';

import { withAuthorization, authCondition } from '../Session';

import Store, { StoreContext } from '../../Store';

import LessonPlanList from './LessonPlanList';

const HomePage = () => (
  <div>
    <StoreContext.Provider value={new Store()}>
      <h1>Home</h1>
      <LessonPlanList />
    </StoreContext.Provider>
  </div>
);

export default withAuthorization(authCondition)(HomePage);