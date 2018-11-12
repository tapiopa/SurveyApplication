/*
* SurveyBuilder.js
*
*/

import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Table, FormControl, FormGroup, ControlLabel, PageHeader, Button,
    //ButtonToolbar,
    ButtonGroup,
    //Alert
    } from 'react-bootstrap';

import classes from "./SurveyBuilder.css";
import {ADD_QUESTION, DELETE_QUESTION} from "../../../store/actions/actionsTypes";
import Question from "../../Question/Question";
import {addQuestion} from "../../../store/actions/surveyBuilderActions";
import NewQuestion from "./NewQuestion";

// import AddQuestion from "./AddQuestion";

class SurveyBuilder extends Component {
    state = {
        survey: {
            survey_id: "garble",
            survey_name: "survey1",

        },
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
    };



    render() {
        const newQuestionChange = () => {
            alert("New question changed");
        };

        const saveChange = () => {};

        const submit = () => {
            alert("Submit");
        };

        const newQuestion = () => {
            let questions = this.state.questions;
            const maxId = questions.length;
            questions.push(addQuestion(maxId + 1));
            this.setState({
                questions: questions
            });
        };

        const saveNewQuestion = () => {alert("Save question")};
        const cancelNewQuestion = () => {alert("Cancel save question")};

        const editQuestion = () => {alert("Edit question")};
        const deleteQuestion = () => {alert("Delete question")};
        const answersForQuestion = () => {alert("Show answers")};

        return (
            <div>
                <PageHeader>Survey Builder</PageHeader>

                <form className={classes.form}>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="id">Survey ID</ControlLabel>
                        <FormControl className={classes.input} type="text" name="id" id="id" onChange={saveChange} value={this.state.survey.survey_id}/>
                    </FormGroup>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="name">Survey Name</ControlLabel>
                        <FormControl className={classes.input} type="text" name="name" id="name" onChange={saveChange} value={this.state.survey.survey_name}/>
                    </FormGroup>
                    <Button onClick={submit} href="/home" bsStyle="success">Save</Button>
                </form>
                    <PageHeader><small>Questions</small></PageHeader>

                    <Table className={classes.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Question</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.questions.map(question => {
                            if (question.editing) {
                                return (
                                   <NewQuestion
                                       key={question.question_id}
                                       id={question.question_id}
                                       changed={newQuestionChange}
                                       save={saveNewQuestion}
                                       cancel={cancelNewQuestion}/>
                                );
                            } else {
                                return (
                                    <Question
                                        key={question.question_id}
                                        id={question.question_id}
                                        question={question.question_string}
                                        edit={editQuestion}
                                        delete={deleteQuestion}
                                        answers={answersForQuestion}
                                    />
                                );
                            }
                            }


                        )}
                        </tbody>
                    </Table>

                    {/*<NavLink to="/addquestion" className="btn btn-success">Add Question</NavLink>*/}

                    <Button onClick={newQuestion} bsStyle="success">Add a Question</Button>

                {/*<tr key={question.question_id}>*/}
                {/*<td>{question.question_id}</td>*/}
                {/*<td className={classes.tableText}>{question.question_string}</td>*/}
                {/*<td className={classes.tableAction}>*/}
                {/*<ButtonGroup>*/}
                {/*<Button bsStyle="primary">Edit</Button>*/}
                {/*<Button bsStyle="danger">Delete</Button>*/}
                {/*</ButtonGroup>*/}
                {/*</td>*/}
                {/*</tr>*/}

            </div>
        );
    }
}

export default SurveyBuilder;