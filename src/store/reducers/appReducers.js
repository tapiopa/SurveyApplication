import {
    FETCH_USER_FIRSTNAME,
    LOGIN_USER,
    LOGIN_USER_FAILED,
    SET_ACCOUNT_ID,
    SET_ACCOUNT_ID_NAME
} from "../actions/actionsTypes";

const initialState = {
    loggged_in: false,
    account_id: 26,
    user_id: null,
    firstname: ""
};

const appReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return {
                logged_in: true,
                account_id: action.account_id,
                user_id: action.user_id,
                firstname: action.user_name
            }
        }
        case LOGIN_USER_FAILED: {
            return {...state, error: true, errorMessage: action.error};
        }
        case SET_ACCOUNT_ID: {
           return  {account_id: action.id, firstname: action.name}
        }
        case SET_ACCOUNT_ID_NAME: {
            return {loggedIn: true, account_id: action.account.id, user_id: action.user.id, firstname: action.user.firstname}
        }
        case FETCH_USER_FIRSTNAME: {
            // console.log("appReducers, fetch user firstname, state", state);
            const app = {
                account_id: action.account_id,
                firstname: action.firstname
            };
            return {...app};
        }
        default:
            return state;
    }
};

export default appReducers;