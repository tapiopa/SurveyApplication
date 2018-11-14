/*
* SurveyBuilder.js
*
*/

import React, {Component} from 'react';
import { connect } from 'react-redux'
// import {NavLink} from 'react-router-dom';
import axios from '../../../axios-survey';

import {Table, FormControl, FormGroup, ControlLabel, PageHeader, Button,
    ButtonToolbar,
    //ButtonGroup,
    //Alert
    } from 'react-bootstrap';

import classes from "./SurveyBuilder.css";
import {
    ADD_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    SAVE_QUESTION,
    CANCEL_QUESTION
} from "../../../store/actions/actionsTypes";

import Question from "../../Question/Question";
import NewQuestion from "./NewQuestion";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class SurveyBuilder extends Component {
    constructor(props)  {
        super(props);
        console.log("survey_id", this.props.survey.survey_id);
        this.fetchSurveyData(this.props.survey.survey_id);
    }

    logState = () => {
        for (const key of Object.keys(this.props)) {
            console.log(key, this.props[key]);
        }
    };

    fetchSurveyData = (survey_id) => {

        axios.get(`/surveys/${survey_id}`) //
        .then(response => {
            console.log('fetchSurveyData, data:', response.data);
            this.props.survey.survey_name = response.data[0].title;
            // this.setState({
            //     user_id: response.data[0].id,
            //     username: response.data[0].account,
            //     password: response.data[0].password,
            //     joined: response.data[0].joinedDate,
            //     expires: response.data[0].expireDate,
            //     lastEdited: response.data[0].modifiedDate
            // });
            this.fetchQuestions(survey_id);
        });
    };

    fetchQuestions = (survey_id) => {
        axios.get(`/surveys/${survey_id}/questions`)
            .then(response => {
                console.log('fetchQuestions, data:', response.data);
                //let data = response.data;
                let questions = response.data;
                //let i = 1;
                // data.forEach(question => {
                //     questions.push({id: i, question: question.question});
                //     i = i + 1;
                // });
                console.log("fetchQuestions, questions", questions);
                //this.setState({survey: {questions: questions}});
                this.props.survey.questions = questions;
                console.log("fetchQuestions, props.questions", this.props.survey.questions);
                this.setState({survey: { questions: questions}});

            })
    };

    fetchAnswers = (id) => {
        axios.get()
    }

    // fetchAnswers = (id) => {
    //     axios.get(`/answers/`)
    // };


    state = {
        // survey: {
        //     //survey_id: 1,
        //     //survey_name: this.props.survey.survey_name,
        //     questions: []
        // },
        inputValue: "",
        inputId: -1
    };

    updateInputValue = (evt) => {
        // console.log("updateInputValue, value: ", evt.target.value);
        this.setState({
            inputValue: evt.target.value,
            inputId: +evt.target.id
        });
        // console.log("updateInputValue, inputValue: ", this.state.inputValue);
        console.log("!!!!!!!!!!!!updateInputValue, inputId: ", this.state.inputId);
    };

    render() {
        // const changedNewQuestion = () => {
        //     alert("New question changed");
        // };
        const getQuestions = (id) => {
            let foundQuestion = null;
            console.log("getQuestion, state", this.state);
            this.props.survey.questions.forEach(question => {
                if (question.id === id) {
                    foundQuestion = question;
                }
            });
            console.log("getQuestion, question", foundQuestion);
            return foundQuestion;
        };

        const saveChange = () => {};
////////////////////////////////////////
        const saveNewQuestion = () => {
            this.props.onQuestionSaved(this.state.inputId, this.state.inputValue);
            console.log("saveNewQuestion, state", this.props.survey);
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
            this.setState({inputId: -1, inputValue: ""})


        };
        ////////////////////////////////

        const submit = () => {
            // const maxId = this.state.questions.length;
            // const addedQuestions = addQuestion(this.state.questions, maxId);
            // //console.log("added state: ", stateadd);
            // this.setState({questions: addedQuestions});
            // //console.log("state: ", this.state);
            // //console.log("store state: ", this.props.store.getState());
        };

        // const newQuestion = () => {
        //     // let questions = this.state.questions.slice(0);
        //     this.setState({
        //         questions: addQuestion(this.props.qstns)
        //     });
        // };

        //const saveNewQuestion = () => {alert("Save question")};
        const cancelNewQuestion = () => {
            // console.log("!!!!!!!!!!!!!!!!!cancelNewQuestion, inputId: ", this.state.inputId);
            this.props.onQuestionCanceled(this.state.inputId);
            this.setState({inputId: -1, inputValue: ""})
        };

        const editQuestion = (id) => {alert("Edit question")};


        const deleteQuestion = (id) => {
            //alert(`Delete question, id: ${id}`);
            //console.log("!!!!!!!!!!!!!!!!!deleteQuestion, inputId: ", id);
            this.props.onQuestionDeleted(id);
            console.log("deleteQuestion: state", this.state);
            console.log("deleteQuestions, props", this.props.survey.questions);
        };


        const answersForQuestion = () => {alert("Show answers")};

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
                                     onChange={saveChange}
                                     value={this.props.survey.survey_id}/>
                    </FormGroup>
                    <FormGroup className={classes.group}>
                        <ControlLabel className={classes.label} htmlFor="name">Survey Name</ControlLabel>
                        <FormControl className={classes.input}
                                     type="text"
                                     name="name"
                                     id="name"
                                     onChange={saveChange}
                                     value={this.props.survey.survey_name}
                        />
                    </FormGroup>
                    <Button onClick={submit} bsStyle="success">Save</Button>
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
                        {/*{!this.state || !this.state.survey || !this.state.survey.questions ? console.log("tbody, no props")*/}
                            {/*: this.state.survey.questions.map(question => {*/}
                        {console.log("tbody, props", this.props.survey.questions)}
                        {!this.props || !this.props.survey || !this.props.survey.questions ? console.log("tbody, no props")
                            : this.props.survey.questions.map(question => {
                            // console.log("tbody, not null");
                            // console.log("tbodt, questions: ", this.props.qstns);
                            //return null;
                            if (question.editing) {
                                // console.log("Hep1");
                                // this.setState({inputId: -1});
                                // this.setState({inputValue: ""});
                                return (
                                   <NewQuestion
                                       key={question.id}
                                       id={question.id}
                                       inputValue={this.state.inputValue}
                                       onChange={this.updateInputValue}
                                       // changed={changedNewQuestion}
                                       save={saveNewQuestion}
                                       cancel={cancelNewQuestion}/>
                                );
                            } else {
                                // console.log("Hep2");
                                return (
                                    <Question
                                        key={question.id}
                                        id={question.id}
                                        question={question.question}
                                        edit={editQuestion}
                                        delete={deleteQuestion}
                                        answers={answersForQuestion}
                                    />
                                );
                            }
                        })}
                        </tbody>
                    </Table>

                    {/*<NavLink to="/addquestion" className="btn btn-success">Add Question</NavLink>*/}

                    <Button onClick={this.props.onQuestionAdded} bsStyle="success">Add a Question</Button>


                <ButtonToolbar>
                    <Button bsStyle="success" bsSize="small"
                    // bsClass={classes.button}
                    onClick={this.logState}>Log</Button>
                </ButtonToolbar>

            </div>
        );
    }


}

const mapStateToProps = (state) => {
    console.log("mapStateToProps, state: ", state);
    return {
        survey: state.surveyBuilder.survey,
        user: state.surveyBuilder.user
    };
    // if (state.surveyBuilder.survey) {
    //     return {
    //         qstns: state.surveyBuilder.survey.questions
    //     };
    // } else {
    //     return state;
    // }
};

const mapDispatchToProps = (dispatch) => {
    //console.log("mapDispatchToProps, dispatch", dispatch);
    return {
        onQuestionAdded: () => dispatch({type: ADD_QUESTION}),
        onQuestionSaved: (id, value) => dispatch({type: SAVE_QUESTION, id: id, value: value}),
        onQuestionCanceled: (id) => dispatch({type: CANCEL_QUESTION, id: id}),
        onQuestionDeleted: (id) => dispatch({type: DELETE_QUESTION, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( SurveyBuilder, axios ));