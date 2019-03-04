import React, { Component } from 'react';

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
      isSaving: false,
      refreshActivityLists: 2,
    };
  }

  componentDidMount()
  {
    this.newCurrentLessonPlan();
  }

  //Sets a flag to update the currentLessonPlan with any new values that are passed in.
  updateCurrentLessonPlan = newLessonPlan => 
  {
    this.setState( {currentLessonPlan: {...this.state.currentLessonPlan, ...newLessonPlan}} );
  }

  blankLessonPlan = {
    name: "", 
    date: new Date(),
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
  }

  //Sets a flag to update the currentLessonPlan with a new ID key.
  updateCurrentLessonPlanID = newID => 
  {
    this.setState( {currentLessonPlanID: newID} );
  }

  saving = newVal =>
  {
    this.setState({ isSaving: newVal });
  }

  removeActivityFromLessonPlan = activity =>
  {
    const currentLessonPlan = this.state.currentLessonPlan;
    const currentActivityList = currentLessonPlan.activityList;
    currentActivityList.splice(activity.index, 1);
    const newActivityList = currentActivityList.map((doc, index) => ({...doc, index}));
    this.setState({currentLessonPlan: {...currentLessonPlan, activityList: newActivityList}});
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
