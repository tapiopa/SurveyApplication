import {
    FETCH_ACCOUNT,
    CREATE_ACCOUNT,
    EDIT_ACCOUNT,
    DELETE_ACCOUNT,
    LIST_ACCOUNTS, SAVE_ACCOUNT
} from "../actions/actionsTypes";

// import {updateObject} from "../utility";

const initialState = {
    id: 1,
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
        case CREATE_ACCOUNT: {
            const acnt = action.account;
            console.log("uaccountrReducers, create account, account", acnt);

            const account = {
                id: acnt.id,
                account: acnt.account,
                password: acnt.password,
                joinedDate: acnt.joinedDate,
                expireDate: acnt.expireDate,
                isExpired: acnt.isExpired,
                modifiedDate: acnt.modifiedDate
            };
            console.log("accountrReducers, create account, useraccount", account);
            return {...state, ...account};
        }
        case EDIT_ACCOUNT: {
            return {};
        }
        case DELETE_ACCOUNT: {
            return {};
        }
        case SAVE_ACCOUNT: {
            return {...state, ...action.account}
        }
        case LIST_ACCOUNTS: {
            console.log("accountReducers, accounts", action.accounts);
            return {};
        }
        default:
            return state;
    }
};

export default accountReducers;