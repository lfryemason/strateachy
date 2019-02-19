import React, { Component } from 'react';

import Activity from '../Activity';

import { withStore } from '../../Store';
import { withFirestore } from 'react-firestore'

import './index.css'

class ActivityList extends Component
{
  constructor(props)
  {
    super(props);

    this.state = { activityList: [] }
  }

  componentDidUpdate(prevProps)
  { 
    if ( this.props.type === "lessonPlanExpand" && 
      prevProps.store.currentLessonPlan.activityList !== this.props.store.currentLessonPlan.activityList)
    {
      this.retrieveActivitiesFromRefList();
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

export default withFirestore(withStore(ActivityList));