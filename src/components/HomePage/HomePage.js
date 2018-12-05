/*
* HomePage.js
*
*/

import React, {Component} from 'react';
import {
    NavLink,
    // Redirect
} from "react-router-dom";
import {connect} from 'react-redux';

import {PageHeader} from 'react-bootstrap';

// import Registration from "../Registration/UserForm";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./HomePage.css";
import Protected from "../Login/Protected";
// import Account from "../Accounts/Account/Account";
// import User from "../Users/User/User";

class HomePage extends Component {
    render() {
        return (
            <div className={classes.homePage}>
                {/*<PageHeader>Welcome {this.props.name}!</PageHeader>*/}
                {/*<Route path="/account" render={ () => <Account user_id={this.props.user.user_id} isAuthenticated={true}/> }/>*/}
                {/*<Route path="/user" render={ () => <User user_id={this.props.user.user_id} isAuthenticated={true}/> }/>*/}
                {/*<Route path="/home"  render={() => <HomePage name={this.state.name}/>}/>*/}
                {/*{!this.props.app.loggedIn ? <Redirect to={Registration}/> :*/}
                    <Aux>
                        <PageHeader>Select from following</PageHeader>
                        <ul className={classes.list}>
                            {/*<li className={classes.link}><NavLink to="/home">Home</NavLink></li>*/}
                            {/*<li className={classes.link}><NavLink to="/account">Account</NavLink></li>*/}
                            {/*<li className={classes.link}><NavLink to="/user">Personal Data</NavLink></li>*/}
                            {/*<li className={classes.link}><NavLink to="/surveybuilder">Survey Builder</NavLink></li>*/}
                            <li className={classes.link}><NavLink to="/surveysmanager">Manage Surveys</NavLink></li>
                            <li className={classes.link}><NavLink to="/accountsmanager">Manage Accounts</NavLink></li>
                            <li className={classes.link}><NavLink to="/usersmanager">Manage Users</NavLink></li>
                            <li className={classes.link}><NavLink to="/surveys">Take a Survey</NavLink></li>
                        </ul>
                    </Aux>
                {/*}*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("HomePage, mapStateToProps, state", state);
    return {
        app: state.app
    }
};


export default Protected(connect(mapStateToProps)(HomePage));