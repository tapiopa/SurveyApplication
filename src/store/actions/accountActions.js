import {
    FETCH_ACCOUNT,
    CREATE_ACCOUNT,
    // EDIT_ACCOUNT,
    DELETE_ACCOUNT,
    LIST_ACCOUNTS,
    SAVE_ACCOUNT
} from "./actionsTypes";

import axios from "../../axios-survey";

const fetchAccount = (account) => {
    // console.log("fetchAccount, user", user);
    return {type: FETCH_ACCOUNT, account: account}
};

export const asyncFetchAccount = (user_id) => {
    // console.log("asyncFetchAccount, user id", user_id);
    return dispatch => {
        axios.get(`/accounts/${user_id}`)
        .then(response => {
            const account = response.data[0];
            // console.log("asyncFetchAccount, response data", response.data[0]);
            dispatch(fetchAccount(account));
        })//then
        // .catch(error => {
        //     console.log("asyncFetchAccount error: ", error)
        // })
    }
};

const createAccount = (account) => {
    console.log("createAccount, account", account);
    return {type: CREATE_ACCOUNT, account: account}
};

export const asyncCreateAccount = (account) => {
    console.log("asyncCreateAccount, account", account);
    return dispatch => {
        axios.post(`/accounts`, account)
        .then(response => {
            const receivedAccount = response.data;
            console.log("asyncCreateAccount, received response", response);
            console.log("asyncCreateAccount, received data", response.data);
            console.log("asyncCreateAccount, received account", receivedAccount);
            dispatch(createAccount(receivedAccount));
        })
    }
};

const listAccounts = (accounts) => {
    console.log("listAccouints");
    return {type: LIST_ACCOUNTS, accounts: accounts}
};

export const asyncListAccounts = () => {
    console.log("asyncListAccounts");
    return dispatch => {
        axios.get("/accounts")
        .then(response => {
            const receivedAccounts = response.data;
            console.log("asyncListAccounts, received data", receivedAccounts);
            dispatch(listAccounts(receivedAccounts));
        })
    }
};

const deleteAccount = () => {
    console.log("deleteAccount");
    return {type: DELETE_ACCOUNT};
};

export const asyncDeleteAccount = (account_id) => {
    console.log("asyncDeleteAccount, account id", account_id);
    return dispatch => {
        axios.delete(`/accounts/${account_id}`)
        .then(response => {
            console.log("asyncDeleteAccount, response", response.data);
            dispatch(deleteAccount());
        })
    }
};

const saveAccount = (account) => {
    console.log("saveAccount");
    return {type: SAVE_ACCOUNT, account: account}
};

export const asyncSaveAccount = (account) => {
    console.log("asyncSaveAccouint, account", account);
    return dispatch => {
        axios.put(`/accounts/${account.id}`, account)
        .then(response => {
            console.log("asyncSaveAccount, response", response);
            dispatch(saveAccount(response.data));
        })
    }
};