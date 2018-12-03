import React, { Component } from 'react'
import FormQuestions  from './FormQuestions';
import Button from '@material-ui/core/Button';
// import * as apiCalls from './apiHelper';

import AnswerOpt from './AnswerOpt';

import {asyncGetSurveyAndQuestions} from "../../../store/actions";
import {connect} from "react-redux";
import axios from "../../../axios-survey";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";


class SurveyForm extends Component {

    state ={
        questions: [],
        AnswerOpt: [],
        Answer:[]
    };

    constructor(props){
        super(props);
        this.getSurvey = this.getSurvey.bind(this);
    }

  // Handle fields change
  // handleChange = input => e => {
  //   this.setState({ [input]: e.target.value });
  // };

    getSurvey(survey_id) {
        this.props.onGetSurveyAndQuestions(survey_id);
    }

  componentWillMount(){
        // if (this.props.survey.fetchData) {
            // this.getSurvey(this.props.survey.id);
            this.getSurvey(1);
        // }
      // this.loadQuestion();
      // this.loadAnswerOpt();
  }

  // loadQuestion = async () => {
  //  let questions = await apiCalls.getQuestion();
  //  this.setState({questions});
  // };
  //
  // loadAnswerOpt = async () => {
  //   let AnswerOpt = await apiCalls.getAnswerOpt();
  //   this.setState({AnswerOpt});
  // };

  // Submit = () => {
  //     console.log(this.state.Answer);
  // };
  //
  // handleSubmit = () => {
  //     console.log(this.state.Answer);
  // };

  render() {
      // console.log("SurveyForm, render, props.survey", this.props.survey);
      if (this.props.survey && this.props.survey.survey && this.props.survey.survey.fetched /*&& this.props.survey.survey.questions[0].answers*/) {
        const {Answer} = this.state;
        let questions = this.props.survey.survey.questions.slice(0);
        // const questions = this.props.survey.survey.questions.map( (q, idx) => {
            questions = questions.foreach( (q, idx) => {
                console.log("SurveyForm, render, question", q);
                console.log("SurveyForm, render, question.id", q.id);
                console.log("SurveyForm, render, question.answers", q.answers);
                console.log("SurveyForm, render, questions[idx]", this.props.survey.survey.questions[idx]);
                console.log("SurveyForm, render, questions[idx].answers", this.props.survey.survey.questions[idx].answers);
                if (q.answers) {
                    const answers = q.answers.slice[0];
                    console.log("SurveyForm, render, answers", answers);
                }
                // console.log("SurveyForm, render, ", q);
                // const question = {...q};
                // console.log("SurveyForm, render, question", question);
                // console.log("SurveyForm, render, question answers", question.answers);
                // const answers = question.answers;
                // console.log("SurveyForm, render, answers", answers);
                // const answers = [q.answers];
                // console.log("SurveyForm, render question just answers", answers);
                // console.log("SurveyForm, render question answers", question.answers);
                if (q.answers === undefined) {
                    return <div>Loading...</div>
                }
                return <div key={idx}> <FormQuestions  {...q}/>
                            <AnswerOpt
                                questionId={q.id}
                                AnswerOption={q.answers} //{this.state.AnswerOpt}
                                Answer={Answer}
                            />
                        </div>
            });


        return (
            <div>
            <h1>Survey 1st questions</h1>
            <form onSubmit={this.handleSubmit}>
                {questions}
                <Button variant="contained"
                      color="primary"
                      style={styles.button}>
                Submit
              </Button>
            </form>
            </div>
        );

      } else {
          return (<h1>Hurraa!</h1>)
      }
    }
}

const styles = {
    button: {
      backgroundColor: '#2196f3',
      marginTop: 30,
      marginBottom: 30
    }
};

const maptStateToProps = (state) => {
    return {
        survey: state.survey
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetSurveyAndQuestions: (survey_id) => dispatch(asyncGetSurveyAndQuestions(survey_id))
    }
};

export default connect(maptStateToProps, mapDispatchToProps)(withErrorHandler(SurveyForm, axios));
