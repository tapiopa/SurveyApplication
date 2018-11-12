/*
* App.js
*
*/
import React, {Component} from 'react';
import {NavLink, Route} from 'react-router-dom';

import classes from './App.css';

import Account from "../components/Accounts/Account/Account";
import User from "../components/Users/User/User";
import HomePage from "../components/HomePage/HomePage";
import SurveyBuilder from "../components/Surveys/SurveyBuilder/SurveyBuilder";
import AddQuestion from "../components/Surveys/SurveyBuilder/NewQuestion";
import AddAnswer from "../components/Surveys/SurveyBuilder/AddAnswer";

class App extends Component {
    state = {
        user: {
            user_id: "garblegarbleFROMAPPJS",
            name: "Tapio"
        }

    };

    render() {


        return (
            <div className={classes.App}>
                <header className={classes.header}>
                    <p>{this.state.name}</p>
                </header>
                <nav className={classes.nav}>
                    <ul className={classes.list}>
                        <li><NavLink to="/home" className={classes.link}>Home</NavLink><br/></li>
                        <li><NavLink to="/account" className={classes.link}>Account</NavLink></li>
                        <li><NavLink to="/user" className={classes.link }>Personal Data</NavLink></li>
                        <li className={classes.link}><NavLink to="/surveybuilder">Build a Survey</NavLink></li>
                    </ul>
                </nav>

                <Route path="/account" render={ () => <Account user_id={this.state.user_id} isAuthenticated={true}/> }/>
                <Route path="/user" render={ () => <User user_id={this.state.user_id} isAuthenticated={true}/> }/>
                <Route path="/home"  render={() => <HomePage name={this.state.name}/>}/>
                <Route path="/surveybuilder" component={SurveyBuilder}/>
                <Route path="/addquestion" component={AddQuestion}/>
                <Route path="/addanswer" component={AddAnswer}/>
                {/*<PageHeader>Welcome {this.state.name}!</PageHeader>*/}
            </div>
        );
    }
}

export default App;
