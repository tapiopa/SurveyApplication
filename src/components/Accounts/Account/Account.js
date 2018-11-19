/*
* Account.js
*
*/

import React, {Component} from 'react';
import {
    FormControl,
    FormGroup,
    ControlLabel,
    PageHeader,
    Button,
    ButtonToolbar
} from 'react-bootstrap';
import {connect} from 'react-redux';

import classes from "./Account.css";
import axios from "../../../axios-survey";
import {
    asyncFetchAccount,
    asyncCreateAccount,
    asyncListAccounts,
    asyncDeleteAccount,
    asyncSaveAccount
} from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            account: "",
            password: "",
            confirmPassword: "",
            passwordsMatch: true,
            expireDate: null,
            joinedDate: null,
            modifiedDate: null,
            isExpired: null,
            //startDate: null,
            editing: false,
            unEditedId: "",
            unEditedAccount: "",
            unEditedPassword: "",
            unEditedExpireDate: null,
            unEditedJoinedDate: null,
            unEditedModifiedDate: null,
            newAccount: false
        };

        this.handleExpireDateChange = this.handleExpireDateChange.bind(this);
        // this.getDateString = this.getDateString.bind(this);
        this.getDateMoment = this.getDateMoment.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.setExpires = this.setExpires.bind(this);
        this.addNewAccount = this.addNewAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.saveAccount = this.saveAccount.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.getFormattedMoment = this.getFormattedMoment.bind(this);
        this.formatMoment = this.formatMoment.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
    }

    cancelEditing = () => {
        // this.setState({
        //     account: "",
        //     password: ""
        // });
        // document.getElementById("username").value = "";
        // document.getElementById("password").value = "";
        // console.log("cancelEditing, BEFORE unEditedAccount", this.state.unEditedAccount,
        //     "unEditedPassword", this.state.unEditedPassword);
          this.setState({
              id: this.state.unEditedId,
              account: this.state.unEditedAccount,
              password: "", //this.state.unEditedPassword,
              confirmPassword: "",
              expireDate: this.state.unEditedExpireDate,
              joinedDate: this.state.unEditedJoinedDate,
              modifiedDate: this.state.unEditedModifiedDate,
              editing: false
          });
        // console.log("cancelEditing, AFTER account", this.state.account,
        //     "password", this.state.password);
        // document.getElementById("username").value = this.state.account;
        // // document.getElementById("password").value = " ";
    };

    addNewAccount = () => {
        this.resetFields();
        this.setState({editing: true, newAccount: true});
    };

    deleteAccount = (account_id) => {
        console.log("deleteAccount, account id", account_id);
        this.props.onDeleteAccount(13);
    };
    listAccounts = () => {
        this.props.onListAccounts();
    };

    saveAccount = (account) => {
        const saveAccount = {
            id: this.state.id,
            account: this.state.account,
            password: this.state.password,
            isExpired: this.state.isExpired,
            joinedDate: this.state.joinedDate,
            expireDate: this.state.expireDate,
            modifiedDate: this.state.id.modifiedDate
        };
        console.log("saveAccount, account", saveAccount);
        if (this.state.newAccount) {
            this.props.onCreateAccount(saveAccount);
        } else {
            this.props.onSaveAccount(saveAccount);
        }
    };

    setExpires(expireDate) {
        this.setState({expireDate: this.getDateMoment(expireDate)});
    }

    handleUsernameChange(el) {
        this.setState({ account: el.target.value, editing: true });
        if ((this.state.confirmPassword && this.state.password &&
                this.state.confirmPassword === this.state.password)
            || (!this.state.password && !this.state.confirmPassword)) {
            this.setState({passwordsMatch: true})
        } else {
            this.setState({passwordsMatch: false})
        }

}

    handlePasswordChange(el) {
        this.setState({ password: el.target.value, editing: true});
        if ((this.state.confirmPassword && this.state.password &&
                this.state.confirmPassword === this.state.password)
            || (!this.state.password && !this.state.confirmPassword)) {
            this.setState({passwordsMatch: true})
        } else {
            this.setState({passwordsMatch: false})
        }
    }

    handleConfirmPasswordChange(el) {
        this.setState({ confirmPassword: el.target.value, editing: true});
        if ((this.state.confirmPassword && this.state.password &&
                this.state.confirmPassword === this.state.password)
            || (!this.state.password && !this.state.confirmPassword)) {
            this.setState({passwordsMatch: true})
        } else {
            this.setState({passwordsMatch: false})
        }
    }

    handleExpireDateChange(date) {
        this.setState({
            editing: true,
            expireDate: date
        });
        if ((this.state.confirmPassword && this.state.password &&
                this.state.confirmPassword === this.state.password)
            || (!this.state.password && !this.state.confirmPassword)) {
            this.setState({passwordsMatch: true})
        } else {
            this.setState({passwordsMatch: false})
        }
    }


    logState = () => {
        for (const key of Object.keys(this.state)) {
            console.log(key, this.state[key]);
        }
    };

    componentDidMount() {
        // console.log("Account, componentDidMount, user id: ", this.props.user.user_id);
        this.props.onFetchAccount(this.props.user.user_id);
        // .then(this.setState({propsExpireDate: this.props.account.expireDate}));
    }

    componentDidUpdate() {
        // console.log("componentDidUpdate, state", this.state);
        document.getElementById("username").value = this.state.account;
        document.getElementById("password").value = this.state.password;
        document.getElementById("confirmPassword").value = this.state.confirmPassword;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.account.expireDate) {
            // const company = Object.assign({}, this.state.company);
            // company.id = 0;
            // company.messages = [];
            this.setState({
                id: nextProps.account.id,
                unEditedId: nextProps.account.id,
                account: nextProps.account.account,
                unEditedAccount: nextProps.account.account,
                //password: nextProps.account.password,
                unEditedPassword: nextProps.account.password,
                //confirmPassword: nextProps.account.password,
                joinedDate: this.getDateMoment(nextProps.account.joinedDate),
                unEditedJoinedDate: this.getDateMoment(nextProps.account.joinedDate),
                expireDate: this.getDateMoment(nextProps.account.expireDate),
                unEditedExpireDate: this.getDateMoment(nextProps.account.expireDate),
                modifiedDate: this.getDateMoment(nextProps.account.modifiedDate),
                unEditedModifiedDate: this.getDateMoment(nextProps.account.modifiedDate),
                isExpired: nextProps.account.isExpired,
                newAccount: false
            });
        }
    }

    getDateMoment = (dateString) => {
        if (dateString) {
            console.log("getMomentFromDateString, dateString", dateString);
            //dateString = "2020-12-20";
            //dateString = this.getDateString(dateString);
            const year = dateString.slice(0, 4);
            const month = dateString.slice(5, 7);
            const day = dateString.slice(8, 10);
            const hour = dateString.slice(11, 13);
            const min = dateString.slice(14, 16);
            const sec = dateString.slice(17, 19);
            const newDate = year + "-" + month + "-" + day + ' ' + hour + ':' + min + ':' + sec;
            return moment(newDate);
        }
        // return moment();
        return null;
    };

    getFormattedMoment = (date) => {
       return this.getDateMoment(date) ? this.getDateMoment(date).format("DD.M.YYYY") : null;
    };

    formatMoment(moment, withTime) {
        if (withTime) {
            return moment ? moment.format("DD.M.YYYY h:mm") : null;
        } else if (moment) {
            return moment.format("DD.M.YYYY");
        }
    }

    resetFields() {
        this.setState({
            id: "",
            account: "",
            password: "",
            confirmPassword: "",
            joinedDate: moment(),
            expireDate: moment(),
            modifiedDate: moment(),
            isExpired: null
        })
    };




    render() {

        // console.log("account, render, props", this.props);
        // console.log("account, render, state", this.state);

        return (
            <div>
                <PageHeader>Account</PageHeader>
                <form className={classes.form}>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="username">Username</ControlLabel>
                        <FormControl className={classes.input} type="text" name="username" id="username"
                                     defaultValue={this.state.account}
                                     onChange={this.handleUsernameChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="password">Password</ControlLabel>
                        <FormControl className={classes.input} type="password" name="password" id="password"
                                     defaultValue={this.state.password}
                                     onChange={this.handlePasswordChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="confirmPassword">Confirm
                            Password</ControlLabel>
                        <FormControl className={classes.input} type="password"
                                     name="confirmPassword" id="confirmPassword" defaultValue=""
                                     onChange={this.handleConfirmPasswordChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="joined">Joined Date</ControlLabel>
                        <FormControl className={classes.input} disabled="disabled" name="joined" id="joined"
                                     defaultValue={this.formatMoment(this.state.joinedDate)}/>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                        <ControlLabel className={classes.label} htmlFor="expires">Account Expires</ControlLabel>
                        <DatePicker  //https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
                                        //https://reactdatepicker.com
                            id="expires" className={classes.datePicker}
                            dropdownMode="select" showYearDropdown showMonthDropdown
                            selected={this.state.expireDate}
                            value={this.formatMoment(this.state.expireDate)}
                            openToDate={this.state.expireDate}
                            dateFormat="D.M.YYYY" minDate={moment()}
                            onChange={this.handleExpireDateChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="lastEdited">Account Last Edited</ControlLabel>
                        <FormControl className={classes.input} disabled="disabled" type="text" name="lastEdited"
                                     id="lastEdited"
                                     defaultValue={this.formatMoment(this.state.modifiedDate, true)}/>
                    </FormGroup>

                    <ButtonToolbar className={classes.buttonToolbar}>
                        <Button disabled={this.state.editing} bsStyle="success"
                                onClick={this.addNewAccount}>Add Account</Button>
                        <Button disabled={this.state.editing} bsStyle="danger"
                                onClick={this.deleteAccount}>Delete Account</Button>
                        {/*<Button disabled={true} bsStyle="primary"*/}
                                {/*onClick={this.listAccounts}>List Accounts</Button>*/}
                        <Button disabled={!this.state.editing} bsStyle="success"
                                onClick={this.saveAccount}>Save Account</Button>
                        <Button disabled={!this.state.editing}
                                onClick={this.cancelEditing}>Cancel</Button>
                    </ButtonToolbar>
                </form>

                <button className="btn btn-success" onClick={this.logState}>Log</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log("Account, mapStateToProps, account", state.account);
    return {
        user: state.user,
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAccount: (id) => dispatch(asyncFetchAccount(id)),
        onCreateAccount: (account) => dispatch(asyncCreateAccount(account)),
        onListAccounts: () => dispatch(asyncListAccounts()),
        onDeleteAccount: (id) => dispatch(asyncDeleteAccount(id)),
        onSaveAccount: (account) => dispatch(asyncSaveAccount(account))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Account, axios));
