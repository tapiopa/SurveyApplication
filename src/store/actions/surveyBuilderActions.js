import {
    ADD_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    SAVE_QUESTION,
    CANCEL_QUESTION,
    //FETCH_QUESTIONS, FETCH_QUESTIONS_FAILED,
    FETCH_SURVEY_FAILED,
    FETCH_SURVEY
} from "./actionsTypes";
import axios from "../../axios-survey";


export const editQuestion = (id, value) => {
    return {type: EDIT_QUESTION, id: id, value: value}
};
export const deleteQuestion = (id) => {
    return {type: DELETE_QUESTION, id: id}
};
export const saveQuestion = (id, value) => {
    return {type: SAVE_QUESTION, id: id, value: value}
};
export const cancelQuestion = (id, value) => {
    return {type: CANCEL_QUESTION, id: id, value: value}
};

const fetchSurvey = (survey) => {
    // console.log("fetchSurvey, survey", survey);
    return {type: FETCH_SURVEY, survey: survey}
};

export const fetchSurveyFailed = () => {
    return {
        type: FETCH_SURVEY_FAILED
    }
};

export const asyncFetchSurvey = (survey_id) => {
    return dispatch => {
        /*********** FETCH SURVEY *************/
        axios.get(`/surveys/${survey_id}`) //
        .then(response => {
            let survey = response.data[0];
            /*********** FETCH QUESTIONS *************/
            axios.get(`/surveys/${survey.id}/questions`)
            .then(response => {
                survey.questions = response.data;
                survey.questions.forEach(question => {
                    /*********** FETCH ANSWERS *************/
                    axios.get(`questions/${question.id}/options`)
                    .then(answerResponse => {
                        question.answers = answerResponse.data;
                    })//get answers
                    .catch(error => {
                        return dispatch(fetchSurveyFailed());
                    });//catch answers
                }); //for each question
                dispatch(fetchSurvey(survey));
            })//get questions then
            .catch(error => {
                dispatch(fetchSurveyFailed())
            });//catch questions
        })//get survey
        .catch(error => {
            dispatch(fetchSurveyFailed());
        });//catch survey
    }
};//fetchQuestion

//example of async code
const asyncAddquestion = (/*possible parameters here*/) => {
    return {type: ADD_QUESTION /*, possible parameters here*/}
};

export const addQuestion = (/*possible parameters here*/) => {
    return dispatch /*, getState*/ => {
        /*async code here, .then()*/
        /*e.g., const oldCounter = getState().counter*/
        dispatch(asyncAddquestion(/*possible parameters here*/));
    };
};