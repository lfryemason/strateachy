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
      activityList: [],
      refreshList: true
    }
  }

  componentDidUpdate(prevProps)
  { 
    if ( this.props.type === "lessonPlanExpand" && 
      (prevProps.store.currentLessonPlan.activityList !== this.props.store.currentLessonPlan.activityList
      || this.state.refreshList) )
    {
      this.retrieveActivitiesFromRefList();
    }
    else if ( this.props.type === "sidePanel" &&
      this.state.refreshList)
    {
      this.retrieveActivitiesFromCollection();
    }
  }

  retrieveActivitiesFromRefList()
  {
    const activityRefList = this.props.store.currentLessonPlan.activityList;
    const newActivityList = activityRefList.map(function(docRef) 
    {
      return docRef.get().then(function(doc) {
        if (doc.exists)
        {
          return {id: doc.id, activity: doc.data() };
        }
        else
        {
          return null;
        }
      });
    });

    const setActivityList = activityList => this.setState({activityList: activityList})

    Promise.all(newActivityList).then(function(activityList)
    {
      const activityListFiltered = activityList.filter(doc => doc !== null).map(
        (data, index) => data = {id: data.id, activity: {...data.activity, ind: index}}
      ).sort( (a, b) => a.activity.ind < b.activity.ind );
      
      setActivityList(activityListFiltered);
    });
    this.setState({refreshList: false});
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
      }).filter(doc => doc !== null)
      .sort( (a, b) => a.activity.ind < b.activity.ind ).map(
        (data, index) => data = {id: data.id, activity: {...data.activity, ind: index}}
      );

      setActivityList(activityListFiltered);
    });
    this.setState({refreshList: false});
  }

  render()
  {
    const activities = this.state.activityList;
    return (
      <div className="activity_list">
        {activities.map(data => (
          <Activity data={data} key={data.activity.ind}/>
        ))}
      </div>
    );
  }
}

export default withAuthentication(withFirestore(withStore(ActivityList)));