import {
    CREATE_USER,
    FETCH_USER,
    // EDIT_USER,
    DELETE_USER,
    LIST_USERS,
    SAVE_USER
} from "./actionsTypes";

import axios from "../../axios-survey";

const fetchUser = (user) => {
    console.log("fetchUser, user", user);
    return {
        type: FETCH_USER,
        user: user
    };
};

export const asyncFetchUser = (user_id) => {
    console.log("asyncFetchUser, user id", user_id);
    return dispatch => {
        axios.get(`/users/${user_id}`) //
        .then(response => {
            const user = response.data[0];
            console.log(`asyncFetchUser, response.data:`, user);
            dispatch(fetchUser(user));
        });
    }
};

const createUser = (user) => {
    // console.log("createUser, user", user);
    return {type: CREATE_USER, user: user}
};

export const asyncCreateUser = (user) => {
    return dispatch => {
        axios.get('/users/maxId')
        .then(maxResponse => {
            // const nextId = maxResponse.data[0].maxId + 1;
            // console.log("asyncCreateUsesr, nextId", nextId);
            user.id = maxResponse.data[0].maxId + 1;
            console.log("asyncCreateUser, user", user);
            axios.post(`/users`, user)
            .then(response => {
                const user = response.data[0];
                // console.log("asyncCreateUser, response response", response);
                // console.log("asyncCreateUser, response date", response.data);
                // console.log("asyncCreateUser, response user", user);
                dispatch(createUser(user));
            });
        })
    }
};

const deleteUser = () => {
    console.log("deleteUser");
    return {type: DELETE_USER}
};

export const asyncDeleteUser = (user_id) => {
    console.log("asyncDeleteUser, user id", user_id);
    return dispatch => {
        axios.delete(`/users/${user_id}`)
        .then(response => {
            dispatch(deleteUser());
        })
    }
};

const saveUser = () => {
    console.log("saveuser");
    return {type: SAVE_USER}
};

export const asyncSaveUser = (user) => {
    console.log("asyncSaveUser, user", user);
    return dispatch => {
        axios.put(`/users/${user.id}`, user)
        .then(response => {
            dispatch(saveUser());
        })
    }
};

const listUsers = (users) => {
    console.log("listUsers");
    return {type: LIST_USERS, users: users}
};

export const asyncListUsers = () => {
    console.log("asyncListUsers");
    return dispatch => {
        axios.get("/users")
        .then(response => {
            const users =  response.data;
            console.log("asyncListUsers, users", users);
            dispatch(listUsers(users));
        })
    }
};
