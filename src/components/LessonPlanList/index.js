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
        <div className="lesson_list_title">
          <div className="lesson_list_title_text">
            Lesson Plans
          </div>

          <button type="button" 
              className="new_lesson_plan_button"
              onClick={this.onClick}>
            +
          </button>
        </div>
        <div className="lesson_plan_list">
          <FirestoreCollection
            path="lessonPlans"
            filter={[['uid', '==', uid]]}
            render={({ isLoading, data }) => {
              return isLoading ? (
                <h3>Loading...</h3>
              ) : (
                <div>
                  {data.map((lessonPlan, index) => (
                    <LessonPlanRow key={index} lessonPlan={lessonPlan} />
                  ))}
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default withAuthentication(withStore(LessonPlanList));