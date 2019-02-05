import React, { Component } from 'react';

import { withStore } from '../../Store';

import { withFirestore } from 'react-firestore';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class LessonPlanExpand extends Component
{
  //Save the lesson plan to the database.
  onSubmit = event =>
  {
    const { currentLessonPlan, currentLessonPlanID, updateCurrentLessonPlanID } = this.props.store;
    if ( currentLessonPlanID !== "" )
    {
      this.props.firestore.collection("lessonPlans").doc(currentLessonPlanID)
        .update({...currentLessonPlan})
    } else
    {
      this.props.firestore.collection("lessonPlans").add({...currentLessonPlan})
        .then(function(docRef) {
          updateCurrentLessonPlanID(docRef.id);
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
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <input 
            name="name"
            value ={lessonPlan.name}
            onChange={this.onChange}
            placeholder="Class name"
          />

          <DatePicker 
            selected={lessonPlan.date}
            onChange={this.dateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
          />
        </div>

        <div>
          <textarea
            name="description"
            value={lessonPlan.description}
            onChange={this.onChange}
            placeholder="Enter a description for your lesson plan"
          />
        </div>

        <button type="submit">
          save
        </button>
      </form>
    );

  }
}

export default withFirestore(withStore(LessonPlanExpand));