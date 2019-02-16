import React, { Component } from 'react';

import { withStore } from '../../../Store';

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
        <div className="name">
        {name}
        </div>
        <div className="date">
          {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
        </div>
        <div className="desc">
          {description}
        </div>
        <p />
      </div>
    );
  }
}

export default withStore(LessonPlanRow);