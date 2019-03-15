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
    store.updateCurrentLessonPlanID(lessonPlanID);
    delete lessonPlan.id;
    store.updateCurrentLessonPlan(lessonPlan);
  }

  render()
  {
    const {name, date, description} = this.props.lessonPlan
    return (
      <div 
        className="lesson_plan_row"
        onClick={this.onClick}
      >
        <div className="lesson_row_top">
          <div className="lesson_row_name">
          {name}
          </div>
          <div className="lesson_row_date">
            {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
          </div>
        </div>
        <div className="lesson_row_desc">
          {description}
        </div>
        <p />
      </div>
    );
  }
}

export default withStore(LessonPlanRow);