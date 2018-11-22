import {FETCH_USER_FIRSTNAME} from "./actionsTypes";

import axios from "../../axios-survey";

const fetchFirstname = (firstname, account_id) => {
    return {type: FETCH_USER_FIRSTNAME, firstname: firstname, account_id: account_id}
};

export const asyncFetchFirstname = (account_id) => {
    const comp = `/users/firstname/${account_id}`;
    console.log("asyncFetchFirstname, account_id", account_id, "comp", comp);
   return dispatch => {
       axios.get(comp)
       .then(response => {
           console.log("asyncFetchFirstname, response", response);
           const firstname = response && response.data && response.data[0] && response.data[0].firstname;
           dispatch(fetchFirstname(firstname, account_id));
       })
   }
};
