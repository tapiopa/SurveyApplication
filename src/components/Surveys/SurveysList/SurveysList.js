/*
* SurveysList.js
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-survey';

import {asyncSurveyList} from "../../../store/actions";

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

class ListSurveys extends Component {
    constructor(props) {
        super(props);
        this.takeTheSurvey = this.takeTheSurvey.bind(this);
    }


    componentDidMount() {
        this.props.onListSurveys();

    }

    takeTheSurvey(id) {
        alert(`You take survey #${id}`);
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
                    {/*{console.log("SurveysList, surveys", this.props.surveys)}*/}
                    {this.props.survey.surveys && this.props.survey.surveys.map(survey => {
                        return (
                            <tr key={survey.id}>
                                <td>{survey.id}</td>
                                <td>{survey.title}</td>
                                <td>{survey.owner}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button onClick={() => this.takeTheSurvey(survey.id)} bsStyle="primary">Take the Survey</Button>
                                        {/*<Button onClick={() =>this.deleteUser(user.id)} bsStyle="danger">Delete</Button>*/}
                                    </ButtonGroup>
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
        onListSurveys: () => dispatch(asyncSurveyList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ListSurveys, axios));