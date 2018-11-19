/*
* User.js
*
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FormControl, FormGroup, ControlLabel, PageHeader, Button, ButtonToolbar} from 'react-bootstrap';

import classes from "./User.css";
// import axios from "../../../axios-survey";
import moment from 'moment';

import {
    asyncFetchUser,
    asyncSaveUser,
    asyncListUsers,
    asyncCreateUser,
    asyncDeleteUser
} from "../../../store/actions/userActions";

import DatePicker from "react-datepicker/es";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            firstname: "",
            lastname: "",
            email: "",
            birthdate: "",
            phone: "",
            streetAddress: "",
            postalCode: "",
            rewards: "",
            modifiedDate: "",
            editing: false,
            newUser: false,
            unEditedState: {
                id: null,
                firstname: "",
                lastname: "",
                email: "",
                birthdate: null,
                phone: "",
                streetAddress: "",
                postalCode: "",
                rewards: "",
                modifiedDate: null
            }
        };
        this.saveUser = this.saveUser.bind(this);
        this.listUsers= this.listUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.resetFields = this.resetFields.bind(this);
        User.formatMoment = User.formatMoment.bind(this);
        this.getMomentFromDateString = this.getMomentFromDateString.bind(this);
        this.getFormattedMoment = this.getFormattedMoment.bind(this);
        this.logState = this.logState.bind(this);
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
        this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
        this.handleStreetAddressChange = this.handleStreetAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    }

    getMomentFromDateString = (dateString) => {
        if (dateString) {
            const year = dateString.slice(0, 4);
            const month = dateString.slice(5, 7);
            const day = dateString.slice(8, 10);
            const hour = dateString.slice(11, 13);
            const min = dateString.slice(14, 16);
            const sec = dateString.slice(17, 19);
            const newDate = year + "-" + month + "-" + day + ' ' + hour + ':' + min + ':' + sec;
            return moment(newDate);
        }
        return null;
    };

    getFormattedMoment = (dateString) => {
        return this.getMomentFromDateString(dateString) ? this.getMomentFromDateString(dateString).format("DD.M.YYYY") : null;
    };

    static formatMoment(moment, withTime) {
        if (withTime) {
            return moment ? moment.format("DD.M.YYYY h:mm") : null;
        } else if (moment) {
            return moment.format("DD.M.YYYY");
        }
    }

    resetFields() {
        this.setState({
            id: null,
            firstname: "",
            lastname: "",
            email: "",
            birthdate: "",
            phone: "",
            streetAddress: "",
            postalCode: "",
            rewards: "",
            modifiedDate: moment(),
        })
    };

    cancelEditing = () => {
        this.setState({
            id: this.state.unEditedState.id,
            firstname: this.state.unEditedState.firstname,
            lastname: this.state.unEditedState.lastname,
            email: this.state.unEditedState.email,
            birthdate: this.state.unEditedState.birthdate,
            phone: this.state.unEditedState.phone,
            streetAddress: this.state.unEditedState.streetAddress,
            postalCode: this.state.unEditedState.postalCode,
            rewards: this.state.unEditedState.rewards,
            modifiedDate: this.state.unEditedState.modifiedDate,
            editing: false
        });

        // console.log("cancelEditing, AFTER account", this.state.account,
        //     "password", this.state.password);
        // document.getElementById("username").value = this.state.account;
        // // document.getElementById("password").value = " ";
    };

    addNewUser = () => {
        this.resetFields();
        this.setState({editing: true, newUser: true});
    };

    deleteUser = () => {
        // user_id = 2;
        console.log("deleteAccount, account id", this.state.id);
        this.props.onDeleteUser(this.state.id);
        this.resetFields();
    };
    listUsers = () => {
        this.props.onListUsers();
    };

    saveUser = () => {
        const saveUser = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            accountFK: this.props.user.user_id,
            email: this.state.email,
            birthdate: this.state.birthdate.format("YYYY-MM-DD"),
            phone: this.state.phone,
            streetAddress: this.state.streetAddress,
            postalCode: this.state.postalCode,
            rewards: !this.state.rewards ? 0 : this.state.rewards,
            modifiedDate: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        console.log("saveUser, user", saveUser);
        if (this.state.newUser) {
            this.props.onCreateUser(saveUser);
        } else {
            this.props.onSaveUser(saveUser);
        }
        this.setState({editing: false});
    };

    handleFirstnameChange(el) {
        // console.log("first");
        // if (el && el.target && el.target.value) {
            this.setState({firstname: el.target.value, editing: true});
        // }
    }

    handleLastnameChange(el) {
        // console.log("last");
        // if (el && el.target && el.target.value) {
            this.setState({lastname: el.target.value, editing: true});
        // }
    }

    handleEmailChange(el) {
        // console.log("enaiol");
        // if (el && el.target && el.target.value) {
            this.setState({email: el.target.value, editing: true});
        // }
    }

    handlePhoneChange(el) {
        // console.log("phone");
        // if (el && el.target && el.target.value) {
            this.setState({phone: el.target.value, editing: true});
        // }
    }

    handleStreetAddressChange(el) {
        // console.log("address");
        // if (el && el.target && el.target.value) {
            this.setState({streetAddress: el.target.value, editing: true});
        // }
    }

    handlePostalCodeChange(el) {
        // console.log("postal");
        // if (el && el.target && el.target.value) {
            this.setState({postalCode: el.target.value, editing: true});
        // }
    }

    handleBirthdateChange(date) {
        // console.log("birth");
        if (date) {
            this.setState({birthdate: date, editing: true});
        }
    }


    logState = () => {
        for (const key of Object.keys(this.state)) {
            console.log(key, this.state[key]);
        }
    };

    componentDidMount() {
        console.log("componentDidMount, props user", this.props.user);
        if (this.props.user.user_id) {
            this.props.onFetchUser(this.props.user.user_id);
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("componentDidUpdate, state", this.state, "prevProps", prevProps, "prevState", prevState);
        document.getElementById("firstname").value = this.state.firstname;
        document.getElementById("lastname").value = this.state.lastname;
        document.getElementById("email").value = this.state.email;
        document.getElementById("phone").value = this.state.phone;
        document.getElementById("streetAddress").value = this.state.streetAddress;
        document.getElementById("postalCode").value = this.state.postalCode;
    }

    componentWillReceiveProps(nextProps, nextContent) {
        // console.log("componentWillReceiveProps, nextProps", nextProps.user);
        // console.log("componentWillReceiveProps, nextContent", nextContent);
        if(nextProps.user.modifiedDate) {
            // const company = Object.assign({}, this.state.company);
            // company.id = 0;
            // company.messages = [];
            this.setState({
                id: nextProps.user.id,
                firstname: nextProps.user.firstname,
                lastname: nextProps.user.lastname,
                email: nextProps.user.email,
                birthdate: this.getMomentFromDateString(nextProps.user.birthdate),
                phone: nextProps.user.phone,
                streetAddress: nextProps.user.streetAddress,
                postalCode: nextProps.user.postalCode,
                rewards: nextProps.user.rewards,
                modifiedDate: this.getMomentFromDateString(nextProps.user.modifiedDate),
                editing: false,
                newUser: false,
                unEditedState: {
                    id: nextProps.user.id,
                    firstname: nextProps.user.firstname,
                    lastname: nextProps.user.lastname,
                    email: nextProps.user.email,
                    birthdate: this.getMomentFromDateString(nextProps.user.birthdate),
                    phone: nextProps.user.phone,
                    streetAddress: nextProps.user.streetAddress,
                    postalCode: nextProps.user.postalCode,
                    rewards: nextProps.user.rewards,
                    modifiedDate: this.getMomentFromDateString(nextProps.user.modifiedDate)
                }

            });
        }
    }

    render() {

        return (
            <div>
                <PageHeader>Personal Data</PageHeader>
                <button className="btn btn-success" onClick={this.logState}>Log</button>
                <hr/>
                <form className={classes.Form}>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="firstname">First Name</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="firstname" id="firstname"
                                     onChange={this.handleFirstnameChange}
                                     defaultValue={this.state.firstname}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="lastname">Last Name</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="lastname" id="lastname"
                                     onChange={this.handleLastnameChange}
                                     defaultValue={this.state.lastname}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="email">Email</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="email" id="email"
                                     onChange={this.handleEmailChange}
                                     defaultValue={this.state.email}/>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                        <ControlLabel className={classes.Label} htmlFor="dateofbirth">Date of Birth</ControlLabel>
                        <DatePicker  //https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
                            //https://reactdatepicker.com
                            id="dateofbirth" className={classes.datePicker}
                            dropdownMode="select" showYearDropdown showMonthDropdown
                            selected={this.state.birthdate}
                            value={User.formatMoment(this.state.birthdate)}
                            openToDate={this.state.birthdate}
                            dateFormat="D.M.YYYY" maxDate={moment()}
                            onChange={this.handleBirthdateChange}/>
                        {/*<FormControl className={classes.Input}*/}
                                     {/*type="text" name="dateofbirth" id="dateofbirth"*/}
                                     {/*defaultValue={User.formatMoment(this.state.birthdate)}/>*/}
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="phone">Phone</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="phone" id="phone"
                                     onChange={this.handlePhoneChange}
                                     defaultValue={this.state.phone}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="streetAddress">Street Address</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="streetAddress" id="streetAddress"
                                     onChange={this.handleStreetAddressChange}
                                     defaultValue={this.state.streetAddress}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="postalCode">Postal Code</ControlLabel>
                        <FormControl className={classes.Input}
                                     type="text" name="postalCode" id="postalCode"
                                     onChange={this.handlePostalCodeChange}
                                     defaultValue={this.state.postalCode}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="rewards">Rewards</ControlLabel>
                        <FormControl className={classes.Input} readOnly={true}
                                     type="number" name="rewards" id="rewards"
                                     value={this.state.rewards}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.Label} htmlFor="lastEdited">Account Last Edited</ControlLabel>
                        <FormControl className={classes.Input} readOnly={true}
                                     type="text" name="lastEdited" id="lastEdited"
                                     value={User.formatMoment(this.state.modifiedDate)}/>
                    </FormGroup>


                <ButtonToolbar className={classes.buttonToolbar}>
                    <Button disabled={this.state.editing} bsStyle="success" onClick={this.addNewUser}>
                        Add User</Button>
                    <Button disabled={this.state.editing} bsStyle="danger" onClick={this.deleteUser}>
                        Delete User</Button>
                    <Button disabled={!this.state.editing} bsStyle="success" onClick={this.saveUser}>
                        Save User</Button>
                    <Button disabled={!this.state.editing} onClick={this.cancelEditing}>
                        Cancel</Button>
                </ButtonToolbar>
                    {/*<Button disabled={!this.state.editing} bsStyle="primary" onClick={this.listUsers}>*/}
                        {/*List Users</Button>*/}
                </form>
            </div>
        );
    }//render
}//class

const mapStateToProps = (state) => {
    console.log("User, mapStateToProps, state", state);
    return {
        user: state.user
    }
};

const mapDispatchToProp = (dispatch) => {
    return {
        onFetchUser: (id) => dispatch(asyncFetchUser(id)),
        onListUsers: () => dispatch(asyncListUsers()),
        onSaveUser: (user) => dispatch(asyncSaveUser(user)),
        onCreateUser: (user) => dispatch(asyncCreateUser(user)),
        onDeleteUser: (id) => dispatch(asyncDeleteUser(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProp)(User);