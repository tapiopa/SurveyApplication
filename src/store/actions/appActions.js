import {
    FETCH_USER_FIRSTNAME,
    FETCH_USER_FIRSTNAME_FAILED, LOGIN_USER,
    LOGIN_USER_FAILED,
    SET_ACCOUNT_ID_NAME
} from "./actionsTypes";

import axios from "../../axios-survey";

const loginUser = (account_id, user_id, user_name) => {
    return {type: LOGIN_USER, account_id, user_id, user_name}
}

const loginUserFailed = (error) => {
    return {type: LOGIN_USER_FAILED, error};
};

export const asyncLoginUser = (user_id) => {
    let account_id = null;
    let user_name = null;
    return dispatch => {
        axios.get(`/users/${user_id}/account`)
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    console.log("ERROR", response.data.sqlMessage);
                    dispatch(loginUserFailed(response.data.sqlMessage));
                } else {
                    console.log("asyncLogInUser, response", response);
                    account_id = response.data[0].account_id;
                    console.log("asyncLogInUser, account id", account_id);
                    axios.get(`/users/firstname/${account_id}`)
                    .then(nameResponse => {
                        if (response.status === 200) {
                            if (response.data.errno) {
                                console.log("ERROR", nameResponse.data.sqlMessage);
                                dispatch(loginUserFailed(nameResponse.data.sqlMessage));
                            } else {
                                console.log("asyncLogInUser, NAME response", nameResponse);
                                user_name = nameResponse.data[0].firstname;
                                console.log("asyncLogInUser, user name", user_name);
                                dispatch(loginUser(account_id, user_id, user_name));
                            }
                        }
                    })
                    .catch(error => {
                        dispatch(loginUserFailed(error));
                    });
                }
            }
        })
        .catch(error => {
            dispatch(loginUserFailed(error));
        });
    }
};

export const setAppUserAccountIdName = (account, user) => {
    return {type: SET_ACCOUNT_ID_NAME, account: account, user: user}
};

const fetchFirstname = (firstname, account_id) => {
    return {type: FETCH_USER_FIRSTNAME, firstname: firstname, account_id: account_id}
};

const fetchFirstNameFailed = (error) => {
    return {type:FETCH_USER_FIRSTNAME_FAILED, error};
}

export const asyncFetchFirstName = (account_id) => {
    const comp = `/users/firstname/${account_id}`;
    console.log("asyncFetchFirstName, account_id", account_id, "comp", comp);
   return dispatch => {
       axios.get(comp)
       .then(response => {
           if (response.status === 200) {
               if (response.data.errno) {
                   dispatch(fetchFirstNameFailed(response.data.sqlMessage));
               } else {
                   console.log("asyncFetchFirstName, response", response);
                   const firstname = response && response.data && response.data[0] && response.data[0].firstname;
                   dispatch(fetchFirstname(firstname, account_id));
               }
           }

       })
       .catch(error => {
           fetchFirstNameFailed(error);
       });
   }
};
