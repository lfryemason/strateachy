import React, { Component } from 'react';
import { BrowserRouter as Router,
         Route,
        } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';

import * as ROUTES from '../../constants/routes';

class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = { authUser: null };    
    }


    componentDidMount()
    {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
        });
    }

    componentWillUnmount()
    {
        this.listener();
    }

    render()
    {
        return(
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser} />

                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                </div>
            </Router>
        );
    }
}

export default withFirebase(App);
