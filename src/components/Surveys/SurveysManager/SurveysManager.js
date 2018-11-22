import React, {Component} from 'react';
import {connect} from 'react-redux';

import {asyncListSurveys} from "../../../store/actions";

import {
    Table,
    // FormControl, FormGroup, ControlLabel, PageHeader,
    Button,
    // ButtonToolbar,
    ButtonGroup,
    //Alert
} from 'react-bootstrap';

import classes from "./SurveysManager.css";

class SurveysManager extends Component {
    componentDidMount() {
        this.props.onListSurveys();
    }

    render() {
        return (
            <div className={classes.container}>
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
                                        <Button bsStyle="success">Edit</Button>
                                        <Button bsStyle="danger">Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td><Button bsStyle="primary">Add New Survey</Button></td>
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
        onListSurveys: () => dispatch(asyncListSurveys())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveysManager);