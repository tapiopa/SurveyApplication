import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-survey';

import {asyncListSurveys, setSurveyId, asyncDeleteSurvey, asyncCreateNewSurvey} from "../../../store/actions";

import {
    Table,
    // FormControl, FormGroup, ControlLabel, PageHeader,
    Button,
    // ButtonToolbar,
    ButtonGroup,
    //Alert
} from 'react-bootstrap';

import classes from "./SurveysManager.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class SurveysManager extends Component {

    constructor(props) {
        super(props);
        this.editSurvey = this.editSurvey.bind(this);
        this.addNewSurvey =this.addNewSurvey.bind(this);
        this.deleteSurvey = this.deleteSurvey.bind(this);
    }


    componentDidMount() {
        this.props.onListSurveys();
    }

    editSurvey(survey) {
        this.props.onSetSurveyId(survey.id);
        this.props.history.push("/surveybuilder");
    }

    addNewSurvey() {
        console.log("addNewSurvey");
        this.props.onCreateNewSurvey();
        this.props.history.push("/surveybuilder");
    }

    deleteSurvey(survey) {
        console.log("deleteSurvey");
        this.props.onDeleteSurvey(survey);
    }

    render() {
        return (
            <div className={classes.surveysManager}>
                <h1>Surveys Manager</h1>
                <h2>Surveys:</h2>
                <Table className={classes.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.surveysManager.surveys && this.props.surveysManager.surveys.map(survey => {
                        return (
                            <tr key={survey.id}>
                                <td>{survey.id}</td>
                                <td>{survey.title}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button onClick={() => this.editSurvey(survey)} bsStyle="success">Edit</Button>
                                        <Button onClick={() => this.deleteSurvey(survey)} bsStyle="danger">Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td>
                            <Button onClick={this.addNewSurvey} bsStyle="primary">Add New Survey</Button>
                        </td>

                        <td></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        surveysManager: state.surveysManager
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListSurveys: () => dispatch(asyncListSurveys()),
        onCreateNewSurvey: () => dispatch(asyncCreateNewSurvey()),
        onSetSurveyId: (survey_id) => dispatch(setSurveyId(survey_id)),
        onDeleteSurvey: (survey) => dispatch(asyncDeleteSurvey(survey))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SurveysManager, axios));