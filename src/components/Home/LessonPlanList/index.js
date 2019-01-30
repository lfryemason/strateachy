import React from 'react';

import { withStore } from '../../../Store';

const LessonPlanList = ({store}) =>
{
  return (
    <div>
      <ul>
      {store.lessonPlans.map(lessonPlan => 
        <li>
          {lessonPlan.name + ' - ' + lessonPlan.date}
        </li>
      )}
      </ul>
    </div>
  );
}

export default withStore(LessonPlanList);