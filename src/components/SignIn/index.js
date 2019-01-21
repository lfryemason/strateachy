import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import { SignUpLink } from '../SignUp';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <SignUpLink />
    </div>
)

const INITIAL_STATE =
{
    email: '',
    pswd: '',
    error: null,
}

class SignInFormBase extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event =>
    {
        const { email, pswd } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, pswd)
            .then(() => {
                this.setState({ ...INITIAL_STATE})
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        console.log('test');
        event.preventDefault();
    }

    onChange = event =>
    {
        this.setState({ [event.target.name]: event.target.value });
    };

    render()
    {
        const { email, pswd, error } = this.state;
    
        const isInvalid = pswd === '' || email === '';
    
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
                    name="pswd"
                    value={pswd}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
);


const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm, SignInLink };