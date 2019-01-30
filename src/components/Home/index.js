import React, { Component } from 'react';
import { FirestoreProvider } from 'react-firestore';

import { withAuthorization, authCondition } from '../Session';
import { withFirebase } from '../../Firebase';
import Store from '../../Store';

import LessonPlanList from './LessonPlanList';

class HomePage extends Component
{
  render()
  {
    return(
      <div>
        <FirestoreProvider firebase={this.props.firebase}>
          <Store>
            <h1>Home</h1>
            <LessonPlanList />
          </Store>
        </FirestoreProvider>
      </div>
    );
  }
}

export default withFirebase(withAuthorization(authCondition)(HomePage));