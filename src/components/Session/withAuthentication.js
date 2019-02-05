import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../../Firebase';

const withAuthenticationProvider = Component => {
  class WithAuthenticationProvider extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthenticationProvider);
};


export const withAuthentication = Component => props => (
  <AuthUserContext.Consumer>
      {authUser => <Component {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
)

export default withAuthenticationProvider;