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
      currentLessonPlanID: ""
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
    this.setState( {currentLessonPlan: {...this.blankLessonPlan, uid: this.props.authUser.uid }});
  }

  //Sets a flag to update the currentLessonPlan with a new ID key.
  updateCurrentLessonPlanID = newID => 
  {
    this.setState( {currentLessonPlanID: newID} );
  }

  render()
  {
    return (
      <StoreContext.Provider value={
        {...this.state,
         updateCurrentLessonPlan:this.updateCurrentLessonPlan,
         updateCurrentLessonPlanID:this.updateCurrentLessonPlanID
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
