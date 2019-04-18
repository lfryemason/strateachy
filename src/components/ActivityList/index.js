import React, { Component } from 'react';

import Activity from '../Activity';

import * as R from 'ramda';

import ActivityModal from '../ActivityModal';

import { withStore } from '../../Store';
import { withFirestore } from 'react-firestore'

import { withAuthentication } from '../Session';

import './index.css'
import ExportModal from '../Export';

class ActivityList extends Component
{
  constructor(props)
  {
    super(props);

    this.state = { 
      activityList: [],
      isModalOpen: false,
      modalData: {id: "", activity: this.blankActivity},
      modalUpdate: false,
      exportModalOpen: false,
      exportModalData: "",
      toggleDeleteModalOpen: () => {},
    }
  }

  componentDidUpdate(prevProps)
  {
    if ( this.props.type === "lessonPlanExpand" && 
      (prevProps.store.currentLessonPlan.activityList !== this.props.store.currentLessonPlan.activityList
      || this.props.store.refreshActivityLists > 0) )
    {
      this.retrieveActivitiesFromRefList();
    }
    else if ( this.props.type === "sidePanel" &&
      this.props.store.refreshActivityLists > 0)
    {
      this.retrieveActivitiesFromCollection();
    }
  }

  retrieveActivitiesFromRefList()
  {
    const activityRefList = this.props.store.currentLessonPlan.activityList;
    const newActivityList = activityRefList.map(function(activityRef) 
    {
      const { index, docRef } = activityRef;
      return docRef.get().then(function(doc) {
        if (doc.exists)
        {
          return {id: doc.id, activity: doc.data(), index, docRef };
        }
        else
        {
          return null;
        }
      });
    });

    const setActivityList = activityList => this.setState({activityList: activityList})
    const setActivityRefList = this.props.store.setActivityList;
    const refreshDone = () => this.props.store.setRefreshActivityLists(false);

    Promise.all(newActivityList).then(function(activityList)
    {
      const activityListFiltered = activityList.filter( doc => doc !== null && doc.activity !== null )
        .sort( (a, b) => a.index - b.index ).map( (doc, index) => R.assocPath(["index"], index, doc) );
      
      if ( activityListFiltered.length !== activityList.length )
      {
        setActivityRefList( activityListFiltered.map(activity => ({docRef: activity.docRef, index: activity.index})) );
        return;
      }
      
      setActivityList(activityListFiltered);
      refreshDone();
    });
  }

  retrieveActivitiesFromCollection()
  {
    const uid = this.props.authUser.uid
    const db = this.props.firestore;
    const userActivities = db.collection("activities").where("uid", "==", uid)
      .get();

    const defaultActivities = db.collection("activities").where("default", "==", true)
      .get();

    const setActivityList = activityList => this.setState({activityList: activityList})
    const refreshDone = () => this.props.store.setRefreshActivityLists(false);

    Promise.all([userActivities, defaultActivities]).then(function(queryArray)
    {
      const activities = queryArray[0].docs.concat(queryArray[1].docs);
      const activityListFiltered = activities.map( doc => 
      {
        if ( doc.exists )
        {
          return {activity: doc.data(), id: doc.id};
        }
        else
        {
          return null;
        }
      }).filter(doc => doc !== null);

      setActivityList(activityListFiltered);
      refreshDone();
    });
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


  toggleModalOpen = () =>
  {
    const isCurrentlyOpen = this.state.isModalOpen;
    this.setState({ isModalOpen: ! isCurrentlyOpen});
  }

  onModalSave = (activity, event) => 
  {
    if ( activity.default )
    {
      this.toggleModalOpen();
      event.preventDefault();
      return;
    }
    activity = {...activity, uid: this.props.authUser.uid};
    const activityId = this.state.modalData.id;
    const add = this.props.store.addActivityToLessonPlan;

    const refresh = () => this.props.store.setRefreshActivityLists(true);
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
          add(docRef);
        })
        .catch(function(e){console.log(e)});
    }
    this.toggleModalOpen();
    event.preventDefault();
    event.stopPropagation();
  }

  setAndOpenModalActivity = (data, toggleDeleteModalOpen) => 
  {
    this.setState({modalData: data,toggleDeleteModalOpen: toggleDeleteModalOpen, modalUpdate: true},);
    this.toggleModalOpen();
  }

  newActivity = event =>
  {
    this.setState({modalData: {id: "", activity: this.blankActivity}, modalUpdate: true,
      toggleDeleteModalOpen: () => {}, });
    this.toggleModalOpen();
  }

  activityToString = activity =>
  (
    activity.activity.name + "\n  " +
    activity.activity.duration + " minutes\n\n" +
    activity.activity.description + "\n\n-----------------\n"
  );

  openExport = event =>
  {
    const { currentLessonPlan } = this.props.store;
    const { date } = currentLessonPlan;
    const dateStr = (date === "") ? "" : ((date.getMonth() + 1) + "/" + 
      date.getDate() + "/" + 
      date.getFullYear() + " " + 
      date.getHours() + ":" + 
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()));

    const header = currentLessonPlan.name + "\n" + 
      dateStr + "\n" + 
      currentLessonPlan.duration + " minutes\n" +
      "Age level: " + currentLessonPlan.age + "\n" +
      "Skill level: " + currentLessonPlan.level + "\n\n" +
      currentLessonPlan.description + "\n\n" +
      "---ACTIVITIES------------------------\n";

    const activities = this.state.activityList;
    const exportData = R.reduce((data, activity) => data + this.activityToString(activity), header, activities);

    this.setState({exportModalOpen: true, exportModalData: exportData});
    event.preventDefault();
  }

  render()
  {
    const activities = this.state.activityList;
    const { isModalOpen, modalData, modalUpdate, toggleDeleteModalOpen } = this.state;
    const { exportModalOpen, exportModalData } = this.state;
    const key = this.props.type === "lessonPlanExpand" ?
      data => data.index : data => data.id;
    const type = this.props.type;
    const isLoading = this.props.store.refreshActivityLists > 0;
    const noActivities = activities.length === 0;
    return (
      <div className="activity_list" type={type}>


        { type === "sidePanel" ?
          <div className="activity_sidepanel_title">
            <div className="activity_list_title">
              All Activities
            </div>
            <button type="button" 
                className="new_activity_button"
                onClick={this.newActivity}>
              +
            </button>
          </div>
        :
          <div className="activity_expanded_title">
            <div className="expanded_list_title">
              Activities
            </div>
            <button type="button" 
                className="export_button"
                onClick={this.openExport}>
              Export
            </button>
          </div>
        }

        {noActivities ?
          <h2>Try adding an activity to your lesson plan</h2>
        :
          <div>
            {isLoading ?
              <h1>loading...</h1>
            : (
              <div className="activities" type={type}>
                {activities.map(data => (
                  <Activity data={data} 
                    type={type} 
                    key={key(data)}
                    isModalOpen={isModalOpen}
                    setAndOpenModalActivity={this.setAndOpenModalActivity}
                />
                ))}
              </div>
            )}
          </div>
        }
        
        <ActivityModal isOpen={isModalOpen}
              activity={modalData.activity}
              refresh={modalUpdate}
              onSave={this.onModalSave}
              toggleModalOpen={this.toggleModalOpen}
              toggleDeleteModalOpen={toggleDeleteModalOpen}
              modalUpdated={() => this.setState({modalUpdate: false})}
            />
        <ExportModal isOpen={exportModalOpen}
              closeModal={() => this.setState({exportModalOpen: false}) }
              data={exportModalData}
            />
      </div>
    );
  }
}



export default withAuthentication(withFirestore(withStore(ActivityList)));