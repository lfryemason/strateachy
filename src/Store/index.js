import React, { Component } from 'react';

export const StoreContext = React.createContext(null);

class Store extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      lessonPlans: [],
      activities: [],
      currentLessonPlan: {id: " ", name: "test", date: "test"}
    };
  }

  //Sets a flag to update the currentLessonPlan with any new values that are passed in.
  updateCurrentLessonPlan = newLessonPlan => 
    this.setState( {currentLessonPlan: {...this.state.currentLessonPlan, ...newLessonPlan}} )

  render()
  {
    return (
      <StoreContext.Provider value={
        {...this.state,
         updateCurrentLessonPlan:this.updateCurrentLessonPlan
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

export default Store;
