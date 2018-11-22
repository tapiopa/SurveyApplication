/*
* userActions.js
* */

import {
    CREATE_USER,
    FETCH_USER,
    EDIT_USER,
    DELETE_USER,
    LIST_USERS,
    SAVE_USER,
    RESET_USER,
    SET_USER_ACCOUNT_ID
} from "./actionsTypes";

import axios from "../../axios-survey";

const fetchUser = (user) => {
    console.log("fetchUser, user", user);
    return {
        type: FETCH_USER,
        user: user
    };
};

export const asyncFetchUser = (user) => {
    console.log("asyncFetchUser, account id", user.accountFK);
    return dispatch => {
        const fetch = `/account/${user.accountFK}`;
        console.log("asyncFetchUser, fetch", fetch);
        axios.get(`/users/account/${user.accountFK}`)
        .then(response => {
            const user = response.data[0];
            console.log(`asyncFetchUser, response.data:`, user);
            dispatch(fetchUser(user));
        });
    }
};


export const resetUser = () => {
    return {type: RESET_USER};
};


export const setUserAccountFK = (account_id) => {
    return {type: SET_USER_ACCOUNT_ID, accountId: account_id}
};

const createUser = (user_id) => {
    // console.log("createUser, user", user);
    return {type: CREATE_USER, id: user_id}
};

export const asyncCreateUser = () => {
    return dispatch => {
        axios.get('/users/maxId')
        .then(maxResponse => {
            // const nextId = maxResponse.data[0].maxId + 1;
            // console.log("asyncCreateUsesr, nextId", nextId);
            const user_id = maxResponse.data[0].maxId + 1;
            // console.log("asyncCreateUser, user", user);
            // axios.post(`/users`, user)
            // .then(response => {
            //     const user = response.data[0];
            //     // console.log("asyncCreateUser, response response", response);
            //     // console.log("asyncCreateUser, response date", response.data);
            //     // console.log("asyncCreateUser, response user", user);
                dispatch(createUser(user_id));
            // });
        })
    }
};

const deleteUser = () => {
    console.log("deleteUser");
    return {type: DELETE_USER}
};

export const asyncDeleteUser = (user_id) => {
    console.log("asyncDeleteUser, user id", user_id);
    return dispatch => {
        axios.delete(`/users/${user_id}`)
        .then(response => {
            dispatch(deleteUser());
        })
    }
};

const saveUser = () => {
    console.log("saveuser");
    return {type: SAVE_USER}
};

export const asyncSaveUser = (user) => {
    console.log("asyncSaveUser, user", user);
    return dispatch => {
        axios.put(`/users/${user.id}`, user)
        .then(response => {
            dispatch(saveUser());
        })
    }
};

const listUsers = (users) => {
    console.log("listUsers");
    return {type: LIST_USERS, users: users}
};

export const asyncListUsers = () => {
    console.log("asyncListUsers");
    return dispatch => {
        axios.get("/users")
        .then(response => {
            const users =  response.data;
            console.log("asyncListUsers, users", users);
            dispatch(listUsers(users));
        })
    }
};
