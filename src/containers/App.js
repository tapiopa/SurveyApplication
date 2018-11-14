/*
* App.js
*
*/
import React, {Component} from 'react';
import {NavLink, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './App.css';

import Account from "../components/Accounts/Account/Account";
import User from "../components/Users/User/User";
import HomePage from "../components/HomePage/HomePage";
import SurveyBuilder from "../components/Surveys/SurveyBuilder/SurveyBuilder";
import AddQuestion from "../components/Surveys/SurveyBuilder/NewQuestion";
import AddAnswer from "../components/Surveys/SurveyBuilder/AddAnswer";

class App extends Component {
    // state = {
    //     user: {
    //         user_id: 1,
    //         name: "Tapio"
    //     },
    //     survey_id: 1
    // };

    render() {

        //console.log("App, props", store.getState());
        return (
            <div className={classes.App}>
                <header className={classes.header}>
                    <p>{this.props.user.name}</p>
                </header>
                <nav className={classes.nav}>
                    <ul className={classes.list}>
                        <li><NavLink to="/home" className={classes.link}>Home</NavLink></li>
                        <li><NavLink to="/account" className={classes.link}>Account</NavLink></li>
                        <li><NavLink to="/user" className={classes.link}>Personal Data</NavLink></li>
                        <li><NavLink to="/surveybuilder" className={classes.link}>Survey Builder</NavLink></li>
                    </ul>
                </nav>

                <Route path="/account" render={() => <Account user_id={this.props.user.user_id} isAuthenticated={true}/>}/>
                <Route path="/user" render={ () => <User user_id={this.props.user.user_id} isAuthenticated={true}/> }/>
                <Route path="/home"  render={() => <HomePage name={this.props.user.name}/>}/>
                <Route path="/surveybuilder" render={() => <SurveyBuilder store={this.props.store}/>}/>
                <Route path="/addquestion" component={AddQuestion}/>
                <Route path="/addanswer" component={AddAnswer}/>
                {/*<PageHeader>Welcome {this.state.name}!</PageHeader>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {
            user_id: state.user_id,
            name: state.name
        }
    }
};

export default connect(mapStateToProps)(App);
