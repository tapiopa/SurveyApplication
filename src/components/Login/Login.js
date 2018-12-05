import React, { Component } from 'react';
import classes from './Login.css';
import { NavLink, Route } from 'react-router-dom';
import AuthHanlder from './AuthHandler';
import Protected from './Protected';
class Login extends Component {
  AuthHanlder = new AuthHanlder();
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      account: '',
      password: ''
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.AuthHanlder.login(this.state.account, this.state.password)
      .then(res => {
        if (res.status === false) {
          alert('Account does not exist');
          this.props.history.push('/login');
        } else {
          localStorage.setItem('sec', this.AuthHanlder.whenExpired());
          this.props.history.push('/home');
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  componentWillMount() {
    if (this.AuthHanlder.loggedIn()) {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div className={classes.login}>
        <div className={classes.outer}>
          <div
            className={classes.container}
            className="row justify-content-center"
          >
            <form onSubmit={this.handleSubmit} className="form-group">
              <div className="row">
                <div className="col-xs-2">
                  <label htmlFor="account">Username:</label>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-2">
                  <input
                    type="text"
                    id="account"
                    name="account"
                    className="form-control"
                    autoComplete="false"
                    autoFocus={true}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-2">
                  <label htmlFor="password">Password:</label>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    autoComplete="false"
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-xs-2 col-md-4">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <div className="col-xs-2 col-md-4">
                  <label className="btn btn-success">Sign-Up</label>
                  {/* Here we can put some registration link */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
