/*
* SurveyBuilder.js
*
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-survey';

import Aux from "../../../hoc/Aux/Aux";

import {
    Table, FormControl, FormGroup, ControlLabel, PageHeader, Button,
    ButtonToolbar,
    //ButtonGroup,
    //Alert
} from 'react-bootstrap';

import classes from "./SurveyBuilder.css";
// import {ADD_QUESTION, EDIT_QUESTION, DELETE_QUESTION, SAVE_QUESTION, CANCEL_QUESTION}
// from "../../././store/actions/actionsTypes";
import {
    asyncCreateQuestion,
    addQuestion,
    cancelQuestion,
    asyncDeleteQuestion,
    editQuestion,
    // fetchQuestions,
    asyncSaveQuestion,
    asyncFetchSurvey

} from "../../../store/actions/surveyBuilderActions";

import Question from "../../Question/Question";
import NewQuestion from "./NewQuestion";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class SurveyBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = {
            question: null,
            editingSurvey: false,
            editingQuestion: false,
            editingAnswer: false,
            newSurvey: false,
            newQuestion: false,
            newAnswer: false,
            inputValue: "",
            inputId: -1
        };
        this.updateInputValue = this.updateInputValue.bind(this);
        this.addNewQuestion = this.addNewQuestion.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.cancelQuestion = this.cancelQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.showAnswers = this.showAnswers.bind(this);
        this.saveAnswer = this.saveAnswer.bind(this);
        this.editAnswer = this.editAnswer.bind(this);
        this.cancelAnswer = this.cancelAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.submit = this.submit.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

    logState = () => {
        for (const key of Object.keys(this.state)) {
            console.log(key, this.props[key]);
        }
    };

    logProps = () => {
        for (const key of Object.keys(this.props)) {
            console.log(key, this.props[key]);
        }
    };

    componentDidMount () {
        // this.fetchSurveyData(this.props.survey.survey_id);
        this.props.onFetchSurvey(1);
    }

    saveAnswer() {

    }

    editAnswer() {

    }

    cancelAnswer() {

    }

    deleteAnswer() {

    }

    addNewQuestion() {
        this.setState({
            newQuestion: true,
            editingQuestion: true,
        });
        const question = {
            id: null,
            question: "Test",
            surveyFK: this.props.survey.id
        };
        console.log("addNewQuestion, question", this.state);

        this.props.onQuestionCreated(question);
        //this.props.onQuestionAdded(question);
    }

    addAnswer() {
        this.setState({newAnswer: true});
    }

    updateInputValue = (evt) => {
        // console.log("updateInputValue, value: ", evt.target.value);
        this.setState({
            inputValue: evt.target.value,
            inputId: +evt.target.id
        });
        // console.log("updateInputValue, inputValue: ", this.state.inputValue);
        // console.log("!!!!!!!!!!!!updateInputValue, inputId: ", this.state.inputId);
    };

    // const getQuestion = (id) => {
    //     let foundQuestion = null;
    //     console.log("getQuestion, state", this.state);
    //     this.props.survey.questions.forEach(question => {
    //         if (question.id === id) {
    //             foundQuestion = question;
    //         }
    //     });
    //     console.log("getQuestion, question", foundQuestion);
    //     return foundQuestion;
    // };

    saveChange = () => {
    };

    saveQuestion() {
        console.log("saveQuestion, state", this.state);
            // this.props.onQuestionSaved(this.state.inputId, this.state.inputValue);
        console.log("saveQuestion, survey", this.props.survey);
        const question = {
            id: this.state.inputId,
            question: this.state.inputValue,
            surveyFK: this.props.survey.id
        };
        console.log("saveQuestion, question", question);
        //const foundQuestion = ,
        // const newQuestion = {
        //     id: this.state.inputId,
        //     question: this.state.inputValue,
        //     surveyFK: this.state.survey.survey_id
        // };
        // axios.post(`/questions/${newQuestion}`)
        // .then(response => {
        //     console.log("axios, response", response)
        // });
        this.props.onQuestionSaved(question);
        this.setState({inputId: -1, inputValue: ""})


    };
    ////////////////////////////////

    submit = () => {
        // const maxId = this.state.questions.length;
        // const addedQuestions = addNewQuestion(this.state.questions, maxId);
        // //console.log("added state: ", stateadd);
        // this.setState({questions: addedQuestions});
        // //console.log("state: ", this.state);
        // //console.log("store state: ", this.props.store.getState());
    };


    cancelQuestion(id, value){
        // console.log("!!!!!!!!!!!!!!!!!cancelQuestion, inputId: ", this.state.inputId);
        this.props.onQuestionCanceled(id, value);
        this.setState({inputId: -1, inputValue: ""})
    };

    editQuestion(id, value) {
        //alert("Edit question")
        //alert(`edit value: ${value}`);
        this.setState({inputValue: value});
        //console.log("???????????editQuestion, state", this.state);
        this.props.onQuestionEdited(id, value);
    };


    deleteQuestion(id) {
        //alert(`Delete question, id: ${id}`);
        console.log("!!!!!!!!!!!!!!!!!deleteQuestion, inputId: ", id);
        this.props.onQuestionDeleted(id);
        //console.log("deleteQuestion: state", this.state);
        //console.log("deleteQuestions, props", this.props.survey.questions);
    };


    showAnswers(question_id) {
        console.log("showAnswers, question id", question_id);
        alert(`show answers for question no: ${question_id}`);

    };
    render() {

        return (
            <div>
                <PageHeader>Survey Builder</PageHeader>
                <form className={classes.form}>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="id">Survey ID</ControlLabel>
                        <FormControl className={classes.input}
                                     type="text"
                                     name="id"
                                     id="id"
                                     onChange={this.saveChange}
                                     value={this.props.survey.id ? this.props.survey.id : ""}/>
                    </FormGroup>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="name">Survey Name</ControlLabel>
                        <FormControl className={classes.input}
                                     type="text"
                                     name="name"
                                     id="name"
                                     onChange={this.saveChange}
                                     value={this.props.survey.title ? this.props.survey.title : ""}
                        />
                    </FormGroup>
                    <Button onClick={this.submit} bsStyle="success">Save</Button>
                </form>
                <br/>
                <br/>
                <h2 className={classes.subheader}>Questions</h2>
                <br/>
                <Table className={classes.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{this.props ? console.log("tbody, this.props ", this.props) : null}*/}
                    {/*{this.props.qstns ? console.log("tbody, this.props.qstns not null", this.props.qstns) : null}*/}


                    {/*{!this.state || !this.state.survey || !this.state.survey.questions*/}
                    {/*//|| !this.state.survey.questions[0].answers*/}
                    {/*? console.log("tbody, no props") : this.state.survey.questions.map(question => {*/}
                    {/*// {console.log("tbody, state questions", this.state.survey.questions)}*/}
                    {!this.props || !this.props.survey || !this.props.survey.questions ? null //console.log("tbody, no props")
                        : this.props.survey.questions.map(question => {
                            // {/*{console.log("tbody, props", this.props.survey.questions)}*/}

                            // console.log("tbody, not null");
                            // console.log("!!!!!!tbody, question: ", question);
                            //return null;
                            if (question.editing) {

                                // console.log("Hep1");
                                // this.setState({inputId: -1});
                                // this.setState({inputValue: ""});
                                // console.log("new question inputValue: ", this.state.inputValue);
                                return (
                                    <Aux key="newQuestion">
                                        <NewQuestion
                                            key={question.id}
                                            id={question.id}
                                            inputValue={this.state.inputValue}
                                            onChange={this.updateInputValue}
                                            // changed={changedNewQuestion}
                                            save={this.saveQuestion}
                                            cancel={this.cancelQuestion}/>
                                        {!question.answers ? null : question.answers.map(answer => {
                                            return (
                                                <tr key={answer.answer_option}>
                                                    <td>&nbsp;&nbsp;</td>
                                                    <td>&ndash;</td>
                                                    <td>{answer.answer_option}</td>
                                                </tr>
                                            )
                                        })}

                                    </Aux>

                                );
                            } else {
                                // console.log("Hep2");
                                return (
                                    <Aux key={question.id}>
                                        <Question
                                            key={question.id}
                                            id={question.id}
                                            question={question.question}
                                            edit={this.editQuestion}
                                            delete={this.deleteQuestion}
                                            answers={this.showAnswers}
                                        />
                                        {/*{console.log("answers table, answers", question.answers)}*/}
                                        {!question.answers ? null : question.answers.map(answer => {
                                            return (
                                                <tr key={answer.answer_option}>
                                                    <td>&nbsp;&nbsp;</td>
                                                    <td>&ndash;</td>
                                                    <td>{answer.answer_option}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr key="addAnswer">
                                            <td></td>
                                            <td><Button bsStyle="primary">Add Answer</Button></td>
                                            <td ></td>
                                        </tr>
                                    </Aux>
                                );
                            }
                        })}
                    </tbody>
                </Table>

                {/*<NavLink to="/addquestion" className="btn btn-success">Add Question</NavLink>*/}

                <Button onClick={this.addNewQuestion} bsStyle="success">Add a Question</Button>


                <ButtonToolbar>
                    <Button bsStyle="success" bsSize="small" onClick={this.logState}>Log State</Button>
                    <Button bsStyle="success" bsSize="small" onClick={this.logProps}>Log Props</Button>
                </ButtonToolbar>

            </div>
        );
    }


}

const mapStateToProps = (state) => {
    // console.log("SurveyBuilder, mapStateToProps, state: ", state);
    return {
        survey: state.surveyBuilder.survey,
        user: state.user,
        account: state.account,
        app: state.app,
        error: state.surveyBuilder.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchSurvey: (survey_id) => dispatch(asyncFetchSurvey(survey_id)),
        onQuestionCreated: (question) => dispatch(asyncCreateQuestion(question)),
        onQuestionAdded: (question) => dispatch(addQuestion(question)),
        onQuestionEdited: (id, value) => dispatch(editQuestion(id, value)),
        onQuestionSaved: (question) => dispatch(asyncSaveQuestion(question)),
        onQuestionCanceled: (id, value) => dispatch(cancelQuestion(id, value)),
        onQuestionDeleted: (id) => dispatch(asyncDeleteQuestion(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SurveyBuilder, axios));