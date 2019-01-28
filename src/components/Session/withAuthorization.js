import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_UP);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
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

const authCondition = authUser => !!authUser;

export default withAuthorization;

export { authCondition };