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
    ButtonGroup,
    //Alert
} from 'react-bootstrap';

import classes from "./SurveyBuilder.css";
// import {ADD_QUESTION, EDIT_QUESTION, DELETE_QUESTION, SAVE_QUESTION, CANCEL_QUESTION}
// from "../../././store/actions/actionsTypes";
import {
    asyncCreateQuestion,
    // addQuestion,
    cancelQuestion,
    asyncDeleteQuestion,
    editQuestion,
    showAnswers,
    hideAnswers,
    asyncCreateAnswer,
    asyncSaveAnswer,
    editAnswer,
    cancelAnswer,
    asyncDeleteAnswer,
    // fetchQuestions,
    asyncSaveQuestion,
    asyncFetchSurvey,
    asyncSaveSurvey,
    editSurvey

} from "../../../store/actions/surveyBuilderActions";

import Question from "../../Question/Question";
import NewQuestion from "./NewQuestion";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class SurveyBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = {
            surveyId: null,
            surveyTitle: "",
            question: null,
            answer: null,
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
        this.addNewAnswer = this.addNewAnswer.bind(this);
        // this.submit = this.submit.bind(this);
        this.saveSurveyIdAndTitle = this.saveSurveyIdAndTitle.bind(this);
        this.updateSurveyId = this.updateSurveyId.bind(this);
        this.updateSurveyTitle = this.updateSurveyTitle.bind(this);
        this.editSurvey = this.editSurvey.bind(this);
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

    componentDidMount() {
        // this.fetchSurveyData(this.props.survey.survey_id);
        this.props.onFetchSurvey(1);
        this.props.surveyBuilder && this.setState({surveyId: this.props.surveyBuilder.survey.id})
    }

    editSurvey() {
        this.setState({
            surveyId: this.props.survey.id,
            surveyTitle: this.props.survey.title,
            editingSurvey: true
        });
        const survey = {
            id: this.props.survey.id,
            title: this.props.survey.title
        };
        console.log("editSurvey, state", this.state);
        console.log("editSurvey, survey", survey);
        this.props.onEditSurvey(survey);
    };

    saveSurveyIdAndTitle() {
        const surveyId = this.state.surveyId;
        const surveyTitle = this.state.surveyTitle;
        const saveSurvey = {
            id: surveyId,
            title: surveyTitle
        };
        console.log("saveSurveyIdAndTitle, survey", saveSurvey);
        this.props.onSaveSurvey(saveSurvey);
        this.setState({editingSurvey: false})
    };

    saveAnswer(answer) {
        answer.answer_option = this.state.inputValue;
        console.log("saveAnswer, answer", answer);
        this.props.onAnswerSaved(answer);
        this.setState({editingAnswer: false, newAnswer: false, answer: answer});
    }

    editAnswer(answer) {
        console.log("editAnswer, answer", answer);
        this.setState({answer: answer, inputValue: answer.answer_option});

        this.props.onAnswerEdited(answer);
        this.setState({editingAnswer: true, newAnswer: false});
    }

    cancelAnswer(answer) {
        console.log("cancelAnswer, answer", answer);
        this.props.onAnswerCanceled(answer);
        this.setState({editingAnswer: false, newAnswer: false, answer: answer});
    }

    deleteAnswer(answer) {
        console.log("deleteAnswer, answer", answer);
        this.setState({editingAnswer: false, newAnswer: false, answer: null});
        this.props.onAnswerDeleted(answer);

    }

    addNewAnswer(question) {
        this.setState({newAnswer: true, editingAnswer: true});
        const newAnswer = {
            id: null,
            answer_option: "",
            questionFK: question.id,
        };
        console.log("addNewQuestion, newAnswer", newAnswer);
        this.props.onAnswerCreated(newAnswer)
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

    updateInputValue = (evt) => {
        // console.log("updateInputValue, value: ", evt.target.value);
        this.setState({
            inputValue: evt.target.value,
            inputId: +evt.target.id
        });
        // console.log("updateInputValue, inputValue: ", this.state.inputValue);
        // console.log("!!!!!!!!!!!!updateInputValue, inputId: ", this.state.inputId);
    };

    updateSurveyTitle = (evt) => {
        this.setState({surveyTitle: evt.target.value});
    };

    updateSurveyId = (evt) => {
        this.setState({surveyId: evt.target.value});
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

    ///////////////////////////////

    cancelQuestion(id, value) {
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

    showAnswers(question) {
        console.log("showAnswers, question", question);
        this.setState({question: question});
        // alert(`show answers for question no: ${question.id}`);
        if (question.showAnswers) {
            this.props.onHideAnswers(question);
        } else {
            this.props.onShowAnswers(question);
        }
        // question.showAnswers = !question.showAnswers;
    };

    render() {
        // const showAnswers = (question) => {
        //     console.log("showAnswers, question", question);
        //     // alert(`show answers for question no: ${question.id}`);
        //     if (question.showAnswers) {
        //         this.props.onHideAnswers(question);
        //     } else {
        //         this.props.onShowAnswers(question);
        //     }
        //     // question.showAnswers = !question.showAnswers;
        // };
        function SurveyData(props) {
            if (props.editing) {
                return (
                    <Aux>
                        <FormGroup className={classes.group}>
                            <ControlLabel className={classes.label} htmlFor="id">Survey ID</ControlLabel>
                            <FormControl className={classes.input}
                                         type="text" name="id" id="id"
                                         onChange={props.updateId}
                                         value={this.state.surveyId}/>
                        </FormGroup>
                        <FormGroup className={classes.group}>
                            <ControlLabel className={classes.label} htmlFor="name">Survey Name</ControlLabel>
                            <FormControl className={classes.input}
                                         type="text" name="name" id="name"
                                         onChange={props.updateTitle}
                                         value={this.state.surveyTitle}
                            />
                        </FormGroup>
                        <Button onClick={props.save} bsStyle="success">Save</Button>
                    </Aux>
                );
            } else {
                return (
                <Aux>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="id">Survey ID</ControlLabel>
                        <FormControl className={classes.input}
                                     type="text" name="id" id="id"
                                     // onChange={props.updateId}
                                     value={props.id}/>
                    </FormGroup>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="name">Survey Title</ControlLabel>
                        <FormControl className={classes.input}
                                     type="text" name="name" id="name"
                                     // onChange={props.updateTitle}
                                     value={props.title}
                        />
                    </FormGroup>
                    <Button onClick={props.edit} bsStyle="success">Edit</Button>
                </Aux>
                )
            }
        }

        return (
            <div>
                <PageHeader>Survey Builder</PageHeader>
                <form className={classes.form}>

                    <SurveyData
                        id={this.props.survey && this.props.survey.id ? this.props.survey.id : ""}
                        title={this.props.survey && this.props.survey.title ? this.props.survey.title : ""}
                        updateId={this.updateSurveyId}
                        updateTitle={this.updateSurveyTitle}
                        edit={this.editSurvey}
                        save={this.saveSurveyIdAndTitle}
                    />
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
                    {!this.props || !this.props.survey || !this.props.survey.questions ? null :
                        this.props.survey.questions.map(question => {
                            if (question.editing) {
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
                                // {if (question.showAnswers) {console.log("Nakyy")} else {console.log("Ei nay")}}
                                return (
                                    <Aux key={question.id}/* show={question.showAnswers}*/>
                                        <Question
                                            key={question.id}
                                            question={question}
                                            //id={question.id}
                                            //questionString={question.question}
                                            edit={this.editQuestion}
                                            delete={this.deleteQuestion}
                                            answers={this.showAnswers}
                                            //showAnswers={question.showAnswers}
                                        />
                                        {/*{console.log("answers table, answers", question.answers)}*/}
                                        {/*question.showAnswers &&*/ question.answers && question.answers.map(answer => {

                                            if (answer.editing) {
                                                return (
                                                    <Aux>
                                                        <tr key={answer.id}>
                                                            <td>{answer.id}</td>
                                                            <td>
                                                                <textarea
                                                                    onChange={evt => this.updateInputValue(evt)}
                                                                    value={this.state.inputValue}
                                                                    id={answer.id}/>
                                                            </td>
                                                            <td>
                                                                <ButtonGroup>
                                                                    <Button bsStyle="success"
                                                                            onClick={() => this.saveAnswer(answer)}>
                                                                        Save</Button>
                                                                    <Button bsStyle="default"
                                                                            onClick={() => this.cancelAnswer(answer)}>
                                                                        Cancel</Button>
                                                                </ButtonGroup>
                                                            </td>
                                                        </tr>
                                                    </Aux>
                                                );
                                            } else {
                                                return (
                                                    <Aux/*  show={question.showAnswers}className={question.showAnswers ? "" : "visibility: hidden"}*/>
                                                        <tr key={answer.id}
                                                            className={question.showAnswers ? classes.showAnswers : classes.hideAnswers}>
                                                            <td>{answer.id}</td>
                                                            <td>{answer.answer_option}</td>
                                                            <td>
                                                                <ButtonGroup>
                                                                    <Button onClick={() => this.editAnswer(answer)}
                                                                            bsStyle="success">Edit</Button>
                                                                    <Button onClick={() => this.deleteAnswer(answer)}
                                                                            bsStyle="danger">Delete</Button>
                                                                </ButtonGroup>
                                                            </td>
                                                        </tr>
                                                    </Aux>
                                                )
                                            }
                                        })}
                                        {!question.showAnswers ? null :
                                            <Aux>
                                                <tr key="addAnswer"
                                                    className={question.showAnswers ? classes.showAnswers : classes.hideAnswers}>
                                                    <td></td>
                                                    <td><Button onClick={() => this.addNewAnswer(question)}
                                                                bsStyle="primary">Add Answer</Button></td>
                                                    <td></td>
                                                </tr>
                                            </Aux>
                                        }
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
        onSaveSurvey: (survey) => dispatch(asyncSaveSurvey(survey)),
        onEditSurvey: (survey) => dispatch(editSurvey(survey)),
        onQuestionCreated: (question) => dispatch(asyncCreateQuestion(question)),
        // onQuestionAdded: (question) => dispatch(addQuestion(question)),
        onQuestionEdited: (id, value) => dispatch(editQuestion(id, value)),
        onQuestionSaved: (question) => dispatch(asyncSaveQuestion(question)),
        onQuestionCanceled: (id, value) => dispatch(cancelQuestion(id, value)),
        onQuestionDeleted: (id) => dispatch(asyncDeleteQuestion(id)),
        onShowAnswers: (question) => dispatch(showAnswers(question)),
        onHideAnswers: (question) => dispatch(hideAnswers(question)),
        onAnswerCreated: (answer) => dispatch(asyncCreateAnswer(answer)),
        onAnswerEdited: (answer) => dispatch(editAnswer(answer)),
        onAnswerSaved: (answer) => dispatch(asyncSaveAnswer(answer)),
        onAnswerCanceled: (answer) => dispatch(cancelAnswer(answer)),
        onAnswerDeleted: (answer) => dispatch(asyncDeleteAnswer(answer))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SurveyBuilder, axios));