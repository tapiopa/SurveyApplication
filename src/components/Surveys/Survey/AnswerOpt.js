import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

class AnswerOpt extends React.Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const answerOption = this.props.AnswerOption.filter( ans => ans.questionFK === this.props.questionId );
    const Options = answerOption.map( ans => {
        return <FormControlLabel
                key={ans.id}
                value={ans.answer_option}
                control={<Radio color="primary" />}
                label={ans.answer_option}
                labelPlacement="top"
            />
    })

    return (
      <FormControl style={styles.RadioAnswer} component="fieldset">
        <RadioGroup
          aria-label="position"
          name="position"
          value={this.state.value}
          onChange={this.handleChange}
          row
        >
          {Options}
        </RadioGroup>
      </FormControl>
    );
  }
}
const colorText = {'gray': '#000d11'}

const styles = {
  RadioAnswer: {
      marginTop:10,
      marginBottom:40,
      color: colorText.gray
  }
};


export default AnswerOpt;