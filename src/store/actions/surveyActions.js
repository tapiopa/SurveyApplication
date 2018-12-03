/*
* surveyActions.js
* */
import {

} from "./actionsTypes";

import axios from "../../axios-survey";
import {SURVEY_LIST, SURVEY_LIST_FAILED} from "./actionsTypes";
import {fetchSurveyFailed} from "./surveyBuilderActions";
import {FETCH_SURVEY} from "./actionsTypes";
import {FETCH_SURVEY_FAILED} from "./actionsTypes";
import {GET_SURVEY_AND_QUESTIONS} from "./actionsTypes";
import {GET_SURVEY_AND_QUESTIONS_FAILED} from "./actionsTypes";
import {SET_SURVEY_ID} from "./actionsTypes";



// function waitAWhile() {
//     return new Promise(resolve => {
//         setTimeout(() => resolve('☕'), 2000); // it takes 2 seconds to make coffee
//     });
// }

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
                    // console.log("!!!asyncSurveyList, response data", response.data);
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

export const setSurveyId = (survey_id) => {
    return {type: SET_SURVEY_ID, survey_id}
};

const getSurveyAndQuestions = (survey) => {
    // console.log("fetchSurvey, survey", survey);
    return {type: GET_SURVEY_AND_QUESTIONS, survey: survey}
};

export const getSurveyAndQuestionsFailed = (error) => {
    return {type: GET_SURVEY_AND_QUESTIONS_FAILED, error}
};

// const followSengdinRsults = ()

export const asyncGetSurveyAndQuestions = (survey_id) => {
    return dispatch => {
        /*********** FETCH SURVEY *************/
        axios.get(`/surveys/${survey_id}`) //
        .then(response => {
            console.log("asyncGetSurveys... , survey response", response);
            if (response.status === 200) {
                if (response.data.errno) {
                    dispatch(getSurveyAndQuestionsFailed(response.data.sqlMessage));
                } else {
                    let survey = response.data[0];
                    console.log("asyncGetSurveys... , survey", survey);
                    /*********** FETCH QUESTIONS *************/
                    axios.get(`/surveys/${survey.id}/questions`)
                    .then(questionsResponse => {

                        if (questionsResponse.status === 200) {
                            if (questionsResponse.data.errno) {
                                dispatch(getSurveyAndQuestionsFailed(questionsResponse.data.sqlMessage));
                            } else {
                                survey.questions = questionsResponse.data;
                                let qCount = survey.questions.length;

                                survey.questions.forEach(question => {
                                    /*********** FETCH ANSWERS *************/
                                    axios.get(`questions/${question.id}/options`)
                                    .then(answerResponse => {
                                        if (answerResponse.status === 200) {
                                            if (answerResponse.data.errno) {
                                                qCount--;
                                                dispatch(getSurveyAndQuestionsFailed(answerResponse.data.sqlMessage));
                                            } else {
                                                qCount--;
                                                question.answers = answerResponse.data;
                                            }
                                        }
                                        console.log("surveyReducers, qCount", qCount);
                                        if (qCount === 0) {
                                            console.log("surveyReducers, BINGO!!!!", qCount);
                                            dispatch(getSurveyAndQuestions(survey));
                                        }
                                    })//get answers
                                    .catch(error => {
                                        dispatch(getSurveyAndQuestionsFailed(error));
                                    });//catch answers
                                }); //for each question
                                // const coffee = await waitAWhile();
                                // setTimeout(() => resolve('☕'), 2000);

                            }
                        }
                    })//get questions then
                    .catch(error => {
                        dispatch(getSurveyAndQuestionsFailed(error))
                    });//catch questions
                }
            }

        })//get survey
        .catch(error => {
            dispatch(getSurveyAndQuestionsFailed(error));
        });//catch survey
    }//dispatch
};//asyncGetSurveyAndQuestions
