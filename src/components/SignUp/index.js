import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../constants/routes';

import { SignInLink } from '../SignIn';

import logo_text from '../../res/Strateachy_logo_text.png';

import './index.css';

const SignUpPage = () => (
  <div className="sign_up_page">
  
    <img 
        className="sign_up_logo"
        rel="Strateachy"
        src={logo_text}
        alt="Logo"
    />
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
      <form onSubmit={this.onSubmit}
        className="sign_up_form"
      >

        <label htmlFor="sign_up_email">Email</label>
        <input
          name="email"
          className="sign_up_email sign_up_input"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        
        <label htmlFor="sign_up_password">Password</label>
        <input
          name="passwordA"
          className="sign_up_password sign_up_input"
          value={passwordA}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

        <label htmlFor="sign_up_password_reenter">Re-enter Password</label>
        <input
          name="passwordB"
          className="sign_up_password_reenter sign_up_input"
          value={passwordB}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <Link className="sign_up_help" to={ROUTES.HELP}>What is Strateachy?</Link>
        <SignInLink />
        <button 
          disabled={isInvalid} 
          type="submit"
          className="sign_up_button"
        >
          Sign Up
        </button>

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