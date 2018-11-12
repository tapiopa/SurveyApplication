/*
* HomePage.js
*
*/

import React, {Component} from 'react';
// import {NavLink, Route} from 'react-router-dom';
import {PageHeader} from 'react-bootstrap';

import classes from "./HomePage.css";
import {NavLink, Route} from "react-router-dom";
import Account from "../Accounts/Account/Account";
import User from "../Users/User/User";

class HomePage extends Component {
    render() {
        return (
            <div>
                {/*<PageHeader>Welcome {this.props.name}!</PageHeader>*/}
                <Route path="/account" render={ () => <Account user_id={this.state.user_id} isAuthenticated={true}/> }/>
                <Route path="/user" render={ () => <User user_id={this.state.user_id} isAuthenticated={true}/> }/>
                {/*<Route path="/home"  render={() => <HomePage name={this.state.name}/>}/>*/}
                <PageHeader>Select from following</PageHeader>
                <ul className={classes.list}>
                    <li className={classes.link}><NavLink to="/home">Home</NavLink></li>
                    <li className={classes.link}><NavLink to="/account">Account</NavLink></li>
                    <li className={classes.link}><NavLink to="/user">Personal Data</NavLink></li>

                </ul>
            </div>
        );
    }
}

export default HomePage;