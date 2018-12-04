/*
 * HomePage.js
 *
 */

import React, { Component } from 'react';
import {
  NavLink
  //    Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import { PageHeader } from 'react-bootstrap';

import classes from './HomePage.css';

import Protected from '../Login/Protected';

// import Account from "../Accounts/Account/Account";
// import User from "../Users/User/User";

class HomePage extends Component {
  render() {
    return (
      <div>
        {/*<PageHeader>Welcome {this.props.name}!</PageHeader>*/}
        {/*<Route path="/account" render={ () => <Account user_id={this.props.user.user_id} isAuthenticated={true}/> }/>*/}
        {/*<Route path="/user" render={ () => <User user_id={this.props.user.user_id} isAuthenticated={true}/> }/>*/}
        {/*<Route path="/home"  render={() => <HomePage name={this.state.name}/>}/>*/}
        <PageHeader>Select from following</PageHeader>
        <ul className={classes.list}>
          <li className={classes.link}>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className={classes.link}>
            <NavLink to="/account">Account</NavLink>
          </li>
          <li className={classes.link}>
            <NavLink to="/user">Personal Data</NavLink>
          </li>
          <li className={classes.link}>
            <NavLink to="/surveybuilder">Survey Builder</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('HomePage, mapStateToProps, state', state);
  return {};
};

export default Protected(connect(mapStateToProps)(HomePage));
