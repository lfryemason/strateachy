import React, { Component } from 'react';

import { withStore } from '../../../Store';

import './index.css'

class LessonPlanRow extends Component
{
  onClick = event =>
  {
    const lessonPlan = this.props.lessonPlan;
    const lessonPlanID = lessonPlan.id;
    const store = this.props.store;
    store.updateCurrentLessonPlan(lessonPlan);
    store.updateCurrentLessonPlanID(lessonPlanID);
    delete lessonPlan.id;
  }

  render()
  {
    const {name, date, duration} = this.props.lessonPlan
    return (
      <div>
        <div className="lesson_row_divider" />
        <div 
          className="lesson_plan_row"
          onClick={this.onClick}
        >
          <div className="lesson_row_left">
            <div className="lesson_row_name">
            {name}
            </div>
            <div className="lesson_row_date">
              {date.toDateString()}
            </div>
          </div>
          <div className="lesson_row_duration">
            {duration}m
          </div>
          <p />
        </div>
      </div>
    );
  }
}

export default withStore(LessonPlanRow);