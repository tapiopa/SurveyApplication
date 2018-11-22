import {
    LIST_USERS
} from "../actions/actionsTypes";

const initialState = {
    usersManager: null
};

const usersManagerReducers = (state = initialState, action) => {
    switch (action.type) {
        case LIST_USERS: {
            console.log("usersManagerReducers, action users", action.users);
            const users = action.users;
            console.log("usersManagerReducers, users", users);
            return {
                    users: users
            }
        }
        default: {
            return state;
        }
    }
};

export default usersManagerReducers;