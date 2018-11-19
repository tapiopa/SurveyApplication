import {
    FETCH_USER,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER,
    LIST_USERS
} from "../actions/actionsTypes";

const initialState = {
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetAddress: "",
    postalCode: "",
    birthdate: "",
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
                    email: user.email,
                    phone: user.phone,
                    streetAddress: user.streetAddress,
                    postalCode: user.postalCode,
                    rewards: user.rewards,
                    birthdate: user.birthdate,
                    modifiedDate: user.modifiedDate
                };
                return {...state, ...user_data}
            }
            return state;
        }
        case CREATE_USER: {
            if (action.user) {
                const user = action.user;
                console.log("user reducer, create user, user", user);
                const user_data = {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                    streetAddress: user.streetAddress,
                    postalCode: user.postalCode,
                    rewards: user.rewards,
                    birthdate: user.birthdate,
                    modifiedDate: user.modifiedDate
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
                    email: user.email,
                    phone: user.phone,
                    streetAddress: user.streetAddress,
                    postalCode: user.postalCode,
                    rewards: user.rewards,
                    birthdate: user.birthdate,
                    modifiedDate: user.modifiedDate
                };
                return {...state, ...user_data}
            }
            return state;
        }
        case DELETE_USER: {
            return state;
        }
        case LIST_USERS: {
            return state;
        }
        default:
            return state;
    }
};

export default userReducers;