/*
* SurveysList.js
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-survey';

import {asyncSurveyList, asyncGetSurveyAndQuestions} from "../../../store/actions";

import {
    Table,
    // FormControl, FormGroup, ControlLabel, PageHeader,
    Button,
    // ButtonToolbar,
    ButtonGroup,
    //Alert
} from 'react-bootstrap';

import classes from "./SurveysList.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Protected from "../../Login/Protected";
import Survey from '../Survey/SurveyForm';
import { NavLink, Link, Route } from 'react-router-dom';
class ListSurveys extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.onListSurveys();
    }

    takeTheSurvey(survey_id) {
        // alert(`You take survey #${id}`);
        this.props.onGetSurveyAndQuestions(survey_id);
        this.props.history.push("/survey");
    }

    render() {
        return (
            <div className={classes.surveysList}>
                <h1>List of Surveys</h1>
                <h2>Surveys</h2>
                <Table className={classes.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {<Route path='/survey' component={Survey}/>}
                    {/*{console.log("SurveysList, surveys", this.props.surveys)}*/}
                    {this.props.survey.surveys && this.props.survey.surveys.map(survey => {
                        return (
                            <tr key={survey.id}>
                                <td>{survey.id}</td>
                                <td>{survey.title}</td>
                                <td>{survey.owner}</td>
                                <td>
                                    <Link to={{pathname: '/survey', state: { survey_id: survey.id} }}>
                                        <Button bsStyle="primary">
                                            Take the Survey
                                        </Button>
                                    </Link>
                                        {/*<Button onClick={() =>this.deleteUser(user.id)} bsStyle="danger">Delete</Button>*/}
                                </td>
                            </tr>
                        )
                    })}
                    {/*<tr>*/}
                        {/*<td></td>*/}
                        {/*<td><Button onClick={this.createUser} bsStyle="primary">Add New User</Button></td>*/}
                        {/*<td></td>*/}
                    {/*</tr>*/}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        survey: state.survey
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListSurveys: () => dispatch(asyncSurveyList()),
        onGetSurveyAndQuestions: (survey_id) => dispatch(asyncGetSurveyAndQuestions(survey_id))
    }
};

export default Protected(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ListSurveys, axios)));