import React, {Component} from 'react';
import {NavLink, Route, withRouter, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from '../axios-survey';

import { asyncFetchFirstName, setUserAccountFK, setAccountId, asyncLoginUser, logoutUser} from '../store/actions/';

import classes from './App.css';
// import Auxiliary from "../hoc/Auxiliary/Auxiliary";
// import Registration from "../components/Registration/UserForm";
import Account from '../components/Accounts/Account/Account';
import User from '../components/Users/User/User';
import HomePage from '../components/HomePage/HomePage';
import SurveyBuilder from '../components/Surveys/SurveyBuilder/SurveyBuilder';
import SurveysManager from '../components/Surveys/SurveysManager/SurveysManager';
import AccountsManager from '../components/Accounts/AccountsManager/AccountsManager';
import UsersManager from '../components/Users/UsersManager/UsersManager';
import UserForm from '../components/Registration/UserForm';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import SurveysList from '../components/Surveys/SurveysList/SurveysList';
import Result from '../components/Chart/Result';
import Login from '../components/Login/Login';
import AuthHandler from '../components/Login/AuthHandler';

import Header from './Header';

class App extends Component {
  AuthHandler = new AuthHandler();
  constructor(){
    super();
      this.state = {
        id: ''
      };
  }
  componentDidMount() {
    // this.props.onFetchFirstname(this.props.app.account_id);
    //         // this.props.onSetAccountId(this.props.app.account_id);
    //         // this.props.onSetUserAccountFK(this.props.app.account_id);
    console.log('App, componentDidMount, props', this.props);

    // this._btnCheck();
    // this._navCheck();
      if (this.AuthHandler.loggedIn() && this.AuthHandler.tokenCheck()) {
        this.props.onLoginUser(this.AuthHandler.getData().id);
        this._setInfo();
      }      

  }

  _setInfo(){
    this.setState({ id: this.AuthHandler.getData().id}, function () {
        console.log("state for the props: "  + this.state.id);
  });
  }
  _navCheck(){
    if (this.AuthHandler.loggedIn() && this.AuthHandler.tokenCheck()) {
      if(this.AuthHandler.getData().type === "admin"){
        document.getElementById("adminOnly").style.display = "block";
        document.getElementById("companyOnly").style.display = "block";
      }
      else if(this.AuthHandler.getData().type === "company"){
        document.getElementById("companyOnly").style.display = "block";
        document.getElementById("adminOnly").style.display = "none";
      }
      else {
        document.getElementById("adminOnly").style.display = "none";
        document.getElementById("companyOnly").style.display = "none";
      }
    } else {
      document.getElementById("adminOnly").style.display = "none";
      document.getElementById("companyOnly").style.display = "none";
    }
  }
  // _btnCheck() {
  //   if (this.AuthHandler.loggedIn() && this.AuthHandler.tokenCheck()) {
  //     document.getElementById('logout-btn').style.display = 'block';
  //     document.getElementById('login-btn').style.display = 'none';
  //   } else {
  //     document.getElementById('logout-btn').style.display = 'none';
  //     document.getElementById('login-btn').style.display = 'block';
  //   }
  // }

    _handleLogout = () => {
        console.log("App, handleLogout");
        this.AuthHandler.logout();
        this.props.onLogoutUser();
        this.props.history.replace('/login');
    };

  componentDidUpdate() {
    // this._navCheck();
    // this._btnCheck();
    if (this.AuthHandler.isTokenExpired(localStorage.getItem('id_token'))) {
      alert('token has expired');
      this._handleLogout();
    }
  }

  render() {
    return (
      <div className={classes.App}>
        {/*<header className={classes.header}>
          {!this.props.app.logged_in ? null :  <p>Hello {this.props.app.firstname}!</p>}
    <div id="logout-btn">
            <button
              className="btn btn-warning"
              onClick={this._handleLogout}
            >
              Logout
            </button>
        </div>

        <div id="login-btn">
          <NavLink to="/login">
            <button className="btn btn-primary">Login</button>
          </NavLink>
      </div>
    </header>*/}
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/account" component={Account}/>
          <Route path="/user" component={User} />
          {/*<Route path="/home" component={HomePage}/>*/}
          <Route path="/surveybuilder" component={SurveyBuilder} />
          <Route path="/surveysmanager" component={SurveysManager} />
          <Route path="/accountsmanager" component={AccountsManager} />
          <Route path="/usersmanager" component={UsersManager} />
          <Route path="/registration" component={UserForm} />
          <Route path="/surveys" component={SurveysList} />
          <Route path="/result" component={Result} />
          <Route path="/login" component={Login}/>
          <Redirect to="/home" />
        </Switch>
        {/*{!this.props.app.loggedIn ? null :*/}
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
              <NavLink to="/user">User</NavLink>
            </li>
            <br />
            {/*<li className={classes.link}><NavLink to="/account">Account</NavLink></li>*/}
            {/*<br/>*/}
            {/*<li className={classes.link}><NavLink to="/user">Personal Data</NavLink></li>*/}
            {/*<br/>*/}
            {/*<li className={classes.link}><NavLink to="/surveybuilder">Survey Builder</NavLink></li>*/}
            {/*<br/>*/}
            <div id="adminOnly">
            <li className={classes.link} title="Edit the survey" name="adminOnly">
              <NavLink to="/surveysmanager">Surveys Manager</NavLink>
            </li>
            <br />
            <li className={classes.link} title="Edit the accounts" name="adminOnly">
              <NavLink to="/accountsmanager">Accounts Manager</NavLink>
            </li>
            <br />
            <li className={classes.link} title="Edit the user information" name="adminOnly">
              <NavLink to="/usersmanager">Users Manager</NavLink>
            </li>
            <br />
            </div>
            {/*<li className={classes.link}><NavLink to="/registration">Registration</NavLink></li>*/}
            {/*<br/>*/}
            <li className={classes.link} title="Take the survey which is available">
              <NavLink to="/surveys">List of Surveys</NavLink>
            </li>
            <br />
            <div id="companyOnly">
              <li className={classes.link} title="Check survey result with chart" name="companyOnly">
                <NavLink to="/result">Result</NavLink>
              </li>
              <br />
              <li className={classes.link}>
              <NavLink to="/surveybuilder">SurveyBuilder</NavLink>
            </li>
            <br />
            </div>
          </ul>
        </nav>
        <Header/>
</div>
);
}//this is end of render
}//This is end of class

    

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
        onSetUserAccountFK: accountId => dispatch(setUserAccountFK(accountId)),
        onLoginUser: user_id => dispatch(asyncLoginUser(user_id)),
        onLogoutUser: () => dispatch(logoutUser())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withErrorHandler(App, axios))
);
