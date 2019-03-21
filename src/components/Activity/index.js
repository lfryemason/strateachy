import React, { Component } from 'react';

import { withFirestore } from 'react-firestore';
import { withAuthentication } from '../Session';

import { withStore } from '../../Store';

import DeleteModal from '../DeleteModal';

import up_arrow from '../../res/activity_up_arrow.png';
import down_arrow from '../../res/activity_down_arrow.png';

import "./index.css";

class Activity extends Component
{
  constructor(props)
  {
    super(props);

    this.state = 
    {
      open: false,
      deleteModalOpen: false,
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
    const { deleteModalOpen, open } = this.state;
    return (
      <div className="activity_row"
           onClick={this.onClick}
      >
      {open ? 
        <div>
          <TitleRow activity={activity} 
            type={this.props.type}
            swapEvent={this.swapEvent}
            expanded={open}
          />
          {ExpandedRow}
        </div>
      :
        <TitleRow activity={activity} 
          type={this.props.type}
          swapEvent={this.swapEvent}
          expanded={open}
        />
      }

      <DeleteModal 
        isOpen={deleteModalOpen}
        toggleModal={this.toggleDeleteModalOpen}
        onDelete={this.deleteEvent}
      />

      </div>
    );
  }

  toggleDeleteModalOpen = () => 
  {
    const { deleteModalOpen } = this.state; 
    this.setState({deleteModalOpen: ! deleteModalOpen});
  }

  swapEvent = (isUp, event) =>
  {
    const docRef = this.props.firestore.collection("activities").doc(this.props.data.id);
    this.props.store.moveActivity(isUp, {docRef, index: this.props.data.index});
    event.stopPropagation();
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
    this.props.store.removeActivityFromLessonPlan({docRef: docRef, index: this.props.data.index});
    event.stopPropagation();
  }

  addEvent = event =>
  {
    const docRef = this.props.firestore.collection("activities").doc(this.props.data.id);
    this.props.store.addActivityToLessonPlan(docRef);
    event.stopPropagation();
  }

  deleteEvent = event =>
  {
    this.props.firestore.collection("activities").doc(this.props.data.id).delete();
    this.props.store.setRefreshActivityLists(true);
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

          <button className="delete_button"
            onClick={this.toggleDeleteModalOpen}
          >
            Delete
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
          

          <button className="delete_button"
            onClick={this.toggleDeleteModalOpen}
          >
            Delete
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
  const { activity, type, swapEvent} = props;
  const expanded = props.expanded ? "expanded" : "none";
  return ( 
  <div className="row_title">
    { type === "lessonPlanExpand" ?
      <div className="title_buttons">
        <img
          src={up_arrow}
          alt="^"
          className="swapUpButton"
          onClick={event => swapEvent(true, event)}
        />
        <img
          src={down_arrow}
          alt="v"
          type="button"
          className="swapDownButton"
          onClick={event => swapEvent(false, event)}
        />

      </div>
    :
      <div />
    }

    <div className="title_text" expanded={expanded}>
      <div className="activity_name">
        {activity.name}
      </div>
      <div className="activity_duration">
        {activity.duration} mins.
      </div>
    </div>
    
  </div>
  );
}

export default withStore(withAuthentication(withFirestore(Activity)));