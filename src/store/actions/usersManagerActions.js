import {
    LIST_USERS
} from "./actionsTypes";
import axios from "../../axios-survey";

const listUsers = (users) => {
    console.log("action, listUsers", users);
    return {type: LIST_USERS, users: users}
};

export const asyncListUsers = () => {
    return dispatch => {
        axios.get("/users")
        .then(response => {
            console.log("!!!asyncListUsers, response", response);
            const users = response.data;
            dispatch(listUsers(users));
        });
    }
};