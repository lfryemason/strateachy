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
    if ( this.props.store.currentLessonPlan.name === "" || this.props.store.currentLessonPlan.date === "")
    {
      event.preventDefault();
      return;
    }
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
    const { lessonPlanModified } = this.props.store;
    const { isDeleteModalOpen } = this.state;
    const isDisabled = this.props.store.isSaving || lessonPlan.name === "" || lessonPlan.date === "" || (! lessonPlanModified );
    const isDeleteDisabled = this.props.store.currentLessonPlanID === "";
    const { lessonPlanSidePanelOpen } = this.props;
    return (
      <form onSubmit={this.onSubmit}
        className="lesson_plan_expand"
      >
        <div className="lesson_plan_expand_center">

          <div className="lesson_plan_left_inputs">
            
            <label htmlFor="name">Name</label>
            <input 
              name="name"
              id="name"
              className="lesson_input_field"
              value ={lessonPlan.name}
              onChange={this.onChange}
              placeholder="Name of the class"
            />

            <div className="lesson_plan_date_duration">
              <div className="lesson_plan_duration">

                <label htmlFor="duration">Duration</label>
                <div className="lesson_plan_duration">
                  <div className="lesson_plan_duration_mins">
                    <input 
                      name="duration"
                      id="duration"
                      className="lesson_input_field duration_input_field"
                      value ={lessonPlan.duration}
                      onChange={this.onChange}
                      placeholder="lesson length"
                    />mins.
                  </div>
                </div>

              </div>

              <div className="lesson_plan_date">

                <label htmlFor="date">Date</label>
                <DatePicker 
                  id="date"
                  className="lesson_input_field"
                  placeholderText="Click to select a date"
                  selected={lessonPlan.date}
                  onChange={this.dateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MM/dd/yy h:mm aa"
                  timeCaption="time"
                />

              </div>
            </div>

            <label htmlFor="age">Age group</label>
            <input 
              name="age"
              id="age"
              className="lesson_input_field"
              value ={lessonPlan.age}
              onChange={this.onChange}
              placeholder="e.g. 6-8 or all ages"
            />

            <label htmlFor="level">Skill level</label>
            <input 
              name="level"
              id="level"
              className="lesson_input_field"
              value ={lessonPlan.level}
              onChange={this.onChange}
              placeholder="e.g. early book 1 or all levels"
            />

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="description_input_field lesson_input_field"
              value={lessonPlan.description}
              onChange={this.onChange}
              placeholder="Notes, details and suggestions to supplement the activity list."
            />
          </div>

          <div className="activity_list_lesson_plan">
            <ActivityList type="lessonPlanExpand"/>

            <div className="open_activities">

              <div className="open_activities_text">
                Add Activities
              </div>
              <button 
                type="button"
                onClick={() => this.props.setSidebars("activityList")}
                className="open_activities_button"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="lesson_plan_button_bar">
          <div>
            <button 
              type="button"
              className="lesson_plan_delete_button"
              disabled={isDeleteDisabled}
              onClick={this.toggleDeleteModalOpen}
            >
              Delete
            </button>

            {lessonPlanSidePanelOpen ?
              <div />
            :
              <button 
                type="button"
                className="open_lesson_plan_button"
                onClick={() => this.props.setSidebars("lessonPlanList")}
              >
                Open <br />
                Lesson Plan
              </button>
            }
          </div>

          <div className="lesson_plan_button_right">
            { lessonPlanModified ?
              <div className="save_reminder">
                Don't forget to save!
              </div>
            :
              <div/>
            }
            <button 
              type="submit"
              className="lesson_plan_save_button"
              disabled={isDisabled}>
              Save
            </button> 
          </div>
        </div>
        
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        toggleModal={this.toggleDeleteModalOpen}
        onDelete={this.deleteEvent}
      />
      </form>
    );

  }
}

export default withFirestore(withStore(LessonPlanExpand));