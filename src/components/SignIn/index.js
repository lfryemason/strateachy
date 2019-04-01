import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import * as ROUTES from '../../constants/routes';

import logo_text from '../../res/Strateachy_logo_text.png';

import './index.css';

const SignInPage = () => (
  <div className="sign_in_page">

    <img
      className="sign_in_logo"
      rel="Strateachy"
      src={logo_text}
      alt="Logo"
    />

    <SignInForm />
  </div>
)

const INITIAL_STATE =
{
  email: '',
  password: '',
  error: null,
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form 
        onSubmit={this.onSubmit}
        className="sign_in_form"
      >

        <label for="sign_in_email">Email</label>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          className="sign_in_email sign_in_input"
        />

        <label for="sign_in_password">Password</label>
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          className="sign_in_password sign_in_input"
        />

        <PasswordForgetLink 
          className="sign_in_forgot"
        />
        
        <SignUpLink />
        
        <button 
          disabled={isInvalid} 
          type="submit"
          className="sign_in_button"
        >
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