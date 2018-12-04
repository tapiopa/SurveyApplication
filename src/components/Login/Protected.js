import React, { Component } from 'react';
import AuthHanlder from './AuthHandler';

/* A higher order component (HOC) is frequently written as a function that returns a class. */
export default function Protected(ProtectedComponent) {
  const AuthHandler = new AuthHanlder();

  return class Protection extends Component {
    constructor() {
      super();
      this.state = {
        loaded: false
      };
    }

    /* In the componentDidmount, 
    perfomring couple of important tasks in order to verify the current users authentication status
    prior to granting them enterance into the component. */
    componentDidMount() {
      // if user is not logged in then redirect to somewhere, normally to login page
      if (!AuthHandler.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        try {
          this.setState({
            loaded: true
          });
        } catch (err) {
          /* if there's an error it will print it out and log the user out for security reasons. */
          console.log(err);
          AuthHandler.logout();
          this.props.history.push('/login');
        }
      }
    }

    render() {
      if (this.state.loaded) {
        return <ProtectedComponent history={this.props.history} />;
      } else {
        return null;
      }
    }
  };
}
