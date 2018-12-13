import {
    FETCH_USER_FIRSTNAME,
    LOGIN_USER,
    LOGIN_USER_FAILED, LOGOUT_USER,
    SET_ACCOUNT_ID,
    SET_ACCOUNT_ID_NAME, USER_LOGIN, USER_LOGIN_FAILED
} from "../actions/actionsTypes";

const initialState = {
    logged_in: false,
    account_id: null,
    user_id: null,
    type: "",
    email: "",
    firstname: ""
};

const appReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            // console.log("appReducers, LOGIN_USER, action", action);
            return {
                logged_in: true,
                account_id: action.account_id,
                user_id: action.user_id,
                // type: action.type,
                firstname: action.user_name
            }
        }
        case LOGIN_USER_FAILED: {
            return {...state, error: true, errorMessage: action.error};
        }
        case USER_LOGIN: {
            return {
                logged_in: true,
                account_id: action.data.owner,
                user_id: action.data.id,
                type: action.data.type,
                email: action.data.email,
                firstname: action.data.firstname
            }
        }
        case USER_LOGIN_FAILED: {
            return {...state, error: true, errorMessage: action.error};
        }
        case LOGOUT_USER: {
            return {...initialState}
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