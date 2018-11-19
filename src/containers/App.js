/*
* App.js
*
*/
import React, {Component} from 'react';
import {NavLink, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {asyncFetchFirstname} from "../store/actions/appActions";

import classes from './App.css';

import Account from "../components/Accounts/Account/Account";
import User from "../components/Users/User/User";
import HomePage from "../components/HomePage/HomePage";
import SurveyBuilder from "../components/Surveys/SurveyBuilder/SurveyBuilder";

class App extends Component {
    componentDidMount() {
        this.props.onFetchFirstname(this.props.account.id);
    }

    render() {
        return (
            <div className={classes.App}>
                <header className={classes.header}>
                    <p>{this.props.app.firstname}</p>
                </header>
                <nav className={classes.nav}>
                    <ul className={classes.list}>
                        <li className={classes.link}><NavLink to="/home">Home</NavLink></li>
                        <br/>
                        <li className={classes.link}><NavLink to="/account">Account</NavLink></li>
                        <br/>
                        <li className={classes.link}><NavLink to="/user">Personal Data</NavLink></li>
                        <br/>
                        <li className={classes.link}><NavLink to="/surveybuilder">Survey Builder</NavLink></li>
                        <br/>
                    </ul>
                </nav>

                <Route path="/account" component={Account}/>
                <Route path="/user" component={User}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/surveybuilder" component={SurveyBuilder}/>
            </div>
        );
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
        onFetchFirstname: (account_id) => dispatch(asyncFetchFirstname(account_id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
