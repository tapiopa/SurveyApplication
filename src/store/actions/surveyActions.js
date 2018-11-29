/*
* surveyActions.js
* */
import {

} from "./actionsTypes";

import axios from "../../axios-survey";
import {SURVEY_LIST, SURVEY_LIST_FAILED} from "./actionsTypes";


const surveyList = (surveys) => {
    console.log("action, surveyList", surveys);
    return {type: SURVEY_LIST, surveys: surveys}
};

const surveyListFailed = (error) => {
    console("surveyListFailed, error", error);
    return {type: SURVEY_LIST_FAILED, error};
};

export const asyncSurveyList = () => {
    console.log("!!!asyncSurveyList");
    return dispatch => {
        axios.get("/surveys")
        .then(response => {
            if (response.status === 200) {
                if (response.data.errno) {
                    console.log("asyncSurveyList, ERROR", response.data.sqlMessage);
                    dispatch(surveyListFailed(response.data.sqlMessage));
                } else {
                    console.log("!!!asyncSurveyList, response data", response.data);
                    const surveys = response.data;
                    dispatch(surveyList(surveys));
                }
            }
        })
        .catch(error => {
            dispatch(surveyListFailed(error));
        });
    }
};
