import React, { Component } from 'react'
import FormQuestions  from './FormQuestions';
import Button from '@material-ui/core/Button';

import AnswerOpt from './AnswerOpt';

import {asyncGetSurveyAndQuestions, asynRegisterAnswer} from "../../../store/actions";
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

  componentWillUpdate(nextProps, nextState, nextContext) {
        if (
            // this.props.survey !== nextProps.survey ||
        //     this.props.survey.survey && nextProps.survey.survey && this.props.survey.survey !== nextProps.survey.survey ||
        //     this.props.survey.survey && this.props.survey.survey.questions && nextProps.survey.survey && nextProps.survey.survey.questions &&
        //     this.props.survey.survey.questions !== nextProps.survey.survey.questions ||
            this.props.survey.survey && this.props.survey.survey.questions && this.props.survey.survey.questions[0] &&
            nextProps.survey.survey && nextProps.survey.survey.questions && nextProps.survey.survey.questions[0] &&
            this.props.survey.survey.questions[0].answers !== nextProps.survey.survey.questions[0].answers &&
            this.props.survey.survey.questions[0].answers !== "undefined" &&
            nextProps.survey.survey.questions[0].answers !== "undefined"
        ) {
            return true;
        }
  }

  componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.survey.survey && nextProps.survey.survey.questions) {
            this.setState({questions: nextProps.survey.survey.questions});
        }
  }

    // loadQuestion = async () => {
    //     let questions = await apiCalls.getQuestion();
    //     this.setState({questions});
    // };
    //
    // loadAnswerOpt = async () => {
    //     let AnswerOpt = await apiCalls.getAnswerOpt();
    //     this.setState({AnswerOpt});
    // };

    handleSubmit = (e) => {
        console.log("!!!!SurveyForm, handleSubmit, HERE, e", e);
        e.preventDefault();
        const {Answer} = this.state;
        console.log("SurveyForm, handleSubmit, Answer", Answer);
        Answer.forEach( (val) => this.props.onRegisterAnswer(val.AnswerOpt, val.questionId, this.props.app.user_id));
        //apiCalls.registerAnswer(val.AnswerOpt, val.questionId));
    };

    onSave = val => {

        let newAnswer = this.state.Answer.filter( ans => ans.questionId !== val.questionId);

        this.setState(prevState => ({
            Answer: [...newAnswer, val]
        }));
        console.log("SurveyForm, onSave, state", this.state);
    };

  render() {
      // console.log("SurveyForm, render, props.survey", this.props.survey);
      console.log("SurveyForm, render, props", this.props);
      // this.props.survey && this.props.survey.survey &&
        // console.log("SurveyForm, render, props.survey answers", this.props.survey.survey.questions[1].answers);
      if (
          this.props.survey && this.props.survey.survey /*&& /*this.props.survey.survey.fetched &&*/
          // this.props.survey.survey.questions && this.props.survey.survey.questions[0] /*&& this.props.survey.survey.questions[0].answers*/)
      ) {
        const {Answer} = this.state;
        // console.log("SurveyForm, render. state questions 0 answers", this.state.questions[0].answers);
        // console.log("SurveyForm, Answer", Answer);
        let questions = this.props.survey.survey.questions.slice(0);
        // console.log("SurveyFrorm, questions", questions);
        //   console.log("SurveyFrorm, questions 0 answer 0", questions[0]);
        // const questions = this.props.survey.survey.questions.map( (q, idx) => {
            questions = questions.map( (q, idx) => {
                if (q.answers === undefined) {
                    return <div>Loading...</div>
                }
                return (
                    <div key={idx}>
                        <FormQuestions  {...q}/>
                        <AnswerOpt
                            questionId={q.id}
                            AnswerOption={q.answers} //{this.state.AnswerOpt}
                            Answer={Answer}
                            onSave={this.onSave}
                            question={q}
                        />
                    </div>
                );
            });

        return (
            <div>
                <h1>Survey 1st questions</h1>
                <form onSubmit={this.handleSubmit}>
                    {questions}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={styles.button}>
                        Submit
                    </Button>
                </form>
            </div>
        );

      } else {
          return (<div>Loading...</div>)
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
        survey: state.survey,
        app: state.app
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetSurveyAndQuestions: (survey_id) => dispatch(asyncGetSurveyAndQuestions(survey_id)),
        onRegisterAnswer: (answer, question, user_id) => dispatch(asynRegisterAnswer(answer, question, user_id))
    }
};

export default connect(maptStateToProps, mapDispatchToProps)(withErrorHandler(SurveyForm, axios));
