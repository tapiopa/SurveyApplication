import {ADD_QUESTION, DELETE_QUESTION} from "../actions/actionsTypes";

const surveyBuilderReducers = (state = [], action) => {
    switch (action.type) {
        case ADD_QUESTION:
            return {};
        case DELETE_QUESTION:
            return {};
        default:
            return state;
    }
};

export default surveyBuilderReducers;