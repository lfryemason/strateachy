import React, { Component } from 'react';

import { withStore } from '../../Store';
import { FirestoreCollection } from 'react-firestore';
import { withAuthentication } from '../Session';

import LessonPlanRow from './LessonPlanRow';

import './index.css';

class LessonPlanList extends Component
{

  onClick = event =>
  {
    this.props.store.newCurrentLessonPlan();
  };

  render()
  {
    const uid = this.props.authUser.uid;
    return (
      <div>
        <div className="lesson_plan_list">
          <FirestoreCollection
            path="lessonPlans"
            filter={[['uid', '==', uid]]}
            render={({ isLoading, data }) => {
              return isLoading ? (
                <h3>Loading...</h3>
              ) : (
                <div>
                  <div className="lesson_list_title">Lesson Plans</div>
                  {data.map((lessonPlan, index) => (
                    <LessonPlanRow key={index} lessonPlan={lessonPlan} />
                  ))}
                </div>
              );
            }}
          />
        </div>

        <button type="button" 
            className="new_lesson_plan_button"
            onClick={this.onClick}>
          New lesson plan
        </button>
      </div>
    );
  }
}

export default withAuthentication(withStore(LessonPlanList));