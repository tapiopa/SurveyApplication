import {
    CREATE_QUESTION,
    ADD_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    SAVE_QUESTION,
    CANCEL_QUESTION,
    SHOW_ANSWERS,
    HIDE_ANSWERS,
    //FETCH_QUESTIONS, FETCH_QUESTIONS_FAILED,
    // CREATE_SURVEY,
    FETCH_SURVEY_FAILED,
    FETCH_SURVEY,
    SAVE_SURVEY,
    // DELETE_SURVEY,
    EDIT_SURVEY_DATA,
    CREATE_ANSWER,
    SAVE_ANSWER,
    EDIT_ANSWER,
    DELETE_ANSWER,
    CANCEL_ANSWER
} from "./actionsTypes";
import axios from "../../axios-survey";

export const editSurvey = (survey) => {
    return {type: EDIT_SURVEY_DATA, survey: survey};
};

const saveSurvey = (survey) => {
    return {type: SAVE_SURVEY, survey: survey};
};

export const asyncSaveSurvey = (survey) => {
    return dispatch => {
        axios.post(`/surveys/${survey.id}`)
        .then(response => {
            if (response.status === 200) {
                dispatch(saveSurvey(survey));
            }
        });
    };
};

// const deleteSurvey = (survey) => {
//     return {type: DELETE_SURVEY, survey: survey};
// };
//
// export const asyncDeleteSurvey = (survey) => {
//
// }

const createAnswer = (answer) => {
    console.log("createAnser, answer", answer);
    return {type: CREATE_ANSWER, answer: answer}
};

export const asyncCreateAnswer = (answer) => {
    return dispatch => {
        axios.get("/answer_options/maxId")
        .then(maxResponse => {
            console.log("asyncCreateAnswer, maxId", maxResponse.data[0].maxId);
            answer.id = maxResponse.data[0].maxId + 1;
            axios.post("/answer_options", answer)
            .then(response => {
                console.log("asyncCreateAnswer, post, response", response);
                dispatch(createAnswer(response.data));
            })
        })
    }
};

const saveAnswer = (answer) => {
    console.log("action, saveAnswer, answer", answer);
    return {type: SAVE_ANSWER, answer: answer}
};

export const asyncSaveAnswer = (answer) => {
    return dispatch => {
        console.log("asyncSaveAnswer answer", answer);
        axios.put(`/answer_options/${answer.id}`, answer)
        .then(response => {
            console.log("asyncSaveAnswer, response", response);
            if (response.status === 200) {
                dispatch(saveAnswer(answer));
            }
        })
    }
};

export const editAnswer = (answer) => {
    return {type: EDIT_ANSWER, answer}
};

const deleteAnswer = (answer) => {
    return {type: DELETE_ANSWER, answer: answer}
};

export const asyncDeleteAnswer = (answer) => {
    return dispatch => {
        console.log("asyncDeleteAnswer, answer id", answer.id);
        axios.delete(`/answer_options/${answer.id}`)
        .then(response => {
            console.log("asyncDeleteAnswer, response", response);
            if (response.status === 200) {
                dispatch(deleteAnswer(answer));
            }
        })
    }
};

export const cancelAnswer = (answer) => {
    return {type: CANCEL_ANSWER, answer: answer}
};

export const editQuestion = (answer) => {
    return {type: EDIT_QUESTION, answer: answer}
};

const deleteQuestion = (question_id) => {
    return {type: DELETE_QUESTION, id: question_id}
};

export const asyncDeleteQuestion = (question_id) => {
    return dispatch => {
        axios.delete(`/questions/${question_id}`)
        .then(response => {
            if (response.status === 200) {
                dispatch(deleteQuestion(question_id));
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

export const showAnswers = (question) => {
    return {type: SHOW_ANSWERS, question: question}
};

export const hideAnswers = (question) => {
    return {type: HIDE_ANSWERS, question: question}
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