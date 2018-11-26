import {FETCH_USER_FIRSTNAME, FETCH_USER_FIRSTNAME_FAILED} from "./actionsTypes";

import axios from "../../axios-survey";

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
