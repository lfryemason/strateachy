import React, { Component } from 'react';

import { withStore } from '../../Store';

import { withFirestore } from 'react-firestore';

class LessonPlanExpand extends Component
{

  //Save the lesson plan to the database.
  onSubmit = event =>
  {
    const { currentLessonPlan } = this.props.store;
    this.props.store.updateCurrentLessonPlan({id: "WORDS"})
    console.log("HERE" + this.props.store.currentLessonPlan.id)
    if ( currentLessonPlan === false )
    {
      this.props.firestore.collection("lessonPlans").doc(currentLessonPlan.id)
        .update({...currentLessonPlan})
        .then(console.log("Succesfully updated lesson plan"))
    } else
    {
      this.props.firestore.collection("lessonPlans").add(currentLessonPlan)
        .then(function(docRef) {
          console.log("Succesfully saved new lesson plan");
          console.log(this.props.store.currentLessonPlan.id + "tests");
          this.props.store.updateCurrentLessonPlan({id: docRef.id});
          console.log(this.props.store.currentLessonPlan.id);
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