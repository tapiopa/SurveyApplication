/*
* accountsManagerActions.js
* */
import {
    LIST_ACCOUNTS,
    //CREATE_ACCOUNT,
    // EDIT_ACCOUNT,
    // SAVE_ACCOUNT,
    DELETE_ACCOUNT
} from "./actionsTypes";
import axios from "../../axios-survey";

// export const editAccount = (account_id) => {
//     return {type: EDIT_ACCOUNT, accountId: account_id}
// };

const listSurveys = (accounts) => {
    console.log("action, listSurveys", accounts);
    return {type: LIST_ACCOUNTS, surveys: accounts}
};

export const asyncListAccounts = () => {
    return dispatch => {
        axios.get("/accounts")
        .then(response => {
            console.log("!!!asyncListAccounts, response", response);
            const accounts = response.data;
            dispatch(listSurveys(accounts));
        });
    }
};

const deleteAccount = (account_id) => {
    console.log("deleteAccount");
    return {type: DELETE_ACCOUNT, accountId: account_id};
};

export const asyncDeleteAccount = (account_id) => {
    console.log("asyncDeleteAccount, account id", account_id);
    return dispatch => {
        axios.delete(`/accounts/${account_id}`)
        .then(response => {
            console.log("asyncDeleteAccount, response", response);
            if (response.status === 200 /*&& !response.data.errno*/) {
                if (response.data.errno) {
                    console.log("asyncDeleteAccount, ERROR", response.data.sqlMessage);
                    // dispatch(deleteAccountFail(response.data.sqlMessage));
                } else {
                    dispatch(deleteAccount(account_id));
                }
            }
        })
    }
};