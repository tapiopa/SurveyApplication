/*
* userReducers.js
* */
import {
    FETCH_USER,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER,
    LIST_USERS,
    RESET_USER,
    SET_USER_ACCOUNT_ID
} from "../actions/actionsTypes";

import moment from 'moment';

const initialState = {
    id: null,
    firstname: "",
    lastname: "",
    accountFK: null,
    email: "",
    phone: "",
    streetAddress: "",
    postalCode: "",
    birthdate: null,
    rewards: "",
    modifiedDate: ""
};
/*
* {"id":1,
* "firstname":"Chuck",
* "lastname":"Norris",
* "accountFK":1,
* "email": "chuck@norris.com",
* "birthdate":"1911-11-10T22:20:11.000Z",
* "phone":"555-555555",
* "streetAddress":"Hard Street 5",
* "postalCode":"12345",
* "rewards":1,
* "modifiedDate":"2018-11-14T05:04:58.000Z"}
* */
const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER: {
            if (action.user) {
                const user = action.user;
                console.log("user reducer, fetch user, user", user);
                const user_data = {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    accountFK: user.accountFK,
                    email: user.email,
                    phone: user.phone,
                    streetAddress: user.streetAddress,
                    postalCode: user.postalCode,
                    rewards: user.rewards,
                    birthdate: user.birthdate,
                    modifiedDate: user.modifiedDate,

                    // newUser: true
                };
                return {...state, ...user_data}
            }
            return state;
        }
        case CREATE_USER: {
            if (action.id) {
                // const user = action.user;
                console.log("user reducer, create user, user id", action.id);
                const user_data = {
                    id: action.id,
                    firstname: "",
                    lastname:"",
                    accountFK: null,
                    email: "",
                    phone: "",
                    streetAddress: "",
                    postalCode: "",
                    rewards: 0,
                    birthdate: null,
                    modifiedDate: moment().format("YYYY-MM-DD hh:mm:ss"),
                    routing: true
                };
                return {...state, ...user_data}
            }
            return state;
        }
        case EDIT_USER: {
            if (action.user) {
                const user = action.user;
                console.log("user reducer, edit user, user", user);
                const user_data = {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    accountFK: user.accountFK,
                    email: user.email,
                    phone: user.phone,
                    streetAddress: user.streetAddress,
                    postalCode: user.postalCode,
                    rewards: user.rewards,
                    birthdate: user.birthdate,
                    modifiedDate: user.modifiedDate,
                    routing: true
                };
                return {...state, ...user_data}
            }
            return state;
        }
        case DELETE_USER: {
            return state;
        }
        case RESET_USER: {
            const user = {
                id: null,
                firstname: "",
                lastname: "",
                accountFK: "",
                email: "",
                phone: "",
                streetAddress: "",
                postalCode: "",
                rewards: 0,
                birthdate: null,
                modifiedDate: null,
            };
            return {...state, ...user};
        }
        case LIST_USERS: {
            return state;
        }
        case SET_USER_ACCOUNT_ID: {
            const user = {accountFK: action.accountId};
            return {...state, ...user};
        }
        default:
            return state;
    }
};

export default userReducers;