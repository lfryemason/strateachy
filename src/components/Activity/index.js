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
      activity: {},
      activityId: "",
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

  componentDidMount()
  {
    this.newActivity(this.props.data);
  }

  newActivity(data)
  {
    const { activity, id } = data;
    let activityId = id
    if ( id === null || id === "" )
    {
      activityId = "";
    }
    const authUid = this.props.authUser.uid;
    this.setState({activity: {...this.blankActivity, ...activity, uid: authUid}, activityId: activityId});
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
    const { activityId } = this.state;

    const setActivity = activity => this.setState({activity: activity});
    const setActivityId = id => this.setState({activityId: id});
    if ( activityId !== "" )
    {
      this.props.firestore.collection("activities").doc(activityId)
        .update({...activity})
        .then(function()
        {
          setActivity(activity);
        });
    } else
    {
      this.props.firestore.collection("activities").add({...activity})
        .then(function(docRef)
        {
          setActivity(activity);
          setActivityId(docRef.id);
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
        onSave={this.onSave}
        toggleModalOpen={this.toggleModalOpen}
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

export default withAuthentication(withFirestore(Activity));