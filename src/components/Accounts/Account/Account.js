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
    editAccount,
    cancelEditAccount,
    asyncSaveAccount,
    asyncSaveNewAccount,
    setAccountId,
    resetAccount
} from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Account extends Component {

    state = {
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
        newAccount: false,
        routing: false,
        unEditedState: {
            id: "",
            account: "",
            password: "",
            expireDate: null,
            joinedDate: null,
            modifiedDate: null
        }
    };

    constructor(props) {
        super(props);
        this.handleExpireDateChange = this.handleExpireDateChange.bind(this);
        // this.getDateString = this.getDateString.bind(this);
        this.getDateMoment = this.getDateMoment.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.setExpires = this.setExpires.bind(this);
        // this.addNewAccount = this.addNewAccount.bind(this);
        // this.deleteAccount = this.deleteAccount.bind(this);
        // this.saveAccount = this.saveAccount.bind(this);
        // this.resetFields = this.resetFields.bind(this);
        this.getFormattedMoment = this.getFormattedMoment.bind(this);
        // this.formatMoment = this.formatMoment.bind(this);
        this.editAccount = this.editAccount.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.goBack = this.goBack.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount, props", this.props);
        // if (this.props.app.account_id) {
        //     console.log("account_id");
        //     if (!this.props.account.id) {
        //         console.log("not account id");
        //     }
        // }
        console.log("componentDidMount, props new account", this.props.account.newAccount);
        //if (this.props.account && !this.props.account.routing && !this.state.newAccount) {
        if (!this.props.account.newAccount) {
            console.log("componentDidMount, not new account");
                if (!this.props.account.id && this.props.app.account_id) {
                    console.log("componentDidMount, setting account id, APP  account_id", this.props.app.account_id);
                    this.props.onFetchAccount(this.props.app.account_id);
                } else if (this.props.account.id) {
                    console.log("Account, componentDidMount, ACCOUNT id: ", this.props.account.id);
                    this.props.onFetchAccount(this.props.account.id);
                }

        } else {
            console.log("componentDidMount, new account");
            this.updateState(this.props);
        }
    }

    componentDidUpdate() {
        console.log("componentDidUpdate, state", this.state);
        // console.log("Account, componentDidUpdate, props newAccount", this.props.account.newAccount, "state new account", this.state.newAccount);

        // if (this.props.account && this.props.account.newAccount) {
        //     this.setState({newAccount: true});
        // }
        // if (this.props.account && this.props.account.newAccount && !this.state.newAccount) {
        //     console.log("!!!Account, componentDidMount, NEW ACCOUNT id: ", this.props.account.id);
        //     this.props.onFetchAccount(this.props.account.id);
        //     this.setState({newAccount: true});
        // }
        // document.getElementById("username").value = this.state.account;
        // document.getElementById("password").value = this.state.password;
        // document.getElementById("confirmPassword").value = this.state.confirmPassword;
    }



    componentWillReceiveProps(nextProps) {
        console.log("Account, componentWillReceiveProps, nextProps", nextProps);
        if (nextProps.account) {
            if (nextProps.account.id) {
                this.updateState(nextProps);
            }
            if (nextProps.account.newAccount) {
                this.setState({newAccount: true});
            }
            if (nextProps.account.saveSuccess) {
                this.setState({editing: false})
            }
            if (nextProps.account.editing) {
                this.setState({editing: nextProps.account.editing});
            }
        }
        console.log("Account, componentWillReceiveProps, state", this.state);
    }

    updateState(someProps) {
        console.log("updateState");
        this.setState({
            id: someProps.account.id,
            account: someProps.account.account,
            password: "",
            confirmPassword: "",
            joinedDate: someProps.account.newAccount ? moment() : this.getDateMoment(someProps.account.joinedDate),
            expireDate: this.getDateMoment(someProps.account.expireDate),
            modifiedDate: someProps.account.newAccount ? moment() : this.getDateMoment(someProps.account.modifiedDate),
            unEditedState: {
                id: someProps.account.id,
                account: someProps.account.account,
                password: someProps.account.password,
                joinedDate: someProps.account.newAccount ? moment() : this.getDateMoment(someProps.account.joinedDate),
                expireDate: this.getDateMoment(someProps.account.expireDate),
                modifiedDate: someProps.account.newAccount ? moment() : this.getDateMoment(someProps.account.modifiedDate),
            },
            isExpired: someProps.account.isExpired,
            routing: someProps.account.routing,
            editing: someProps.account.editing
            // newAccount: false
        });
        console.log("Account, updateState, state", this.state);
    }

    goBack() {
        this.props.onResetAccount();
        this.props.history.goBack();
    }

    editAccount = (account) => {
        this.props.onEditAccount(account);
    };

    cancelEditing = (account) => {
        //   this.setState({
        //       id: this.state.unEditedState.id,
        //       account: this.state.unEditedState.account,
        //       password: "", //this.state.unEditedPassword,
        //       confirmPassword: "",
        //       expireDate: this.state.unEditedState.expireDate,
        //       joinedDate: this.state.unEditedState.joinedDate,
        //       modifiedDate: this.state.unEditedState.modifiedDate,
        //       editing: false
        //   });
        // console.log("cancelEditing, AFTER account", this.state.account,
        //     "password", this.state.password);
        // document.getElementById("username").value = this.state.account;
        // // document.getElementById("password").value = " ";
        this.props.onCancelEditAccount(account);
    };

    saveAccount = (account) => {
        const saveAccount = {
            id: this.state.id,
            account: this.state.account,
            password: this.state.password,
            isExpired: this.state.isExpired,
            joinedDate: this.state.joinedDate ? this.state.joinedDate.format("YYYY-MM-DD") : null,
            expireDate: this.state.expireDate ? this.state.expireDate.format("YYYY-MM-DD") : null,
            modifiedDate: this.state.modifiedDate ? this.state.modifiedDate.format("YYYY-MM-DD hh:mm:ss") : null
        };
        console.log("saveAccount, account", saveAccount);
        if (this.state.newAccount) {
            this.props.onSaveNewAccount(saveAccount);
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



    getDateMoment = (dateString) => {
        if (dateString) {
            // console.log("getMomentFromDateString, dateString", dateString);
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



    render() {

        const formatMoment = (moment, withTime) => {
            if (withTime) {
                return moment ? moment.format("DD.M.YYYY h:mm") : null;
            } else if (moment) {
                return moment.format("DD.M.YYYY");
            }
        };
        // console.log("account, render, props", this.props);
        // console.log("account, render, state", this.state);

        return (
            <div className={classes.account}>
                <PageHeader>Account</PageHeader>
                <label>ID</label><p>state: {this.state.id} and props: {this.props.account.id}</p>
                <form className={classes.form}>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="username">Username</ControlLabel>
                        <FormControl className={classes.input} type="text" name="username" id="username"
                                     defaultValue={this.state.account} disabled={!this.state.editing}
                                     onChange={this.handleUsernameChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="password">Password</ControlLabel>
                        <FormControl className={classes.input} type="password" name="password" id="password"
                                     defaultValue={this.state.password} disabled={!this.state.editing}
                                     onChange={this.handlePasswordChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="confirmPassword">Confirm
                            Password</ControlLabel>
                        <FormControl className={classes.input} type="password"
                                     name="confirmPassword" id="confirmPassword"
                                     defaultValue="" disabled={!this.state.editing}
                                     onChange={this.handleConfirmPasswordChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="joined">Joined Date</ControlLabel>
                        <FormControl className={classes.input} disabled="disabled" name="joined" id="joined"
                                     defaultValue={formatMoment(this.state.joinedDate)}/>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                        <ControlLabel className={classes.label} htmlFor="expires">Account Expires</ControlLabel>
                        <DatePicker  //https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
                                        //https://reactdatepicker.com
                            disabled={!this.state.editing}
                            id="expires" className={classes.datePicker}
                            dropdownMode="select" showYearDropdown showMonthDropdown
                            selected={this.state.expireDate}
                            value={formatMoment(this.state.expireDate)}
                            openToDate={this.state.expireDate}
                            dateFormat="D.M.YYYY" minDate={moment()}
                            onChange={this.handleExpireDateChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className={classes.label} htmlFor="lastEdited">Account Last Edited</ControlLabel>
                        <FormControl className={classes.input} disabled="disabled"
                                     type="text" name="lastEdited" id="lastEdited"
                                     defaultValue={formatMoment(this.state.modifiedDate, true)}/>
                    </FormGroup>

                    <ButtonToolbar className={classes.buttonToolbar}>
                        {/*<Button disabled={this.state.editing} bsStyle="success"*/}
                                {/*onClick={this.addNewAccount}>Add Account</Button>*/}
                        {/*<Button disabled={this.state.editing} bsStyle="danger"*/}
                                {/*onClick={this.deleteAccount}>Delete Account</Button>*/}
                        {/*<Button disabled={true} bsStyle="primary"*/}
                                {/*onClick={this.listAccounts}>List Accounts</Button>*/}
                        <Button disabled={this.state.editing} bsStyle="primary"
                                onClick={this.editAccount}>Edit</Button>
                        <Button disabled={!this.state.editing} bsStyle="success"
                                onClick={this.saveAccount}>Save Account</Button>
                        <Button disabled={!this.state.editing}
                                onClick={this.cancelEditing}>Cancel</Button>
                        <Button disabled={this.state.editing} bsStyle="info"
                                onClick={this.goBack}>Go Back</Button>
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
        app: state.app,
        user: state.user,
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAccount: (account_id) => dispatch(asyncFetchAccount(account_id)),
        onCreateAccount: (account) => dispatch(asyncCreateAccount(account)),
        onListAccounts: () => dispatch(asyncListAccounts()),
        onEditAccount: (account) => dispatch(editAccount(account)),
        onCancelEditAccount: (account) => dispatch(cancelEditAccount(account)),
        onSaveAccount: (account) => dispatch(asyncSaveAccount(account)),
        onSaveNewAccount: (account) => dispatch(asyncSaveNewAccount(account)),
        onSetAccountId: (account_id) => dispatch(setAccountId(account_id)),
        onResetAccount: () => dispatch(resetAccount())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Account, axios));
