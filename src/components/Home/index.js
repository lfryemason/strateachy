import React, { Component } from 'react';
import { FirestoreProvider } from 'react-firestore';

import { withAuthorization, authCondition } from '../Session';
import { withFirebase } from '../../Firebase';
import Store from '../../Store';

import LessonPlanList from '../LessonPlanList';
import LessonPlanExpand from '../LessonPlanExpand';

import './index.css';

class HomePage extends Component
{
  render()
  {
    return(
      <div className="homepage">
        <FirestoreProvider firebase={this.props.firebase}>
          <Store>
            <div className="lesson_plan_sidebar">
              <LessonPlanList />
            </div>
            <div className="main_lesson_plan">
              <LessonPlanExpand />
            </div>
          </Store>
        </FirestoreProvider>
      </div>
    );
  }
}

export default withFirebase(withAuthorization(authCondition)(HomePage));