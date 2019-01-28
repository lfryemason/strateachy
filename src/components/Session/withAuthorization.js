import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.removeListener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_UP);
          }
        },
      );
    }

    componentWillUnmount() {
      this.removeListener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => 
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </ AuthUserContext.Consumer>
      );
    }
  }
  return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;

export const authCondition = authUser => !!authUser;
