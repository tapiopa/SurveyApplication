/*
* Account.js
*
*/

import React, {Component} from 'react';
import {FormControl, FormGroup, ControlLabel, PageHeader, Button, ButtonToolbar} from 'react-bootstrap';

import classes from "./Account.css";
// import "./Account.css";

class Account extends Component {

    state = {
        id: this.props.user_id,
        username: "user1",
        password: "user1",
        joined: "2018-07-07",
        expires: "2019-07-07",
        lastEdited: "2018-11-08",
        Google: "omnomnom",
        Facebook: "",
        Twitter: ""
    };

    logState = () => {
        for (const key of Object.keys(this.state)) {
            console.log(key, this.state[key]);
        }
    };

    render() {


        return (
            <div>
                <PageHeader>Account</PageHeader>
                <hr/>
                <ButtonToolbar>
                    <Button bsStyle="success" bsSize="small"
                            // bsClass={classes.button}
                            onClick={this.logState}>Log</Button>
                </ButtonToolbar>
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

            </div>
        );
    }
}

export default Account;
