/*
* App.js
*
*/
import React, {Component} from 'react';
import {NavLink, Route, withRouter, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from "../axios-survey";

import {asyncFetchFirstName, setUserAccountFK, setAccountId, asyncLoginUser} from "../store/actions/";

import classes from './App.css';
// import Aux from "../hoc/Aux/Aux";
// import Registration from "../components/Registration/UserForm";
import Account from "../components/Accounts/Account/Account";
import User from "../components/Users/User/User";
import HomePage from "../components/HomePage/HomePage";
import SurveyBuilder from "../components/Surveys/SurveyBuilder/SurveyBuilder";
import SurveysManager from "../components/Surveys/SurveysManager/SurveysManager";
import AccountsManager from "../components/Accounts/AccountsManager/AccountsManager";
import UsersManager from "../components/Users/UsersManager/UsersManager";
import UserForm from "../components/Registration/UserForm";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import SurveysList from "../components/Surveys/SurveysList/SurveysList";

class App extends Component {
    componentDidMount() {
        // this.props.onFetchFirstname(this.props.app.account_id);
        //         // this.props.onSetAccountId(this.props.app.account_id);
        //         // this.props.onSetUserAccountFK(this.props.app.account_id);
        console.log("App, componentDidMount, props", this.props);
        if (!this.props.app.loggedIn) {
            this.props.history.push("/registration");
        }
        // this.props.onLoginUser(26);
    }

    render() {
        // if (this.props.app.loggedIn) {
            // if (true) {
            return (
                <div className={classes.App}>
                    <header className={classes.header}>
                        <p>Hello, {this.props.app.firstname}!</p>
                    </header>
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
                        <Redirect to="/home"/>
                    </Switch>
                    {!this.props.app.loggedIn ? null :
                        <nav className={classes.nav}>
                            <ul className={classes.list}>
                                <li className={classes.link}><NavLink to="/home">Home</NavLink></li>
                                <br/>
                                {/*<li className={classes.link}><NavLink to="/account">Account</NavLink></li>*/}
                                {/*<br/>*/}
                                {/*<li className={classes.link}><NavLink to="/user">Personal Data</NavLink></li>*/}
                                {/*<br/>*/}
                                {/*<li className={classes.link}><NavLink to="/surveybuilder">Survey Builder</NavLink></li>*/}
                                {/*<br/>*/}
                                <li className={classes.link}><NavLink to="/surveysmanager">Surveys Manager</NavLink>
                                </li>
                                <br/>
                                <li className={classes.link}><NavLink to="/accountsmanager">Accounts Manager</NavLink>
                                </li>
                                <br/>
                                <li className={classes.link}><NavLink to="/usersmanager">Users Manager</NavLink></li>
                                <br/>
                                {/*<li className={classes.link}><NavLink to="/registration">Registration</NavLink></li>*/}
                                {/*<br/>*/}
                                <li className={classes.link}><NavLink to="/surveys">Surveys</NavLink></li>
                                <br/>
                            </ul>
                        </nav>
                    }

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

const mapStateToProps = (state) => {
    return {
        app: state.app,
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchFirstname: (account_id) => dispatch(asyncFetchFirstName(account_id)),
        onSetAccountId: (account_id) => dispatch(setAccountId(account_id)),
        onSetUserAccountFK: (accountId) => dispatch(setUserAccountFK(accountId)),
        onLoginUser: (user_id) => dispatch(asyncLoginUser(user_id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(App, axios)));
