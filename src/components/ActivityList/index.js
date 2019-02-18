import React, { Component } from 'react';

import ExpandableRow from './ExpandableRow';

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
          return {id: doc.id, ...doc.data() };
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
        (activity, index) => activity = {...activity, ind: index}
      ).sort( (a, b) => b.ind > a.ind );
      console.log(activityList);
  
      setActivityList(activityListFiltered);
    });
  }

  render()
  {
    const activities = this.state.activityList;
    return (
      <div className="activity_list">
        {activities.map(act => (
          <ExpandableRow activity={act} key={act.key}/>
        ))}
      </div>
    );
  }
}

export default withFirestore(withStore(ActivityList));