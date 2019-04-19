import React, { Component } from 'react';

import * as R from 'ramda';

import { withAuthentication } from '../components/Session';

export const StoreContext = React.createContext(null);

class Store extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      currentLessonPlan: {...this.blankLessonPlan},
      currentLessonPlanID: "",
      lessonPlanModified: false,
      isSaving: false,
      refreshActivityLists: 2,
    };
  }

  componentDidMount()
  {
    this.newCurrentLessonPlan();
  }

  // Updates the currentLessonPlan with any new values that are passed in.
  updateCurrentLessonPlan = newLessonPlan => 
  {
    this.setState( {currentLessonPlan: {...this.state.currentLessonPlan, ...newLessonPlan}} );
    this.setState({lessonPlanModified: true});
  }

  blankLessonPlan = {
    name: "", 
    date: "",
    duration: 45,
    description: "",
    age: "",
    level: "",
    activityList: []
  }

  newCurrentLessonPlan = () =>
  {
    this.setState( {currentLessonPlan: {...this.blankLessonPlan, uid: this.props.authUser.uid }, 
      currentLessonPlanID: ""});
    this.setState({lessonPlanModified: false});
  }

  //Sets a flag to update the currentLessonPlan with a new ID key.
  updateCurrentLessonPlanID = newID => 
  {
      this.setState({lessonPlanModified: false});

    this.setState( {currentLessonPlanID: newID} );
  }

  saving = newVal =>
  {
    this.setState({ isSaving: newVal });
    if ( newVal )
      this.setState({lessonPlanModified: false});
  }

  removeActivityFromLessonPlan = activity =>
  {
    const currentLessonPlan = this.state.currentLessonPlan;
    const currentActivityList = currentLessonPlan.activityList;
    currentActivityList.splice(activity.index, 1);
    const newActivityList = currentActivityList.map((doc, index) => ({...doc, index}));
    this.setState({currentLessonPlan: {...currentLessonPlan, activityList: newActivityList}});
    this.setState({lessonPlanModified: true});
    this.refreshActivityLists(true);
  }

  setActivityList = (activityList) =>
  {
    this.setState(R.assocPath(["currentLessonPlan", "activityList"], activityList, this.state));
    this.setState({lessonPlanModified: true});
    this.refreshActivityLists(true);
  }

  addActivityToLessonPlan = docRef =>
  {
    const currentLessonPlan = this.state.currentLessonPlan;
    const currentActivityList = currentLessonPlan.activityList;
    const newIndex = currentActivityList.length
    currentActivityList.push({docRef: docRef, index: newIndex});
    currentActivityList.sort( (a, b) => a.index - b.index );
    this.setState({currentLessonPlan: {...currentLessonPlan, activityList: currentActivityList}});
    this.setState({lessonPlanModified: true});
    this.refreshActivityLists(true);
  }

  moveActivity = (goingUp, activity) =>
  {
    const {activityList} = this.state.currentLessonPlan;
    if (activityList[activity.index].index !== activity.index)
    {
      console.error("Indexes are wrong", activity, activityList[activity.index]);
      return;
    }

    if ( (activity.index === 0 && goingUp) ||
         (activity.index === (activityList.length - 1) && ! goingUp ) )
    {
      return;
    }

    if ( goingUp )
    {
      activityList[activity.index] = R.assocPath(["index"], activity.index, activityList[activity.index - 1]);
      activityList[activity.index - 1] = R.assocPath(["index"], activity.index - 1, activity);
    }
    else
    {
      activityList[activity.index] = R.assocPath(["index"], activity.index, activityList[activity.index + 1]);
      activityList[activity.index + 1] = R.assocPath(["index"], activity.index + 1, activity);
    }

    this.setState(R.assocPath(["currentLessonPlan", "activityList"], activityList, this.state));
    this.setState({lessonPlanModified: true});
    this.refreshActivityLists(true);
  }

  refreshActivityLists = val =>
  {
    if ( val )
      this.setState({refreshActivityLists: 2})
    else
    {
      const currentRefresh = this.state.refreshActivityLists;
      this.setState({refreshActivityLists: currentRefresh - 1});
    }
  }

  render()
  {
    return (
      <StoreContext.Provider value={
        {...this.state,
         updateCurrentLessonPlan:this.updateCurrentLessonPlan,
         updateCurrentLessonPlanID:this.updateCurrentLessonPlanID,
         newCurrentLessonPlan:this.newCurrentLessonPlan,
         saving:this.saving,
         setRefreshActivityLists: this.refreshActivityLists,
         removeActivityFromLessonPlan: this.removeActivityFromLessonPlan,
         addActivityToLessonPlan: this.addActivityToLessonPlan,
         setActivityList: this.setActivityList,
         moveActivity: this.moveActivity,
        }
      }>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export const withStore = Component => props => (
  <StoreContext.Consumer>
    {store => <Component {...props} store={store} />}
  </StoreContext.Consumer>
);

export default withAuthentication(Store);
