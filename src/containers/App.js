/*
 * App.js
 *
 */
import React, { Component } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  asyncFetchFirstName,
  setUserAccountFK,
  setAccountId
} from '../store/actions/';

import classes from './App.css';

import Account from '../components/Accounts/Account/Account';
import User from '../components/Users/User/User';
import HomePage from '../components/HomePage/HomePage';
import SurveyBuilder from '../components/Surveys/SurveyBuilder/SurveyBuilder';
import SurveysManager from '../components/Surveys/SurveysManager/SurveysManager';
import AccountsManager from '../components/Accounts/AccountsManager/AccountsManager';
import UsersManager from '../components/Users/UsersManager/UsersManager';
import Result from '../components/Chart/Result';
import Login from '../components/Login/Login';
import AuthHandler from '../components/Login/AuthHandler';
class App extends Component {
  AuthHandler = new AuthHandler();

  constructor(props) {
    super(props);
    this.state = {
      sec: 0,
      min: 0,
      exp: 0,
      user: ''
    };
  }

  _btnCheck() {
    if (this.AuthHandler.loggedIn) {
      document.getElementById('logout-btn').style.display = 'block';
      document.getElementById('login-btn').style.display = 'none';
    } else {
      document.getElementById('logout-btn').style.display = 'none';
      document.getElementById('login-btn').style.display = 'block';
    }
  }

  componentDidMount() {
    this.props.onFetchFirstname(this.props.app.account_id);
    this.props.onSetAccountId(this.props.app.account_id);
    this.props.onSetUserAccountFK(this.props.app.account_id);
    console.log('App, componentDidMount, props', this.props);
  }

  componentDidUpdate() {
    if (this.AuthHandler.isTokenExpired(localStorage.getItem('id_token'))) {
      alert('token has expired');
      this._handleLogout();
    }
  }

  _handleLogout = () => {
    this.AuthHandler.logout();
    this.props.history.replace('/login');
  };

  render() {
    return (
      <div className={classes.App}>
        <header className={classes.header}>
          <p>{this.props.app.firstname}</p>
          {/* <p>
            Your Login will expire after {this.state.min} : {this.state.sec}
          </p> */}
        </header>
        <Route path="/account" component={Account} />
        <Route path="/user" component={User} />
        <Route path="/home" component={HomePage} />
        <Route path="/surveybuilder" component={SurveyBuilder} />
        <Route path="/surveysmanager" component={SurveysManager} />
        <Route path="/accountsmanager" component={AccountsManager} />
        <Route path="/usersmanager" component={UsersManager} />
        <Route path="/result" component={Result} />
        <Route path="/login" component={Login} />
        <nav className={classes.nav}>
          <ul className={classes.list}>
            <li className={classes.link}>
              <NavLink to="/home">Home</NavLink>
            </li>
            <br />
            <li className={classes.link}>
              <NavLink to="/account">Account</NavLink>
            </li>
            <br />
            <li className={classes.link}>
              <NavLink to="/user">Personal Data</NavLink>
            </li>
            <br />
            <li className={classes.link}>
              <NavLink to="/surveybuilder">Survey Builder</NavLink>
            </li>
            <br />
            <li className={classes.link}>
              <NavLink to="/surveysmanager">Surveys Manager</NavLink>
            </li>
            <br />
            <li className={classes.link}>
              <NavLink to="/accountsmanager">Accounts Manager</NavLink>
            </li>
            <br />
            <li className={classes.link}>
              <NavLink to="/usersmanager">Users Manager</NavLink>
            </li>
            <br />
            <li className={classes.link}>
              <NavLink to="/result">Result</NavLink>
            </li>
            <br />
            <div id="login-btn">
              <li className={classes.link}>
                <NavLink to="/login">
                  <button className="btn btn-primary">Login</button>
                </NavLink>
              </li>
              <br />
            </div>
            <div id="logout-btn">
              <li className={classes.link}>
                <button
                  className="btn btn-warning"
                  onClick={this._handleLogout}
                >
                  Logout
                </button>
              </li>
              <br />
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app,
    account: state.account
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFirstname: account_id => dispatch(asyncFetchFirstName(account_id)),
    onSetAccountId: account_id => dispatch(setAccountId(account_id)),
    onSetUserAccountFK: accountId => dispatch(setUserAccountFK(accountId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
