import {ADD_QUESTION} from "./actionsTypes";

export const addQuestion = (id) => {
    return ({
        question_id: id,
        question_string: null,
        editing: true,
        answers: null
    });
};