import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { SignInLink } from '../SignIn';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
        <SignInLink />
    </div>
);

const INITIAL_STATE = 
{
    email: '',
    pswdA: '',
    pswdB: '',
    error: null,
}

class SignUpFormBase extends Component
{
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const { email, pswdA } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, pswdA)
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
            pswdA,
            pswdB,
            error
        } = this.state;

        const isInvalid = 
            pswdA !== pswdB ||
            pswdA === '' ||
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
                name="pswdA"
                value={pswdA}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="pswdB"
                value={pswdB}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
            />
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