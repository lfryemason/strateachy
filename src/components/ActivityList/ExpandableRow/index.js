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
          <ExpandedRow activity={activity} parent={this} />
        </div>
      :
        <TitleRow activity={activity} />
      }
      </div>
    );
  }
}

class ExpandedRow extends Component
{
  editEvent = event =>
  {
    event.stopPropagation();
  }

  removeEvent = event =>
  {
    event.stopPropagation();
  }

  render()
  {
    const { activity } = this.props;
    return ( 
      <div className="expanded_row">
        <div className="expanded_details">
          <div className="expanded_age">
            <b>Age:</b> {activity.age}
          </div>
          <div className="expanded_level">
            <b>Level:</b> {activity.level}
          </div>
        </div>
        <div className="expanded_description">
          {activity.description}
        </div>
        <div className="expanded_buttons">
          <button className="edit_button"
            onClick={this.editEvent}
          >
            edit
          </button>
          <button className="remove_button"
            onClick={this.removeEvent}
          >
            remove from lesson
          </button>
        </div>
      </div>
    ); 
  }
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