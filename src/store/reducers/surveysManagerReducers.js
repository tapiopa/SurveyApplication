import {
    LIST_SURVEYS
} from "../actions/actionsTypes";

const initialState = {
    surveysManager: null
};

const surveysManagerReducers = (state = initialState, action) => {
    switch (action.type) {
        case LIST_SURVEYS: {
            console.log("surveysManagerReducers, action surveys", action.surveys);
            const surveys = action.surveys;
            console.log("surveysManagerReducers, surveys", surveys);
            return {
                surveys: surveys
            }
        }
        default: {
            return state;
        }
    }
    };

export default surveysManagerReducers;