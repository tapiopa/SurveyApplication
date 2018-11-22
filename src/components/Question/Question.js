/*
* Question.js
* */

import React from 'react';
// import {Aux} from "../../hoc/Aux";
import {Button,
    //ButtonToolbar,
    ButtonGroup,
} from 'react-bootstrap';

const question = (props) => {

    return (
        <tr>
            <td>{props.question.id}</td>
            <td>{props.question.question}</td>
            <td>
                <ButtonGroup>
                    <Button bsStyle="success" onClick={() => props.edit(props.question.id, props.question.question)}>Edit</Button>
                    <Button bsStyle="danger" onClick={() => props.delete(props.question.id)}>Delete</Button>
                    <Button bsStyle="primary" onClick={() => props.answers(props.question)}>Answers</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
};
export default question;