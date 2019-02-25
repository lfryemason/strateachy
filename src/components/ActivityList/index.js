import React, { Component } from 'react';

import Activity from '../Activity';

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
      activityList: []
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

  render()
  {
    const activities = this.state.activityList;
    const key = this.props.type === "lessonPlanExpand" ?
      data => data.index : data => data.id;
    const type = this.props.type;
    const refresh = this.props.store.setRefreshActivityLists;
    const isLoading = this.props.store.refreshActivityLists > 0;
    const remove = this.props.store.removeActivityFromLessonPlan;
    const add = this.props.store.addActivityToLessonPlan;
    return (
      <div className="activity_list">
        {isLoading ?
          <h1>loading...</h1>
        : (
          <div>
            {activities.map(data => (
              <Activity data={data} 
                type={type} 
                remove={remove}
                add={add}
                key={key(data)}
                refresh={refresh}
            />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withAuthentication(withFirestore(withStore(ActivityList)));