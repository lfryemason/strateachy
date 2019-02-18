import React, { Component } from 'react';

import "./index.css";

class ExpandableRow extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {open: false};
  }

  onClick = () =>
  {
    const currentOpen = this.state.open;
    this.setState( {open: ! currentOpen })
  }

  render()
  {
    const activity = this.props.activity;
    return (
      <div className="activity_row"
           onClick={this.onClick}
      >
      {this.state.open ? 
        <div>
          <TitleRow activity={activity} />
          <ExpandedRow activity={activity} />
        </div>
      :
        <TitleRow activity={activity} />
      }
      </div>
    );
  }
}

const ExpandedRow = props =>
{
  const activity = props.activity;
  return ( 
    <div>
      <h1>
      {activity.description}
      </h1>
    </div>
  ); 
}

const TitleRow = props =>
{
  const activity = props.activity;
  return ( 
  <div className="row_title">
    <div className="activity_name">
      {activity.name}
    </div>
    <div className="activity_duration">
      {activity.duration} mins.
    </div>
  </div>
  );
}

export default ExpandableRow;