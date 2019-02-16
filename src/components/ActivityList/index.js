import React, { Component } from 'react';

import ExpandableRow from './ExpandableRow';

import './index.css'

class ActivityList extends Component
{
  render()
  {
    const activities = this.props.activities;
    return (
      <div className="activity_list">
        {activities.map(act => (
          <ExpandableRow activity={act} />
        ))}
      </div>
    );
  }
}

export default ActivityList;