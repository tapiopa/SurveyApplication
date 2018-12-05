/*
 * AccountsManager.js
 * */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  asyncListAccounts,
  editAccount,
  asyncFetchAccount,
  asyncDeleteAccount,
  asyncCreateAccount,
  resetAccount
} from '../../../store/actions';

import axios from '../../../axios-survey';

import {
  Table,
  // FormControl, FormGroup, ControlLabel, PageHeader,
  Button,
  // ButtonToolbar,
  ButtonGroup
  //Alert
} from 'react-bootstrap';

import classes from './AccountsManager.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
// import {NavLink} from "react-router-dom";
import AdminOnly from '../../Login/AdminOnly';

class AccountsManager extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.editAccount = this.editAccount.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  componentDidMount() {
    this.props.onListAccounts();
  }

  createAccount() {
    console.log('Accounts manager, create account BEFORE creat');
    // this.props.onResetAccount();
    this.props.onCreateAccount();
    console.log('Accounts manager, create account AFTER create');
    this.props.history.push('/account');
    console.log('Accounts manager, create account AFTER PUSH account page');
  }

  editAccount(account) {
    this.props.onResetAccount();
    this.props.onEditAccount(account);
    this.props.onFetchAccount(account);
    this.props.history.push('/account');
  }

  deleteAccount(account) {
    this.props.onDeleteAccount(account.id);
  }

  render() {
    return (
      <div className={classes.accountManager}>
        <h1>Accounts Manager</h1>
        <h2>Accounts:</h2>
        <Table className={classes.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.accountsManager.accounts &&
              this.props.accountsManager.accounts.map(account => {
                return (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.account}</td>
                    <td>
                      <ButtonGroup>
                        <Button
                          onClick={() => this.editAccount(account)}
                          bsStyle="success"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => this.deleteAccount(account)}
                          bsStyle="danger"
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td />
              <td>
                <Button onClick={this.createAccount} bsStyle="primary">
                  Add New Account
                </Button>
              </td>
              <td />
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountsManager: state.accountsManager
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onListAccounts: () => dispatch(asyncListAccounts()),
    onEditAccount: account_id => dispatch(editAccount(account_id)),
    onDeleteAccount: account_id => dispatch(asyncDeleteAccount(account_id)),
    onCreateAccount: () => dispatch(asyncCreateAccount()),
    onResetAccount: () => dispatch(resetAccount()),
    onFetchAccount: account_id => dispatch(asyncFetchAccount(account_id))
  };
};

export default AdminOnly(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withErrorHandler(AccountsManager, axios))
);
