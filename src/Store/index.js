import React, { Component } from 'react';

export const StoreContext = React.createContext(null);

class Store extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      lessonPlans: [],
      activities: []
    };
  }

  lessonPlan =
  {
    //lessonplan functions go here
  }

  activity =
  {
    //activity functions go here
  }

  render()
  {
    return (
      <StoreContext.Provider value={{...this.state, lessonPlan:this.lessonPlan, activity:this.activity}}>
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
