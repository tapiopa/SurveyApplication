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

import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./HomePage.css";
import Protected from "../Login/Protected";

class HomePage extends Component {
    render() {
        return (
            <div className={classes.homePage}>
                    <Aux>
                        <PageHeader>Select from following</PageHeader>
                        <ul className={classes.list}>
                            <li className={classes.link}><NavLink to="/surveysmanager">Manage Surveys</NavLink></li>
                            <li className={classes.link}><NavLink to="/accountsmanager">Manage Accounts</NavLink></li>
                            <li className={classes.link}><NavLink to="/usersmanager">Manage Users</NavLink></li>
                            <li className={classes.link}><NavLink to="/surveys">Take a Survey</NavLink></li>
                        </ul>
                    </Aux>
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