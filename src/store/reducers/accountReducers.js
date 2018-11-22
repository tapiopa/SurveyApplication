/*
* accountReducers.js
* */

import {
    FETCH_ACCOUNT,
    CREATE_ACCOUNT,
    EDIT_ACCOUNT,
    // DELETE_ACCOUNT,
    // LIST_ACCOUNTS,
    SAVE_ACCOUNT,
    RESET_ACCOUNT,
    SET_ACCOUNT_ID
} from "../actions/actionsTypes";

// import {updateObject} from "../utility";
import moment from 'moment';

const initialState = {
    id: null,
    account: "",
    expireDate: "",
    isExpired: null,
    joinedDate: "",
    modifiedDate: "",
    password: ""
};

const accountReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNT: {
            if (action.account) {
                // console.log("accountReducer, account", action.account);
                const acnt = action.account;
                const useraccount = {
                    id: acnt.id,
                    account: acnt.account,
                    password: acnt.password,
                    joinedDate: acnt.joinedDate,
                    expireDate: acnt.expireDate,
                    isExpired: acnt.isExpired,
                    modifiedDate: acnt.modifiedDate
                };

                //const newState = updateObject(state, user_account);
                //console.log("accountReduces, newState", newState);
                return {...state, ...useraccount};
                // return updateObject(state, {account: action.account});
            }
            return state;
        }
        case CREATE_ACCOUNT: {
            const account = {
                id: action.id,
                account: "",
                expireDate: null,
                isExpired: null,
                joinedDate: moment(),
                modifiedDate: moment(),
                password: "",
                newAccount: true,
                routing: true
            };
            // const acnt = action.account;
            console.log("uaccountrReducers, create account, account", account);

            // const account = {
            //     id: action.id
            //     account: acnt.account,
            //     password: acnt.password,
            //     joinedDate: acnt.joinedDate,
            //     expireDate: acnt.expireDate,
            //     isExpired: acnt.isExpired,
            //     modifiedDate: acnt.modifiedDate
            // };
            // console.log("accountrReducers, create account, useraccount", account);
            return {...state, ...account};
        }
        case EDIT_ACCOUNT: {
            return {...state, ...action.account};
        }

        case SAVE_ACCOUNT: {
            return {...state, ...action.account};
        }

        case RESET_ACCOUNT: {
            const account = {
                id: action.id,
                account: "",
                expireDate: null,
                isExpired: null,
                joinedDate: moment(),
                modifiedDate: moment(),
                password: ""
            };
            return {...state, ...account};
        }

        case SET_ACCOUNT_ID: {
            const account = {id: action.accountId};
            return {...state, ...account};
        }
        default:
            return state;
    }
};

export default accountReducers;