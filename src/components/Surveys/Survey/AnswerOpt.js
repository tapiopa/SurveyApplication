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
      console.log("AnswerOpt, handleChange, event.target.value", event.target.value);
      console.log("AnswerOpt, handleChange, this.state.value BEFORE", this.state.value);
    this.setState({ value: event.target.value });
      console.log("AnswerOpt, handleChange, this.state.value", this.state.value);
  };

  render() {
      // console.log("AnswerOpt, props", this.props);
    const answerOption = this.props.AnswerOption;//.filter( ans => ans.questionFK === this.props.questionId );
      // console.log("AnswerOpt, question", this.props.question);
    const Options = answerOption && answerOption.map( ans => {
        return <FormControlLabel
                key={ans.id}
                value={ans.answer_option}
                control={<Radio color="primary" />}
                label={ans.answer_option}
                labelPlacement="top"
            />
    });

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