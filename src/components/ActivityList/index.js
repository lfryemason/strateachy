import React, { Component } from 'react';

import Activity from '../Activity';

import ActivityModal from '../ActivityModal';

import { withStore } from '../../Store';
import { withFirestore } from 'react-firestore'

import { withAuthentication } from '../Session';

import './index.css'

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
          return {id: doc.id, activity: doc.data(), index: index };
        }
        else
        {
          return null;
        }
      });
    });

    const setActivityList = activityList => this.setState({activityList: activityList})
    const refreshDone = () => this.props.store.setRefreshActivityLists(false);

    Promise.all(newActivityList).then(function(activityList)
    {
      const activityListFiltered = activityList.filter( doc => doc !== null && doc.activity !== null )
        .sort( (a, b) => a.index - b.index );
      
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
  }

  setAndOpenModalActivity = (data) => 
  {
    this.setState({modalData: data, modalUpdate: true});
    this.toggleModalOpen();
  }

  newActivity = event =>
  {
    this.setState({modalData: {id: "", activity: this.blankActivity}, modalUpdate: true});
    this.toggleModalOpen();
  }

  render()
  {
    const activities = this.state.activityList;
    const { isModalOpen, modalData, modalUpdate } = this.state;
    const key = this.props.type === "lessonPlanExpand" ?
      data => data.index : data => data.id;
    const type = this.props.type;
    const isLoading = this.props.store.refreshActivityLists > 0;
    return (
      <div className="activity_list">
        {isLoading ?
          <h1>loading...</h1>
        : (
          <div>
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


        <button type="button" 
            className="new_activity_button"
            onClick={this.newActivity}>
          New Activity
        </button>
        
        <ActivityModal isOpen={isModalOpen}
              activity={modalData.activity}
              refresh={modalUpdate}
              onSave={this.onModalSave}
              toggleModalOpen={this.toggleModalOpen}
              modalUpdated={() => this.setState({modalUpdate: false})}
            />
      </div>
    );
  }
}

export default withAuthentication(withFirestore(withStore(ActivityList)));