import {ADD_QUESTION, SAVE_QUESTION, EDIT_QUESTION, DELETE_QUESTION, CANCEL_QUESTION} from "../actions/actionsTypes";
const initialState = {
    user: {
        user_id: 1,
        user_name: "Tapio"
    },

    survey: {
        survey_id: 1,
        survey_name: "",
        questions: []
    }
};

function getMaxId(questions) {
    let maxId = 0;
    questions.map(question => {
        if (question.id > maxId) {
            maxId = question.id;
        }
    });
    return maxId;
}

const surveyBuilderReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_QUESTION: {
            console.log("surveyBuilderReducers, add question, state: ", state);
            //console.log("surveyBuilderReducers, add question, maxId: ", action.maxId);
            //const {type, ...maxId} = action;
            if (!Array.isArray(state.survey.questions)) { // || !state.survey.questions.length
                //console.log("surveyBuilderReducers, add question, no questions!!!");
                return state;
            } else {
                //let oldQuestions = null;
                let newQuestions = null;
                //const maxId = state.survey.questions.length;
                const maxId = getMaxId(state.survey.questions);
                console.log("surveyBuilderReducers, add question, maxId: ", maxId);
                //const maxId = action.maxId;
                const newQuestion = {
                    id: maxId + 1,
                    question: "",
                    editing: true,
                    answers: null
                };
                //console.log("surveyBuilderReducers, add question, newQuestion: ", newQuestion);
                //
                if (!state.survey.questions.length) {
                    // console.log("surveyBuilderReducers, add question, empty questions");
                    newQuestions = [newQuestion];
                } else {
                    newQuestions = state.survey.questions.slice(0);
                    // console.log("surveyBuilderReducers, add question, oldQuestions: ", oldQuestions);
                    newQuestions.push(newQuestion);
                }

                // console.log("surveyBuilderReducers, add question, newQuestions: ", newQuestions);
                const newState = {
                    ...state,
                    survey: {
                        ...state.survey,
                        questions: newQuestions
                    }
                };
                // console.log("surveyBuilderReducers, add question, newState: ", newState);
                return {
                    user: newState.user,
                    survey: newState.survey
                };
            }
        }
        case SAVE_QUESTION: {
            console.log("save question, state", state);
            if (!Array.isArray(state.survey.questions)) { // || !state.survey.questions.length
                // console.log("surveyBuilderReducers, save question, no questions!!!");
                return state;
            } else {
                let newQuestions = null;
                // let oldQuestions = null;
                const newQuestion = {
                    id: action.id,
                    question: action.value,
                    editing: false,
                    answers: null
                };
                // console.log("surveyBuilderReducers, save question, newQuestion", newQuestion);
                if (!state.survey.questions.length) {
                    // console.log("surveyBuilderReducers, save question, no old questions");
                    newQuestions = [newQuestion];
                } else {
                    newQuestions = state.survey.questions.slice(0);
                    // console.log("surveyBuilderReducers, save question, BEFORE newQuestions: ", newQuestions);
                    // console.log("surveyBuilderReducers, save question, action id: ", action.id);
                    newQuestions.forEach(question => {
                       if (question.id === action.id) {
                           question.id = newQuestion.id;
                           question.question = newQuestion.question;
                           question.editing = newQuestion.editing;
                           question.answers = newQuestion.answers;
                       }
                    });
                    // console.log("surveyBuilderReducers, save question, AFTER newQuestions: ", newQuestions);
                    //newQuestions.push(newQuestion);
                }
                // console.log("surveyBuilderReducers, save question, newQuestions: ", newQuestions);
                const newState = {
                    ...state,
                    survey: {
                        ...state.survey,
                        questions: newQuestions
                    }
                };
                console.log("surveyBuilderReducers, save question, newState: ", newState);
                return {
                    user: newState.user,
                    survey: newState.survey
                }
            }
        }
        case CANCEL_QUESTION: {
            //let canceledQuestion = null;
            // alert(`cancel question, id ${action.id}`);
            let canceledIndex = null;
            let newQuestions = state.survey.questions.slice(0);
            // console.log("surveyBuilderReducers, save question, BEFORE newQuestions: ", newQuestions);
            // console.log("surveyBuilderReducers, save question, action id: ", action.id);
            newQuestions.forEach((question, index) => {
                //console.log("surveyBuilderReducers, cancel question, index: ", index);
                if (question.id === action.id) {
                    //canceledQuestion = question;
                    canceledIndex = index;
                }
            });
            newQuestions.splice(canceledIndex, 1);
            const newState = {
                ...state,
                survey: {
                    ...state.survey,
                    questions: newQuestions
                }
            };
            // console.log("surveyBuilderReducers, cancel question, newState: ", newState);
            return {
                user: newState.user,
                survey: newState.survey
            }
        }
        case EDIT_QUESTION: {
            const {type, id, ...newQuestion} = action;
            return state.map((oldQuestion, index) => (
                oldQuestion.id === index) ? {oldQuestion, ...newQuestion} : oldQuestion
            );
        }
        case DELETE_QUESTION:{
                //let canceledQuestion = null;
                // alert(`cancel question, id ${action.id}`);
            console.log("surveyBuilderReducers, delete question, state", state);
            let deletedIndex = null;
            let newQuestions = state.survey.questions.slice(0);
            console.log("surveyBuilderReducers, delete question, BEFORE newQuestions: ", newQuestions);
            // console.log("surveyBuilderReducers, delete question, action id: ", action.id);
            newQuestions.forEach((question, index) => {
                //console.log("surveyBuilderReducers, cancel question, index: ", index);
                if (question.idd === action.id) {
                    //canceledQuestion = question;
                    deletedIndex = index;
                }
            });
            newQuestions.splice(deletedIndex, 1);
            const newState = {
                ...state,
                survey: {
                    ...state.survey,
                    questions: newQuestions
                }
            };
            console.log("surveyBuilderReducers, delete question, newState: ", newState);
            return {
                user: newState.user,
                survey: newState.survey
            }
        }
        default:
            return state;
    }
};

export default surveyBuilderReducers;