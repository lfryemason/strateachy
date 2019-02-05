import React, { Component } from 'react';

class LessonPlanRow extends Component
{
  render()
  {
    const {name, date, description} = this.props.lessonPlan
    return (
      <div>
        <div className="name">
        {name}
        </div>
        <div className="date">
          {date.getFullYear()}/{date.getMonth()}/{date.getDay()}
        </div>
        <div className="desc">
          {description}
        </div>
        <p />
      </div>
    );
  }
}

export default LessonPlanRow;