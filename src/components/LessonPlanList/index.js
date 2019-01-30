import React, { Component } from 'react';

import { withStore } from '../../Store';
import { FirestoreCollection } from 'react-firestore';

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
              <ul>
              {data.map(lessonPlan => (
                <li key={lessonPlan.id}>
                  {lessonPlan.name + ' - ' + lessonPlan.date}
                </li>
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