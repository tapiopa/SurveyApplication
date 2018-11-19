import {FETCH_USER_FIRSTNAME} from "../actions/actionsTypes";

const initialState = {
    account_id: null,
    firstname: ""
};

const appReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_FIRSTNAME:
            console.log("appReducers, fetch user firstname, state", state);
            const app = {
                account_id: action.account_id,
                firstname: action.firstname
            };
            return {...app};
        default:
            return state;
    }
};

export default appReducers;