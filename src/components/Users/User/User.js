/*
* User.js
*
*/
import React, {Component} from 'react';
import {FormControl, FormGroup, ControlLabel, PageHeader} from 'react-bootstrap';

import classes from "./User.css";
import axios from "../../../axios-survey";

class User extends Component {
    constructor(props)  {
        super(props);
        this.fetchUserData(this.props.user_id);
    }

    fetchUserData = (user_id) => {
        axios.get(`/users/${user_id}`) //
        .then(response => {
            this.setState({
                user_id: response.data[0].accountFK,
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                email: response.data[0].email,
                phone: response.data[0].phone,
                streetAddress: response.data[0].streetAddress,
                postalCode: response.data[0].postalCode,
                dateofbirth: response.data[0].birthdate,
                rewards: response.data[0].rewards,
                lastEdited: response.data[0].modifiedDate
            });
            console.log(`fetchUserData, response.data:`,  response.data);
        });
    };

    state = {
        id: this.props.user_id,
        firstname: "",
        lastname: "",
        email: "",
        dateofbirth: "",
        phone: "",
        streetAddress: "",
        postalCode: "",
        rewards: "",
        lastEdited: ""
    };

    handleDataChange = (event) => {
        this.setState({firstname: event.target.value});
        // console.log(`state  name: ${this.state.firstname}`);
        // console.log(`event target name: ${event.target.name}`);
        // console.log(`event target value: ${event.target.value}`);
    };


    logState = () => {
        for (const key of Object.keys(this.state)) {
            console.log(key, this.state[key]);
        }
    };

    render() {

        return (
            <div>
                <PageHeader>Personal Data</PageHeader>
                {/*<button className="btn btn-success" onClick={this.logState}>Log</button>*/}
                <hr/>
                <form className={classes.Form}>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="firstname">First Name</ControlLabel>
                        <FormControl className={classes.Input} type="text" name="firstname" id="firstname"
                               onChange={this.handleDataChange} defaultValue={this.state.firstname}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="lastname">Last Name</ControlLabel>
                        <FormControl className={classes.Input} type="text" name="lastname" id="lastname"
                               defaultValue={this.state.lastname}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="email">Email</ControlLabel>
                        <FormControl className={classes.Input} type="text" name="email" id="confirmPassword"
                               defaultValue={this.state.email}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="dateofbirth">Date of Birth</ControlLabel>
                        <FormControl className={classes.Input} type="date" name="dateofbirth"
                               id="dateofbirth"
                               defaultValue={this.state.dateofbirth}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="phone">Phone</ControlLabel>
                        <FormControl className={classes.Input} type="text" name="phone" id="phone"
                               defaultValue={this.state.phone}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="streetAddress">Street Address</ControlLabel>
                        <FormControl className={classes.Input} type="text" name="streetAddress"
                               id="streetAddress"
                               defaultValue={this.state.streetAddress}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="postalCode">Postal Code</ControlLabel>
                        <FormControl className={classes.Input} type="text" name="postalCode"
                               id="postalCode"
                               defaultValue={this.state.postalCode}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="rewards">Rewards</ControlLabel>
                        <FormControl className={classes.Input} readOnly={true} type="number"
                               name="rewards" id="rewards"
                               value={this.state.rewards}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="lastEdited">Account Last Edited</ControlLabel>
                        <FormControl className={classes.Input} readOnly={true}
                               type="date" name="lastEdited"
                               id="lastEdited"
                               value={this.state.lastEdited}/>
                    </FormGroup>
                </form>
            </div>
    );
    }
    }

    export default User;