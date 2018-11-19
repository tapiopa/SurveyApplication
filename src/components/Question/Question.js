import React from 'react';
// import {Aux} from "../../hoc/Aux";
import {Button,
    //ButtonToolbar,
    ButtonGroup,
} from 'react-bootstrap';

const question = (props) => {

    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.question}</td>
            <td>
                <ButtonGroup>
                    <Button bsStyle="success" onClick={() => props.edit(props.id, props.question)}>Edit</Button>
                    <Button bsStyle="danger" onClick={() => props.delete(props.id)}>Delete</Button>
                    <Button bsStyle="primary" onClick={() => props.answers(props.id)}>Answers</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
};
export default question;