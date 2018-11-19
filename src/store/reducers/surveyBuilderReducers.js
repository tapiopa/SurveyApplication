import {
    CREATE_QUESTION,
    ADD_QUESTION,
    SAVE_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    CANCEL_QUESTION,
    //FETCH_QUESTIONS, FETCH_QUESTIONS_FAILED,
    FETCH_SURVEY,
    FETCH_SURVEY_FAILED
} from "../actions/actionsTypes";
import {updateObject} from "../utility";
const initialState = {
    survey: {
        id: null,
        title: ""
    },
    error: false
};

// const getMaxId = (questions) => {
//     let maxId = 0;
//     questions.forEach(question => {
//         if (question.id > maxId) {
//             maxId = question.id;
//         }
//     });
//     return maxId;
// };

const updateQuestionsState = (state, questions) => {
    return updateObject(state, {survey: {...state.survey, questions: questions}});
};

const surveyBuilderReducers = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUESTION: {
            console.log("surveyBuilderReducers, create question, state: ", state);
            //console.log("surveyBuilderReducers, add question, maxId: ", action.maxId);
            //const {type, ...maxId} = action;
            if (!Array.isArray(state.survey.questions)) { // || !state.survey.questions.length
                console.log("surveyBuilderReducers, create question, no questions!!!");
                return state;
            } else {
                //let oldQuestions = null;
                let questions = null;
                //const maxId = state.survey.questions.length;
                //const maxId = getMaxId(state.survey.questions);
                // console.log("surveyBuilderReducers, add question, maxId: ", maxId);
                //const maxId = action.maxId;
                // const newQuestion = {
                //     id: getMaxId(state.survey.questions) + 1,
                //     question: "",
                //     editing: true,
                //     answers: null
                // };
                let newQuestion = action.question;
                newQuestion = {
                    ...newQuestion,
                    editing: true,
                    answers: null
                };
                //console.log("surveyBuilderReducers, add question, newQuestion: ", newQuestion);
                //
                if (!state.survey.questions.length) {
                    // console.log("surveyBuilderReducers, add question, empty questions");
                    questions = [newQuestion];
                } else {
                    questions = state.survey.questions.slice(0);
                    // console.log("surveyBuilderReducers, add question, oldQuestions: ", oldQuestions);
                    questions.push(newQuestion);
                }

                // console.log("surveyBuilderReducers, add question, newQuestions: ", newQuestions);
                const newState = updateQuestionsState(state, questions);
                // const newState = {
                //     ...state,
                //     survey: {
                //         ...state.survey,
                //         questions: newQuestions
                //     }
                // };
                // console.log("surveyBuilderReducers, add question, newState: ", newState);
                return {
                    user: newState.user,
                    survey: newState.survey
                };
            }
        }
        case ADD_QUESTION: {
            // console.log("surveyBuilderReducers, add question, state: ", state);
            // //console.log("surveyBuilderReducers, add question, maxId: ", action.maxId);
            // //const {type, ...maxId} = action;
            // if (!Array.isArray(state.survey.questions)) { // || !state.survey.questions.length
            //     console.log("surveyBuilderReducers, add question, no questions!!!");
            //     return state;
            // } else {
            //     //let oldQuestions = null;
            //     let questions = null;
            //     //const maxId = state.survey.questions.length;
            //     //const maxId = getMaxId(state.survey.questions);
            //     // console.log("surveyBuilderReducers, add question, maxId: ", maxId);
            //     //const maxId = action.maxId;
            //     const newQuestion = {
            //         id: getMaxId(state.survey.questions) + 1,
            //         question: "",
            //         editing: true,
            //         answers: null
            //     };
            //     //console.log("surveyBuilderReducers, add question, newQuestion: ", newQuestion);
            //     //
            //     if (!state.survey.questions.length) {
            //         // console.log("surveyBuilderReducers, add question, empty questions");
            //         questions = [newQuestion];
            //     } else {
            //         questions = state.survey.questions.slice(0);
            //         // console.log("surveyBuilderReducers, add question, oldQuestions: ", oldQuestions);
            //         questions.push(newQuestion);
            //     }
            //
            //     // console.log("surveyBuilderReducers, add question, newQuestions: ", newQuestions);
            //     const newState = updateQuestionsState(state, questions);
            //     // const newState = {
            //     //     ...state,
            //     //     survey: {
            //     //         ...state.survey,
            //     //         questions: newQuestions
            //     //     }
            //     // };
            //     // console.log("surveyBuilderReducers, add question, newState: ", newState);
            //     return {
            //         user: newState.user,
            //         survey: newState.survey
            //     };
            // }
            break;
        }
        case SAVE_QUESTION: {
            console.log("reducer, save question, state", state);
            console.log("reducer, save question, question", action.question);
            if (!Array.isArray(state.survey.questions)) { // || !state.survey.questions.length
                // console.log("surveyBuilderReducers, save question, no questions!!!");
                return state;
            } else {
                let questions = null;
                // let oldQuestions = null;
                const newQuestion = action.question;
                // console.log("surveyBuilderReducers, save question, newQuestion", newQuestion);
                if (!state.survey.questions.length) {
                    // console.log("surveyBuilderReducers, save question, no old questions");
                    questions = [newQuestion];
                } else {
                    questions = state.survey.questions.slice(0);
                    // console.log("surveyBuilderReducers, save question, BEFORE newQuestions: ", newQuestions);
                    // console.log("surveyBuilderReducers, save question, action id: ", action.id);
                    questions.forEach(question => {
                       if (question.id === action.question.id) {
                           question.id = newQuestion.id;
                           question.question = newQuestion.question;
                           question.editing = false;
                           question.answers = newQuestion.answers;
                       }
                    });
                    // console.log("surveyBuilderReducers, save question, AFTER newQuestions: ", newQuestions);
                    //newQuestions.push(newQuestion);
                }
                // console.log("surveyBuilderReducers, save question, newQuestions: ", newQuestions);
                const newState = updateQuestionsState(state, questions);
                // const newState = {
                //     ...state,
                //     survey: {
                //         ...state.survey,
                //         questions: newQuestions
                //     }
                // };
                console.log("surveyBuilderReducers, save question, newState: ", newState);
                return {
                    user: newState.user,
                    survey: newState.survey
                }
            }
            return state;
        }
        case CANCEL_QUESTION: {
            //let canceledQuestion = null;
            // alert(`cancel question, id ${action.id}`);
            let canceledIndex = null;
            let questions = state.survey.questions.slice(0);
            // console.log("surveyBuilderReducers, save question, BEFORE newQuestions: ", newQuestions);
            // console.log("surveyBuilderReducers, save question, action id: ", action.id);
            questions.forEach((question, index) => {
                //console.log("surveyBuilderReducers, cancel question, index: ", index);
                if (question.id === action.id) {
                    //canceledQuestion = question;
                    if (action.value) {
                        question.editing = false;
                        canceledIndex = -1;
                    } else {
                        canceledIndex = index;
                    }
                }
            });
            if (canceledIndex > -1) {
                questions.splice(canceledIndex, 1);
            }
            const newState = updateQuestionsState(state, questions);
            // const newState = {
            //     ...state,
            //     survey: {
            //         ...state.survey,
            //         questions: questions
            //     }
            // };
            // console.log("surveyBuilderReducers, cancel question, newState: ", newState);
            return {
                user: newState.user,
                survey: newState.survey
            }
        }
        case EDIT_QUESTION: {
            //let canceledQuestion = null;
            // alert(`cancel question, id ${action.id}`);
            //let editIndex = null;
            let questions = state.survey.questions.slice(0);
            // console.log("surveyBuilderReducers, save question, BEFORE newQuestions: ", newQuestions);
            // console.log("surveyBuilderReducers, save question, action id: ", action.id);
            questions.forEach((question, index) => {
                //console.log("surveyBuilderReducers, cancel question, index: ", index);
                if (question.id === action.id) {
                    //canceledQuestion = question;
                    //editIndex = index;
                    question.editing = true;
                }
            });
            // newQuestions.splice(editIndex, 1);
            const newState = updateQuestionsState(state, questions);
            // const newState = {
            //     ...state,
            //     survey: {
            //         ...state.survey,
            //         questions: questions
            //     }
            // };
            // console.log("surveyBuilderReducers, cancel question, newState: ", newState);
            return {
                user: newState.user,
                survey: newState.survey
            }
        }
        case DELETE_QUESTION:{
                //let canceledQuestion = null;
                // alert(`cancel question, id ${action.id}`);
            // console.log("surveyBuilderReducers, delete question, state", state);
            let deletedIndex = null;
            let questions = state.survey.questions.slice(0);
            // console.log("surveyBuilderReducers, delete question, BEFORE newQuestions: ", questions);
            // console.log("surveyBuilderReducers, delete question, action id: ", action.id);
            questions.forEach((question, index) => {
                //console.log("surveyBuilderReducers, cancel question, index: ", index);
                if (question.id === action.id) {
                    //canceledQuestion = question;
                    deletedIndex = index;
                }
            });
            questions.splice(deletedIndex, 1);
            const newState = updateQuestionsState(state, questions);
            // const newState = {
            //     ...state,
            //     survey: {
            //         ...state.survey,
            //         questions: questions
            //     }
            // };
            // console.log("surveyBuilderReducers, delete question, newState: ", newState);
            return {
                user: newState.user,
                survey: newState.survey
            }
        }
        case FETCH_SURVEY: {
            // console.log("reducer, ffetch survey, questions", action.survey);
            // const newState = updateObject(state, action.survey);
            // // = updateObject(state, {error: false});
            // console.log("reducer, ffetch survey, new state", newState);
            // return {
            //     user: newState.user,
            //     survey: newState.survey,
            //     error: false
            // }
            return updateObject(state, {survey: action.survey});
        }
        case FETCH_SURVEY_FAILED: {
            return updateObject(state, {error: true});
        }
        default:
            return state;
    }
};

export default surveyBuilderReducers;