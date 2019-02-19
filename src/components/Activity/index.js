import React, { Component } from 'react';

import ActivityModal from '../ActivityModal';

import { withFirestore } from 'react-firestore';

import "./index.css";

class Activity extends Component
{
  constructor(props)
  {
    super(props);

    const { data } = this.props;
    this.state = 
    {
      open: false,
      isModalOpen: false,
      activity: data.activity,
      activityId: data.id
    };
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

  onSave = activity => event => 
  {
    const { activityId } = this.state;
    if ( activityId !== "" )
    {
      this.props.firestore.collection("activities").doc(activityId)
        .update({...activity});
    } else
    {
      this.props.firestore.collection("activities").add({...activity})
        .then(function(docRef)
        {
          const { activity}  = this.state;
          this.setState({activity: {...activity, id: docRef.id}});
        })
    }
    this.toggleModalOpen();
    event.preventDefault();
  }

  render()
  {
    const { isModalOpen, activity } = this.state;
    return (
      <div className="activity_row"
           onClick={this.onClick}
      >
      {this.state.open ? 
        <div>
          <TitleRow activity={activity} />
          <ExpandedRow activity={activity} parent={this} isModalOpen={isModalOpen} openModal={this.toggleModalOpen}/>
        </div>
      :
        <TitleRow activity={activity} />
      }
        
      <ActivityModal isOpen={isModalOpen}
        activity={activity}
        parent={this}
      />
      </div>
    );
  }
}

class ExpandedRow extends Component
{
  editEvent = event =>
  {
    this.props.openModal();
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

export default withFirestore(Activity);