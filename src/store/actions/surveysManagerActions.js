import {
    LIST_SURVEYS
} from "./actionsTypes";
import axios from "../../axios-survey";

const listSurveys = (surveys) => {
    console.log("action, listSurveys", surveys);
    return {type: LIST_SURVEYS, surveys: surveys}
};

export const asyncListSurveys = () => {
    return dispatch => {
        axios.get("/surveys")
        .then(response => {
            // console.log("!!!asyncListSurveys, response", response);
            const surveys = response.data;
            dispatch(listSurveys(surveys));
        });
    }
};