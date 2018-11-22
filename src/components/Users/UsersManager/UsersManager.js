import React, {Component} from 'react';
import {connect} from 'react-redux';

import {asyncListUsers, asyncCreateUser, asyncFetchUser} from "../../../store/actions";

import {
    Table,
    // FormControl, FormGroup, ControlLabel, PageHeader,
    Button,
    // ButtonToolbar,
    ButtonGroup,
    //Alert
} from 'react-bootstrap';

import classes from "./UsersManager.css";

class UsersManager extends Component {
    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }


    componentDidMount() {
        this.props.onListUsers();

    }

    createUser() {
        console.log("Users Manager, createUser");
        this.props.onCreateUser();
        this.props.history.push("/user");
    }

    editUser(user) {
        console.log("Users Manager, editUser, user accountFK", user);
        this.props.onFetchUser(user);
        this.props.history.push("/user");
    }

    deleteUser(user_id) {
        console.log("Users Manager, deleteUser, user id", user_id);
    }

    render() {
        return (
            <div className={classes.container}>
                <h1>Users Manager</h1>
                <h2>Users:</h2>
                <Table className={classes.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.usersManager.users && this.props.usersManager.users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button onClick={() => this.editUser(user)} bsStyle="success">Edit</Button>
                                        <Button onClick={() =>this.deleteUser(user.id)} bsStyle="danger">Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td><Button onClick={this.createUser} bsStyle="primary">Add New User</Button></td>
                        <td></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usersManager: state.usersManager
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListUsers: () => dispatch(asyncListUsers()),
        onCreateUser: () => dispatch(asyncCreateUser()),
        onFetchUser: (user) => dispatch(asyncFetchUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersManager);