import React, { Component } from 'react';

import { withStore } from '../../Store';

import DeleteModal from '../DeleteModal';

import { withFirestore } from 'react-firestore';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ActivityList from '../ActivityList';

import "./index.css"

class LessonPlanExpand extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      isDeleteModalOpen: false,
    };
  }
  //Save the lesson plan to the database.
  onSubmit = event =>
  {
    const { currentLessonPlan, currentLessonPlanID, updateCurrentLessonPlanID, saving } = this.props.store;
    saving(true);
    if ( currentLessonPlanID !== "" )
    {
      this.props.firestore.collection("lessonPlans").doc(currentLessonPlanID)
        .update({...currentLessonPlan})
        .then(saving(false));
    } else
    {
      this.props.firestore.collection("lessonPlans").add({...currentLessonPlan})
        .then(function(docRef) {
          updateCurrentLessonPlanID(docRef.id);
          saving(false);
        })
    }
    event.preventDefault();
  };
  
  onChange = event => {
    this.props.store.updateCurrentLessonPlan({ [event.target.name]: event.target.value });
  };

  deleteEvent = event =>
  {
    this.props.firestore.collection("lessonPlans").doc(this.props.store.currentLessonPlanID).delete();
    this.props.store.newCurrentLessonPlan();
    this.toggleDeleteModalOpen();
  }

  toggleDeleteModalOpen = () => 
  {
    const { isDeleteModalOpen } = this.state; 
    this.setState({isDeleteModalOpen: ! isDeleteModalOpen});
  }

  dateChange = date =>
  {
    this.props.store.updateCurrentLessonPlan({ date: date });
  };

  render()
  {
    const lessonPlan = this.props.store.currentLessonPlan;
    const { isDeleteModalOpen } = this.state;
    const isDisabled = this.props.store.isSaving || lessonPlan.name === "";
    const isDeleteDisabled = this.props.store.currentLessonPlanID === "";
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="lesson_plan_expand">

            <label htmlFor="name">Class name</label>
            <input 
              name="name"
              id="name"
              value ={lessonPlan.name}
              onChange={this.onChange}
              placeholder="Class name"
            />

            <label htmlFor="date">Date</label>
            <DatePicker 
              id="date"
              selected={lessonPlan.date}
              onChange={this.dateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />

            <label htmlFor="duration">Duration</label>
            <input 
              name="duration"
              id="duration"
              type="number"
              value ={lessonPlan.duration}
              onChange={this.onChange}
              placeholder="lesson length"
            /> mins.
          </div>

          <div>
            <label htmlFor="age">Age group</label>
            <input 
              name="age"
              id="age"
              value ={lessonPlan.age}
              onChange={this.onChange}
              placeholder="Age group"
            />

            <label htmlFor="level">Skill level</label>
            <input 
              name="level"
              id="level"
              value ={lessonPlan.level}
              onChange={this.onChange}
              placeholder="Skill level"
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={lessonPlan.description}
              onChange={this.onChange}
              placeholder="Enter a description for your lesson plan"
            />
          </div>

          <div className="activity_list_lesson_plan">
            <ActivityList type="lessonPlanExpand"/>
          </div>

          <button 
            type="button"
            disabled={isDeleteDisabled}
            onClick={this.toggleDeleteModalOpen}
          >
            delete
          </button>

          <button 
            type="submit"
            disabled={isDisabled}>
            save
          </button>
        </form>

        <DeleteModal 
          isOpen={isDeleteModalOpen}
          toggleModal={this.toggleDeleteModalOpen}
          onDelete={this.deleteEvent}
        />
      </div>
    );

  }
}

export default withFirestore(withStore(LessonPlanExpand));