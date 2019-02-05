import React, { Component } from 'react';

import { withStore } from '../../Store';

import { withFirestore } from 'react-firestore';

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

  render()
  {
    const lessonPlan = this.props.store.currentLessonPlan;
    return (
      <form onSubmit={this.onSubmit}>
        <input 
          name="name"
          value ={lessonPlan.name}
          onChange={this.onChange}
          placeholder="Name"
        />

        <h2>
          {lessonPlan.date}
        </h2>
        <p>{lessonPlan.description}</p>

        <button type="submit">
          save
        </button>
      </form>
    );

  }
}

export default withFirestore(withStore(LessonPlanExpand));