/*
 * App.js
 *
 */
import React, {Component} from 'react';
import {NavLink, Route, withRouter, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from '../axios-survey';

import {
    asyncFetchFirstName,
    setUserAccountFK,
    setAccountId,
    asyncLoginUser,
    logoutUser
} from '../store/actions/';

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
import SurveyForm from '../components/Surveys/Survey/SurveyForm';
import Result from '../components/Chart/Result';
import Login from '../components/Login/Login';
import AuthHandler from '../components/Login/AuthHandler';

class App extends Component {
    AuthHandler = new AuthHandler();

    componentDidMount() {
        // this.props.onFetchFirstname(this.props.app.account_id);
        //         // this.props.onSetAccountId(this.props.app.account_id);
        //         // this.props.onSetUserAccountFK(this.props.app.account_id);
        console.log('App, componentDidMount, props', this.props);
        // if (!this.props.app.loggedIn) {
        //     this.props.history.push("/registration");
        // }
        this._btnCheck();
        console.log("App, componentDidMount, authHandler, logged in?", this.AuthHandler.loggedIn());
        if (this.AuthHandler.loggedIn()) {
            console.log("App, componentDidMount, auth handler get data id", this.AuthHandler.getData().id);
            this.props.onLoginUser(this.AuthHandler.getData().id);
        }
        else {console.log("Passed!")}
    }

    _btnCheck() {
        if (this.AuthHandler.loggedIn()) {
            document.getElementById('logout-btn').style.display = 'block';
            document.getElementById('login-btn').style.display = 'none';
        } else {
            document.getElementById('logout-btn').style.display = 'none';
            document.getElementById('login-btn').style.display = 'block';
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // console.log("App, shouldComponentUpdate, this.props", this.props, "nextProps", nextProps);
        // if (this.props.app !== nextProps.app) {
        //     return true;
        // }
        // if (this.props.app.user_id !== nextProps.app.user_id) {
        //     return true;
        // }
        return true;
    }

    componentDidUpdate() {
        // console.log("App, componentDidUpdate, this.props.app", this.props.app);
        this._btnCheck();
        // console.log("App, componentDidUpdate, btnCheck");
        const token = localStorage.getItem('id_token');
        // console.log("App, componentDidUpdate, token", token);
        if (token && token !== "undefined") {
            //const expired = this.AuthHandler.isTokenExpired(token);
            // console.log("App, componentDidUpdate, expired?", expired);
            if ( this.AuthHandler.isTokenExpired(token)) {
                alert('token has expired');
                this._handleLogout();
            }
        //     else if (this.AuthHandler.loggedIn() && !this.props.app.logged_in) {
        //         // this.props.onLoginUser(this.AuthHandler.getData().id);
        //         // console.log("App, componentDidUpdate, auth logged in, props not logged in, user id", this.AuthHandler.getData().id, "proops", this.props);
        //     } else {
        //         // console.log("!!!App, componentDidUpdate, auth logged in, props logged in, user id", this.AuthHandler.getData().id, "props", this.props);
        //     }
        }
    }

    _handleLogout = () => {
        console.log("App, handleLogout");
        this.AuthHandler.logout();
        this.props.onLogoutUser();
        this.props.history.replace('/login');
    };

    render() {
        // if (this.props.app.loggedIn) {
        // if (true) {
        return (
            <div className={classes.App}>
                {!this.props.app.logged_in ? null :
                    <header className={classes.header}>
                        <p>Hello, {this.props.app.firstname}!</p>
                    </header>
                }
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/account" component={Account}/>
                    <Route path="/user" component={User}/>
                    {/*<Route path="/home" component={HomePage}/>*/}
                    <Route path="/surveybuilder" component={SurveyBuilder}/>
                    <Route path="/surveysmanager" component={SurveysManager}/>
                    <Route path="/accountsmanager" component={AccountsManager}/>
                    <Route path="/usersmanager" component={UsersManager}/>
                    <Route path="/registration" component={UserForm}/>
                    <Route path="/surveys" component={SurveysList}/>
                    <Route path="/survey" exact component={SurveyForm}/>
                    <Route path="/result" component={Result}/>
                    <Route path="/login" component={Login}/>
                    <Redirect to="/home"/>
                </Switch>
                {/*{!this.props.app.loggedIn ? null :*/}
                <nav className={classes.nav}>
                    <ul className={classes.list}>
                        <li className={classes.link}>
                            <NavLink to="/home">Home</NavLink>
                        </li>
                        <br/>
                        {/*<li className={classes.link}><NavLink to="/account">Account</NavLink></li>*/}
                        {/*<br/>*/}
                        {/*<li className={classes.link}><NavLink to="/user">Personal Data</NavLink></li>*/}
                        {/*<br/>*/}
                        {/*<li className={classes.link}><NavLink to="/surveybuilder">Survey Builder</NavLink></li>*/}
                        {/*<br/>*/}
                        <li className={classes.link}>
                            <NavLink to="/surveysmanager">Surveys Manager</NavLink>
                        </li>
                        <br/>
                        <li className={classes.link}>
                            <NavLink to="/accountsmanager">Accounts Manager</NavLink>
                        </li>
                        <br/>
                        <li className={classes.link}>
                            <NavLink to="/usersmanager">Users Manager</NavLink>
                        </li>
                        <br/>
                        {/*<li className={classes.link}><NavLink to="/registration">Registration</NavLink></li>*/}
                        {/*<br/>*/}
                        <li className={classes.link}>
                            <NavLink to="/surveys">Surveys</NavLink>
                        </li>
                        <br/>
                        <li className={classes.link}>
                            <NavLink exact to="/survey">
                                Survey
                            </NavLink>
                        </li>
                        <br/>
                        <li className={classes.link}>
                            <NavLink to="/result">Result</NavLink>
                        </li>
                        <br/>
                        <div id="login-btn">
                            <li className={classes.link}>
                                <NavLink to="/login">
                                    <button className="btn btn-primary">Login</button>
                                </NavLink>
                            </li>
                            <br/>
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
                            <br/>
                        </div>
                    </ul>
                </nav>
                {/*}*/}

                {/*<Redirect to={Registration}/>*/}
            </div>
        );
        // }
        // } else {
        //     this.props.history.push("/registration");
        //     return null;
        //     // return (<div className={classes.App}><Redirect to={Registration}/></div>);
        // }
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
