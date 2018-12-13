import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-survey';

import {asyncListSurveys, setSurveyId, asyncDeleteSurvey, asyncCreateNewSurvey} from "../../../store/actions";

import { Table, Button, ButtonGroup,} from 'react-bootstrap';

import classes from "./SurveysManager.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import CompanyOnly from "../../Login/CompanyOnly";
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
                <h1 style={{marginTop:'6rem'}}>Surveys Manager</h1>
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
                                        <Button onClick={() => this.editSurvey(survey)} className={classes.btnPrimary} bsStyle="primary btn-sm">Edit</Button>
                                        <Button onClick={() => this.deleteSurvey(survey)} className={classes.btnDanger} bsStyle="danger btn-sm">Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <Button onClick={this.addNewSurvey} className={classes.btn}>Add New Survey</Button>
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

export default CompanyOnly(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SurveysManager, axios)));