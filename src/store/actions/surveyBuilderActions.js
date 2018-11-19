import {
    CREATE_QUESTION,
    ADD_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    SAVE_QUESTION,
    CANCEL_QUESTION,
    //FETCH_QUESTIONS, FETCH_QUESTIONS_FAILED,
    // CREATE_SURVEY,
    FETCH_SURVEY_FAILED,
    FETCH_SURVEY,
    // CREATE_ANSWER
} from "./actionsTypes";
import axios from "../../axios-survey";


export const editQuestion = (id, value) => {
    return {type: EDIT_QUESTION, id: id, value: value}
};

const deleteQuestion = () => {
    return {type: DELETE_QUESTION}
};

export const asyncDeleteQuestion = (question_id) => {
    return dispatch => {
        axios.delete(`/questions/${question_id}`)
        .then(response => {
            if (response.status === 200) {
                dispatch(deleteQuestion());
            }
        })
    }
};

const saveQuestion = (question) => {
    console.log("action, saveQuestion, question", question);
    return {type: SAVE_QUESTION, question: question}
};

export const asyncSaveQuestion = (question) => {
    return dispatch => {
        console.log("asyncSaveQuestion, question", question);
        axios.put(`/questions/${question.id}`, question)
        .then(response => {
            console.log("asyncSaveQuestion, response", response);
            if (response.status === 200) {
                dispatch(saveQuestion(question));
            }
        })
    }
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

const createQuestion = (question) => {
    return {type: CREATE_QUESTION, question: question};
};

export const asyncCreateQuestion = (question) => {
    return dispatch => {
        axios.get("questions/maxId")
        .then(maxResponse => {
            console.log("asyncCreateQuestion, maxId", maxResponse.data[0].maxId);
            question.id = maxResponse.data[0].maxId + 1;
            axios.post("/questions", question)
            .then(response => {
                console.log("asyncCreateQuestion, post, response", response);
                dispatch(createQuestion(response.data));
            })
        })
    }
};

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