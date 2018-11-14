import {ADD_QUESTION} from "./actionsTypes";

const initialState = {
    user: {
        user_id: 1,
        user_name: "Tapio"
    },
    survey: {
        survey_id: 1,
        survey_name: "First Survey",
        questions: [
            {
                question_id: 1,
                question_string: "Are you nuts???",
                editing: false,
                answers: [
                    {
                        answer_id: 1,
                        answer_string: "yes"
                    },
                    {
                        answer_id: 2,
                        answer_string: "no"
                    }
                ]
            },
            {
                question_id: 2,
                question_string: "How are  you still here?",
                editing: false,
                answers: [
                    {
                        answer_id: 1,
                        answer_string: "I overslept."
                    },
                    {
                        answer_id: 2,
                        answer_string: "I am going already."
                    }
                ]
            }
        ]
    }
};

export const addQuestion = (questions) => {
    //console.log('survey builder actions, add question, id: ', id);
    //console.log('survey builder actions, add question, questions: ', questions);
    let newQuestions = questions.slice
    questions.push({
        question_id: questions.length + 1,
        question_string: null,
        editing: true,
        answers: null
    });
    //console.log('survey builder actions, add question, newQuestions: ', questions);
    return (
        questions
       );
};