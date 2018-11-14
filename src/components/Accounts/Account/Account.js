/*
* Account.js
*
*/

import React, {Component} from 'react';
import {FormControl, FormGroup, ControlLabel, PageHeader, Button, ButtonToolbar} from 'react-bootstrap';

import classes from "./Account.css";
import axios from "../../../axios-survey";
// import "./Account.css";

class Account extends Component {
    constructor(props)  {
        super(props);
        this.fetchAccountData(this.props.user_id);
    }

    state = {
        user_id: this.props.user_id,
        username: "",
        password: "",
        joined: "",
        expires: "",
        lastEdited: "",
        Google: "",
        Facebook: "",
        Twitter: ""
    };

    logState = () => {
        for (const key of Object.keys(this.state)) {
            console.log(key, this.state[key]);
        }
    };

    fetchAccountData = (user_id) => {
        axios.get(`/accounts/${user_id}`) //
        .then(response => {
            this.setState({
                user_id: response.data[0].id,
                username: response.data[0].account,
                password: response.data[0].password,
                joined: response.data[0].joinedDate,
                expires: response.data[0].expireDate,
                lastEdited: response.data[0].modifiedDate
            });
        });
    };

    render() {


        return (
            <div>
                <PageHeader>Account</PageHeader>
                <hr/>
                {/*<ButtonToolbar>*/}
                    {/*<Button bsStyle="success" bsSize="small"*/}
                            {/*// bsClass={classes.button}*/}
                            {/*onClick={this.logState}>Log</Button>*/}
                {/*</ButtonToolbar>*/}
                <form className={classes.form}>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="username">Username</ControlLabel>
                        <FormControl className={classes.input} type="text" name="username" id="username" defaultValue={this.state.username}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="password">Password</ControlLabel>
                        <FormControl className={classes.input} type="password" name="password" id="password"
                               defaultValue={this.state.password}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="confirmPassword">Confirm Password</ControlLabel>
                        <FormControl className={classes.input} type="password"
                               name="confirmPassword"
                               id="confirmPassword"
                               defaultValue=""/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="joined">Joined Date</ControlLabel>
                        <FormControl className={classes.input} disabled="disabled" type="date" name="joined" id="joined"
                               defaultValue={this.state.joined}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="expires">Account Expires</ControlLabel>
                        <FormControl className={classes.input} disabled="disabled" type="date" name="expires"
                               id="expires" defaultValue={this.state.expires}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="lastEdited">Account Last Edited</ControlLabel>
                        <FormControl className={classes.input} disabled="disabled" type="date" name="lastEdited"
                               id="lastEdited"
                               defaultValue={this.state.lastEdited}/>
                    </FormGroup>
                </form>
                {/*<Button onClick={this.fetchAccountData} bsStyle="success">Fetch data</Button>*/}
            </div>
        );
    }
}

export default Account;
