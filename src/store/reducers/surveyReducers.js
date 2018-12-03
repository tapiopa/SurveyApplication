/*
* surveyReducers.js
* */
import {
    GET_SURVEY_AND_QUESTIONS, GET_SURVEY_AND_QUESTIONS_FAILED, SET_SURVEY_ID,
    SURVEY_LIST, SURVEY_LIST_FAILED
} from "../actions/actionsTypes";
import {updateObject} from "../utility";

const initialState = {
    surveys: null,
    survey: null,
    fetched: false
};

const surveyReducers= (state = initialState, action) => {
    switch (action.type) {
        case SURVEY_LIST: {
            return {surveys: action.surveys};
        }
        case SURVEY_LIST_FAILED: {
            return {...state, error: true, errorMessage: action.error}
        }
        case SET_SURVEY_ID: {
            const survey  = {
                id: action.survey_id,
                title: "",
                questions: null,
                fetchData: true,
                fetched: false
            };
            return {...state, survey}
        }
        case GET_SURVEY_AND_QUESTIONS: {
            console.log("reducer, get survey and questions, survey", action.survey);
            const questions = action.survey.questions.slice(0);
            questions.forEach(question => {
                question.editing = false;
                question.showAnswers = false;
            });
            // console.log("reducer get survey and questions, questions", questions);
            // console.log("reducer, get survey and questions, action survey before update", action.survey);
            const survey = {...action.survey};
            // console.log("reducer, get survey and questions,  survey", survey);
            survey.questions = questions;
            // console.log("reducer, get survey and questions,  survey with questions", survey);
            survey.fetched = true;
            const newState = {...state, survey};
            console.log("reducer, get survey and questions, newState", newState);
            return newState;
        }
        case GET_SURVEY_AND_QUESTIONS_FAILED: {
            return updateObject(state, {error: true, errorMessage: action.error});
        }
        default: {
            return state;
        }
    }
};


export default surveyReducers;