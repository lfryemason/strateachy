import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { SignInLink } from '../SignIn';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = 
{
    email: '',
    passwordA: '',
    passwordB: '',
    error: null,
}

class SignUpFormBase extends Component
{
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const { email, passwordA } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordA)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            email,
            passwordA,
            passwordB,
            error
        } = this.state;

        const isInvalid = 
            passwordA !== passwordB ||
            passwordA === '' ||
            email === '';

        return (
        <form onSubmit={this.onSubmit}>
            <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordA"
                value={passwordA}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordB"
                value={passwordB}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <SignInLink />
            <button disabled={isInvalid} type="submit">Sign Up</button>

            {error && <p>{error.message}</p>}
        </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };