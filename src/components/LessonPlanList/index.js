import React, { Component } from 'react';

import { withStore } from '../../Store';
import { FirestoreCollection } from 'react-firestore';

import LessonPlanRow from './LessonPlanRow';

class LessonPlanList extends Component
{
  render()
  {
    return (
      <FirestoreCollection
        path="lessonPlans"
        sort="date"
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

export default withStore(LessonPlanList);