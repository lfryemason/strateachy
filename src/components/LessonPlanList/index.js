import React, { Component } from 'react';

import { withStore } from '../../Store';
import { FirestoreCollection } from 'react-firestore';
import { withAuthentication } from '../Session';

import LessonPlanRow from './LessonPlanRow';

class LessonPlanList extends Component
{

  onClick = event =>
  {

  };

  render()
  {
    const uid = this.props.authUser.uid;
    return (
      <FirestoreCollection
        path="lessonPlans"
        filter={[['uid', '==', uid]]}
        render={({ isLoading, data }) => {
          return isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <div>
              <h3>Lesson Plans</h3>
              <ul >
              {data.map(lessonPlan => (
                <LessonPlanRow key={lessonPlan.id} lessonPlan={lessonPlan} />
              ))}
              </ul>
            </div>
          );
        }}
      />
    );
  }
}

export default withAuthentication(withStore(LessonPlanList));