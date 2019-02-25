import React, { Component } from 'react';

import ActivityModal from '../ActivityModal';

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
      isModalOpen: false,
    };
  }

  blankActivity = {
    name: "",
    duration: 0,
    age: "",
    level: "",
    description: "",
    default: false,
    uid: "",
  }

  onClick = () =>
  {
    if ( ! this.state.isModalOpen )
    {
      const currentOpen = this.state.open;
      this.setState( {open: ! currentOpen });
    }
  }

  toggleModalOpen = () =>
  {
    const isCurrentlyOpen = this.state.isModalOpen;
    this.setState({ isModalOpen: ! isCurrentlyOpen});
  }

  onSave = (activity, event) => 
  {
    if ( activity.default )
    {
      this.toggleModalOpen();
      event.preventDefault();
      return;
    }
    const activityId = this.props.data.id;

    const refresh = () => this.props.refresh(true);
    if ( activityId !== "" )
    {
      this.props.firestore.collection("activities").doc(activityId)
        .update({...activity})
        .then(function()
        {
          refresh();
        })
        .catch(function(e){console.log(e)});
    } else
    {
      this.props.firestore.collection("activities").add({...activity})
        .then(function(docRef)
        {
          refresh();
        })
        .catch(function(e){console.log(e)});
    }
    this.toggleModalOpen();
    event.preventDefault();
  }

  render()
  {
    const { isModalOpen } = this.state;
    const { type } = this.props;
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
        
      <ActivityModal isOpen={isModalOpen}
        activity={activity}
        onSave={this.onSave}
        toggleModalOpen={this.toggleModalOpen}
      />
      </div>
    );
  }

  //Expanded row functions and
  editEvent = event =>
  {
    this.toggleModalOpen();
    event.stopPropagation();
  }

  removeEvent = event =>
  {
    event.stopPropagation();
  }

  addEvent = event =>
  {
    event.stopPropagation();
  }

  expandedRow = () =>
  {
    const { type } = this.props;
    const { activity } = this.props.data;
    let buttons = (<br />);
    if ( activity.default )
    {
      buttons = (
        <div>
        </div>
      )
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
      )
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
      )
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