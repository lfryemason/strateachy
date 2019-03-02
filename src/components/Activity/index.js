import React, { Component } from 'react';

import { withFirestore } from 'react-firestore';
import { withAuthentication } from '../Session';

import "./index.css";

class Activity extends Component
{
  constructor(props)
  {
    super(props);

    this.state = 
    {
      open: false,
    };
  }

  onClick = () =>
  {
    if ( ! this.props.isModalOpen )
    {
      const currentOpen = this.state.open;
      this.setState( {open: ! currentOpen });
    }
  }

  render()
  {
    const activity = this.props.data.activity;
    const ExpandedRow = this.expandedRow();
    return (
      <div className="activity_row"
           onClick={this.onClick}
      >
      {this.state.open ? 
        <div>
          <TitleRow activity={activity} />
          {ExpandedRow}
        </div>
      :
        <TitleRow activity={activity} />
      }
      </div>
    );
  }

  //Expanded row functions and
  editEvent = event =>
  {
    this.props.setAndOpenModalActivity(this.props.data);
    event.stopPropagation();
  }

  removeEvent = event =>
  {
    const docRef = this.props.firestore.collection("activities").doc(this.props.data.id);
    this.props.remove({docRef: docRef, index: this.props.data.index});
    event.stopPropagation();
  }

  addEvent = event =>
  {
    const docRef = this.props.firestore.collection("activities").doc(this.props.data.id);
    this.props.add(docRef);
    event.stopPropagation();
  }

  expandedRow = () =>
  {
    const { type } = this.props;
    const { activity } = this.props.data;
    let buttons = (<br />);
    if ( activity.default )
    {
      if ( type === "lessonPlanExpand" )
      { 
        buttons = (
          <div>
            <button className="remove_button"
              onClick={this.removeEvent}
            >
              remove from lesson
            </button>
          </div>
        );
      }
      else if ( type === "sidePanel" )
      {
        buttons = (
          <div>
            <button className="add_button"
              onClick={this.addEvent}
            >
              add to lesson
            </button>
          </div>
        );
      }
    }
    else if ( type === "lessonPlanExpand" )
    { 
      buttons = (
        <div>
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
      );
    }
    else if ( type === "sidePanel" )
    {
      buttons = (
        <div>
          <button className="edit_button"
            onClick={this.editEvent}
          >
            edit
          </button>
          <button className="add_button"
            onClick={this.addEvent}
          >
            add to lesson
          </button>
        </div>
      );
    }

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
          {buttons}
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

export default withAuthentication(withFirestore(Activity));