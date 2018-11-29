/*
* surveyReducers.js
* */
import {
    SURVEY_LIST, SURVEY_LIST_FAILED
} from "../actions/actionsTypes";

const initialState = {
    surveys: null
};

const surveyReducers= (state = initialState, action) => {
    switch (action.type) {
        case SURVEY_LIST: {
            return {surveys: action.surveys};
        }
        case SURVEY_LIST_FAILED: {
            return {...state, error: true, errorMessage: action.error}
        }
        default:
            return state;
    }
};

export default surveyReducers;