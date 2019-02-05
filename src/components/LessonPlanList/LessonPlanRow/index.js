import React, { Component } from 'react';

class LessonPlanRow extends Component
{
  render()
  {
    return (
      <div>
        <div class="name">
        {this.props.lessonPlan.name}
        </div>
        <div class="date">
          {this.props.lessonPlan.date}
        </div>
        <p class="desc">
          {this.props.lessonPlan.description}
        </p>
      </div>
    );
  }
}

export default LessonPlanRow;