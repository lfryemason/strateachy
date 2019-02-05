import React, { Component } from 'react';

class LessonPlanRow extends Component
{
  render()
  {
    return (
      <div>
        <div className="name">
        {this.props.lessonPlan.name}
        </div>
        <div className="date">
          {this.props.lessonPlan.date}
        </div>
        <p className="desc">
          {this.props.lessonPlan.description}
        </p>
      </div>
    );
  }
}

export default LessonPlanRow;