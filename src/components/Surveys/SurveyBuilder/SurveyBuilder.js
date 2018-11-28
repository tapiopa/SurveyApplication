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
    editSurvey,
    setSurveyTitle,
    setQuestionString,
    setAnswerString
} from "../../../store/actions/surveyBuilderActions";

import Question from "../../Question/Question";
import NewQuestion from "./NewQuestion";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Badge from "react-bootstrap/es/Badge";

class SurveyBuilder extends Component {
    state = {
        id: null,
        title: "",
        questions: null,
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

    constructor(props) {
        super(props);

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
        // this.updateSurveyId = this.updateSurveyId.bind(this);
        this.updateSurveyTitle = this.updateSurveyTitle.bind(this);
        this.updateQuestionString = this.updateQuestionString.bind(this);
        this.updateAnswerString = this.updateAnswerString.bind(this);
        this.editSurvey = this.editSurvey.bind(this);
        this.updateState = this.updateState.bind(this);
        this.goBack = this.goBack.bind(this);
        // this.handleSurveyTitleChange = this.handleSurveyTitleChange.bind(this);
    }

    logState = () => {
        for (const key of Object.keys(this.state)) {
            console.log(key, this.state[key]);
        }
    };

    logProps = () => {
        for (const key of Object.keys(this.props)) {
            console.log(key, this.props[key]);
        }
    };

    componentDidMount() {
        console.log("componentDidMount, props", this.props);
        const newSurveyBuilder = this.props.surveyBuilder && this.props.surveyBuilder.survey && this.props.surveyBuilder.survey.newSurvey;
        const newSurvey = this.props.survey && this.props.survey.id && this.props.survey.newSurvey;
        const oldSurveyBuilderWithId = this.props.surveyBuilder && this.props.surveyBuilder.survey && this.props.surveyBuilder.survey.id && !this.props.surveyBuilder.survey.newSurvey;
        const oldSurveyWithId  = this.props.survey && this.props.survey.id && !this.props.survey.newSurvey;
        if (newSurveyBuilder) {
            console.log("componentDidMount, new SurveyBuilder", this.props.surveyBuilder.survey);
            this.updateState(this.props.surveyBuilder.survey);
        } else if (newSurvey) {
            console.log("componentDidMount, new Survey", this.props.survey);
            this.updateState(this.props.survey);
        } else if (oldSurveyBuilderWithId) {
            console.log("componentDidMount with SurveyBuilder, Fetch Survey, id", this.props.surveyBuilder.survey.id);
            this.props.onFetchSurvey(this.props.surveyBuilder.survey.id);
        } else if (oldSurveyWithId) {
            console.log("componentDidMount with Survey, Fetch Survey, id", this.props.survey.id);
            this.props.onFetchSurvey(this.props.survey.id);
        } else {
            console.log("componentDidMount, NO Survey, props", this.props);

        }

        // this.props.surveyBuilder && this.setState({surveyId: this.  props.surveyBuilder.survey.id})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillReceiveProps, nextProps", nextProps);
        console.log("componentWillReceiveProps, nextContext", nextContext);
        const newSurveyBuilder = nextProps.surveyBuilder &&nextProps.surveyBuilder.survey && nextProps.surveyBuilder.survey.newSurvey;
        const newSurvey = nextProps.survey && nextProps.survey.id;
        const oldSurveyBuilderWithId = nextProps.surveyBuilder && nextProps.surveyBuilder.survey && nextProps.surveyBuilder.survey.id;
        const oldSurveyWithId  = nextProps.survey && nextProps.survey.id;
        if (newSurveyBuilder) {
            console.log("componentWillReceiveProps, new SurveyBuilder", nextProps.surveyBuilder.survey);
            this.updateState(nextProps.surveyBuilder.survey);
        } else if (newSurvey) {
            console.log("componentWillReceiveProps, new Survey",nextProps.survey);
            this.updateState(nextProps.survey);
        } else if (oldSurveyBuilderWithId) {
            console.log("componentWillReceiveProps with SurveyBuilder, Fetch Survey, id", nextProps.surveyBuilder.survey.id);
            this.props.onFetchSurvey(nextProps.surveyBuilder.survey.id);
        } else if (oldSurveyWithId) {
            console.log("componentWillReceiveProps with Survey, Fetch Survey, id", nextProps.survey.id);
            this.props.onFetchSurvey(nextProps.survey.id);
        } else {
            console.log("componentWillReceiveProps, NO Survey, props", nextProps);
        }
        if (nextProps.survey && nextProps.survey.saveSuccess) {
            this.setState({
                saveSuccess: nextProps.saveSuccess,
                editingSurvey: nextProps.editingSurvey
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // console.log("shouldComponentUpdate, nextProps", nextProps);
        // console.log("shouldComponentUpdate, nextState", nextState);
        // console.log("shouldComponentUpdate, nextContext", nextContext);
        //Check if surveys are different
        if (nextProps.survey && this.props.survey &&
            nextProps.survey.title !== this.props.survey.title) {
            console.log("shouldComponentUpdate, titles different");
            return true;
        }
        if (nextProps.survey !== this.props.survey) {
            console.log("shouldComponentUpdate, surveys different");
            return true;
        }
        //Check if questions are different
        if (nextProps.survey && this.props.survey &&
            nextProps.survey.questions !== this.props.survey.questions) {
            console.log("shouldComponentUpdate, questions different");
            return true;
        }
        //Check if answers are differen
        if (nextProps.survey && nextProps.survey.questions &&
            this.props.survey && this.props.survey.questions) {
            nextProps.survey.questions.forEach(questionA => {
                this.props.survey.questions.forEach(questionB => {
                    if (questionA.id === questionB.id) {
                        if (questionA.answers !== questionB.answers) {
                            console.log("shouldComponentUpdate, answers different");
                            return true;
                        }
                    }
                })
            })
        }
        console.log("shouldComponentUpdate, no change — no update");
    }

    updateState (someProps) {
        console.log("updateState, some props", someProps);
        const questions = {...someProps.questions};
        this.setState({
            id: someProps.id,
            title: someProps.title,
            questions: questions,
            newSurvey: someProps.newSurvey
        });
        console.log("updateState, AFTER state", this.state);
    }

    goBack() {
        console.log("goBack");
        this.props.history.goBack();
    }

    editSurvey() {
        console.log("editSurvey");
        this.setState({
            id: this.props.survey.id,
            title: this.props.survey.title,
            editingSurvey: true
        });
        const survey = {
            id: this.props.survey.id,
            title: this.props.survey.title,
            questions: this.props.survey.questions,
            newSurvey: this.state.newSurvey
        };
        console.log("editSurvey, state", this.state);
        console.log("editSurvey, survey", survey);
        this.props.onEditSurvey(survey);
    };


    saveSurveyIdAndTitle() {
        const surveyId = this.state.id;
        const surveyTitle = this.state.title;
        const saveSurvey = {
            id: surveyId,
            title: surveyTitle
        };
        console.log("saveSurveyIdAndTitle, survey", saveSurvey, "state new", this.state.newSurvey, "props new", this.props.newSurvey);
        if (this.state.newSurvey) {
            this.props.onSaveSurvey(saveSurvey, true);
        } else {
            this.props.onSaveSurvey(saveSurvey, false);
        }

        // this.setState({editingSurvey: false})
    };

    updateInputValue = (evt) => {
        console.log("updateInputValue, evt target value: ", evt);
        this.setState({
            inputValue: evt.target.value,
            inputId: +evt.target.id
        });
        // console.log("updateInputValue, inputValue: ", this.state.inputValue);
        // console.log("!!!!!!!!!!!!updateInputValue, inputId: ", this.state.inputId);
    };

    updateSurveyTitle = (evt) => {
        console.log("updateSurveyTitle, evt target value: ", evt);
        const title = document.getElementById("title").value;
        console.log("updateInputValue, title: ", title);
        // this.setState({title: title});
        // console.log("updateSurveyTitle, state survey title", this.state.title);
        this.props.onSetSurveyTitle(this.props.survey, title);
    };

    updateQuestionString = (evt) => {
        console.log("updateQuestionString, evt target value: ", evt.target.value);
        this.setState({
            inputValue: evt.target.value,
            inputId: +evt.target.id
        });
        // const title = document.getElementById("title").value;
        console.log("updateSurveyTitle, state question input value: ", this.state.inputValue, "input id", this.state.inputId);
        // this.setState({title: title});
        // console.log("updateSurveyTitle, state survey title", this.state.title);
        // this.props.onSetSurveyTitle(this.props.survey, title);
        this.props.onSetQuestionString(this.state.inputId, this.state.inputValue);
    };

    updateAnswerString = (evt) => {
        console.log("console, evt target value: ", evt.target.value);
        this.setState({
            inputValue: evt.target.value,
            inputId: +evt.target.id
        });
        // const title = document.getElementById("title").value;
        console.log("updateAnswerString, state answer input value: ", this.state.inputValue, "input id", this.state.inputId);
        // this.setState({title: title});
        // console.log("updateSurveyTitle, state survey title", this.state.title);
        // this.props.onSetSurveyTitle(this.props.survey, title);
        this.props.onSetAnswerString(this.state.inputId, this.state.inputValue);
    };

    saveAnswer(answer) {
        answer.answer_option = this.state.inputValue;
        console.log("saveAnswer, answer", answer);
        this.props.onAnswerSaved(answer);
        this.setState({editingAnswer: false, newAnswer: false, answer: answer});
        this.setState({inputId: -1, inputValue: ""});
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
            question: "",
            surveyFK: this.props.survey ? this.props.survey.id : null
        };
        console.log("addNewQuestion, question", this.state);

        this.props.onQuestionCreated(question);
        //this.props.onQuestionAdded(question);
    }



    // updateSurveyId = (evt) => {
    //     this.setState({surveyId: evt.target.value});
    // };

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

    saveQuestion(editedQuestion) {
        console.log("saveQuestion, state", this.state);
        console.log("saveQuestion, editedQuestion", editedQuestion);
        // this.props.onQuestionSaved(this.state.inputId, this.state.inputValue);
        console.log("saveQuestion, survey", this.props.survey);
        let savedQuestion = null;
        if (editedQuestion) {
            editedQuestion.question = this.state.inputValue;
            savedQuestion = editedQuestion;
        } else {
           savedQuestion = {
                id: this.state.inputId,
                question: this.state.inputValue,
                surveyFK: this.props.survey.id
            };
        }

        const newQuestion = this.state.newQuestion;
        console.log("saveQuestion, question", savedQuestion);
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
        this.props.onQuestionSaved(savedQuestion, newQuestion);
        this.setState({inputId: -1, inputValue: ""});


    };

    ///////////////////////////////

    cancelQuestion(id, value) {
        // console.log("!!!!!!!!!!!!!!!!!cancelQuestion, inputId: ", this.state.inputId);
        this.props.onQuestionCanceled(id, value);
        this.setState({inputId: -1, inputValue: ""})
    };

    editQuestion(question) {
        alert("Edit question")
        //alert(`edit value: ${value}`);
        this.setState({
            inputId: question.id,
            inputValue: question.question,
            newQuestion: false
        });
        //console.log("???????????editQuestion, state", this.state);
        this.props.onQuestionEdited(question);
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
        // function SurveyData(props) {
        //     if (props.editing) {
        //         return (
        //             <Aux>
        //                 <FormGroup className={classes.group}>
        //                     <ControlLabel className={classes.label} htmlFor="id">Survey ID</ControlLabel>
        //                     <FormControl className={classes.input}
        //                                  type="text" name="id" id="id" disabled
        //                                  //onChange={props.updateId}
        //                                  value={props.id}/>
        //                 </FormGroup>
        //                 <FormGroup className={classes.group}>
        //                     <ControlLabel className={classes.label} htmlFor="title">Survey Name</ControlLabel>
        //                     <FormControl className={classes.input}
        //                                  type="text" name="title" id="title"
        //                                  disabled={!this.state.editingSurvey}
        //                                  onChange={props.updateTitle}
        //                                  value={props.title}
        //                     />
        //                 </FormGroup>
        //                 <Button onClick={props.edit} disabled={this.state.editingSurvey} bsStyle="primary">Edit</Button>
        //                 <Button onClick={props.save} disabled={!this.state.editingSurvey} bsStyle="success">Save</Button>
        //             </Aux>
        //         );
        //     } else {
        //         return (
        //         <Aux>
        //             <FormGroup className={classes.group}>
        //                 <ControlLabel className={classes.label} htmlFor="id">Survey ID</ControlLabel>
        //                 <FormControl className={classes.input}
        //                              type="text" name="id" id="id" disabled
        //                              // onChange={props.updateId}
        //                              value={props.id}/>
        //             </FormGroup>
        //             <FormGroup className={classes.group}>
        //                 <ControlLabel className={classes.label} htmlFor="name">Survey Title</ControlLabel>
        //                 <FormControl className={classes.input} disabled
        //                              type="text" name="name" id="name"
        //                              disabled={!this.state.editingSurvey}
        //                              // onChange={props.updateTitle}
        //                              value={props.title}
        //                 />
        //             </FormGroup>
        //             <Button onClick={props.edit} bsStyle="primary">Edit</Button>
        //             <Button onClick={props.save} disabled bsStyle="success">Save</Button>
        //         </Aux>
        //         )
        //     }
        // }

        return (
            <div className={classes.surveyBuilder}>
                <PageHeader>Survey Builder</PageHeader>
                <form className={classes.form}>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="id">Survey ID</ControlLabel>
                        <FormControl className={classes.input}
                                     type="text" name="id" id="id" disabled={true}
                            //onChange={props.updateId}
                                     value={this.state.id}/>
                    </FormGroup>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="title">Survey Name</ControlLabel>
                        <FormControl className={classes.input}
                                     disabled={!this.state.editingSurvey}
                                     type="text" name="title" id="title"
                                     onChange={() => this.updateSurveyTitle(this.state.title)}
                                     value={this.state.title}
                        />
                    </FormGroup>
                    <Button onClick={this.editSurvey}
                            disabled={this.state.editingSurvey}
                            bsStyle="primary">Edit</Button>
                    <Button onClick={this.saveSurveyIdAndTitle}
                            disabled={!this.state.editingSurvey}
                            bsStyle="success">Save</Button>
                    {/*<SurveyData*/}
                        {/*id={this.props.survey && this.props.survey.id ? this.props.survey.id : ""}*/}
                        {/*title={this.props.survey && this.props.survey.title ? this.props.survey.title : ""}*/}
                        {/*updateTitle={this.updateSurveyTitle}*/}
                        {/*edit={this.editSurvey}*/}
                        {/*save={this.saveSurveyIdAndTitle}*/}
                        {/*editing={this.state.editingSurvey}*/}
                    {/*/>*/}
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
                    {!(this.props && this.props.survey && this.props.survey.questions /*&& this.props.survey.questions.map*/) ? null :
                        this.props.survey.questions.map(question => {
                            if (question.editing) {
                                return (
                                    <Aux key="newQuestion">
                                        <NewQuestion
                                            key={question.id}
                                            id={question.id}
                                            question={question}
                                            inputValue={this.state.inputValue}
                                            onChange={this.updateQuestionString}
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
                                                                    onChange={evt => this.updateAnswerString(evt)}
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

                {/*{!this.state.newSurvey ? null :*/}
                    <Button bsStyle="info" onClick={this.goBack}>Go Back</Button>
                {/*}*/}
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
        onSaveSurvey: (survey, newSurvey) => dispatch(asyncSaveSurvey(survey, newSurvey)),
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
        onAnswerDeleted: (answer) => dispatch(asyncDeleteAnswer(answer)),
        onSetSurveyTitle: (survey, title) => dispatch(setSurveyTitle(survey, title)),
        onSetQuestionString: (question_id, question_string) => dispatch(setQuestionString(question_id, question_string)),
        onSetAnswerString: (answer_id, answer_string) => dispatch(setAnswerString(answer_id, answer_string))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SurveyBuilder, axios));