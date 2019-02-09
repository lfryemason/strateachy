import React, { Component } from 'react';

import { withStore } from '../../Store';

import { withFirestore } from 'react-firestore';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./index.css"

class LessonPlanExpand extends Component
{
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

  dateChange = date =>
  {
    this.props.store.updateCurrentLessonPlan({ date: date });
  };

  render()
  {
    const lessonPlan = this.props.store.currentLessonPlan;
    const isDisabled = this.props.store.isSaving || lessonPlan.name === "";
    return (
      <form onSubmit={this.onSubmit}>
        <div className="lesson_plan_expand">

          <label for="name">Class name</label>
          <input 
            name="name"
            id="name"
            value ={lessonPlan.name}
            onChange={this.onChange}
            placeholder="Class name"
          />

          <label for="date">Date</label>
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

          <label for="duration">Duration</label>
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
          <label for="age">Age group</label>
          <input 
            name="age"
            id="age"
            value ={lessonPlan.age}
            onChange={this.onChange}
            placeholder="Age group"
          />

          <label for="level">Skill level</label>
          <input 
            name="level"
            id="level"
            value ={lessonPlan.level}
            onChange={this.onChange}
            placeholder="Skill level"
          />
        </div>

        <div>
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={lessonPlan.description}
            onChange={this.onChange}
            placeholder="Enter a description for your lesson plan"
          />
        </div>

        <div>
          <h1>Activity list here</h1>
        </div>
        <button 
          type="submit"
          disabled={isDisabled}>
          save
        </button>
      </form>
    );

  }
}

export default withFirestore(withStore(LessonPlanExpand));