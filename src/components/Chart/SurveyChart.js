import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import Axios from 'axios';

class SurveyChart extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
    this.state = {
      optionArray: [],
      answerArray: [],
      question: [],
      values: [],
      data: [],
      isThereChoice: '',
      type: [],
      questionId: this.props.questionId,
      isClicked: false,
      buttonText: 'Show Chart',
      number: ''
    };
  }

  makeChart() {
    if (this.state.isClicked) {
      document.getElementById('chart' + this.state.questionId).style.display =
        'none';

      document.getElementById('number' + this.state.questionId).style.display =
        'none';
      document.getElementById('Cbtn' + this.state.questionId).className =
        'btn btn-success';
      this.setState({ isClicked: false });
      this.setState({ buttonText: 'Show Chart' });
    } else {
      document.getElementById('Cbtn' + this.state.questionId).className =
        'btn btn-warning';
      document.getElementById('chart' + this.state.questionId).style.display =
        'block';
      document.getElementById('number' + this.state.questionId).style.display =
        'block';
      this.setState({ isClicked: true });
      this.setState({ buttonText: 'Hide Chart' });
    }

    var urlNumbers =
      'http://localhost:3000/answers/question/count/' + this.state.questionId;
    Axios.get(urlNumbers).then(res => {
      this.setState({ number: res.data[0].number });
    });

    var urlQuestion =
      'http://localhost:3000/questions/' + this.state.questionId;
    Axios.get(urlQuestion).then(res => {
      this.setState({ question: res.data[0].question });
    });

    //Here some ways of converting object to array
    //Methods1
    //   for (const key of Object.keys(this.state)) {
    //     console.log(key, this.state[key]);
    //   }

    //Methods2
    //   for (var key in res.data) {
    //     arr.push(res.data[key]);
    //   }

    //Methods3
    //   var arr = Object.values(res.data);

    var urlOptions =
      'http://localhost:3000/answer_options/question/' + this.state.questionId;
    Axios.get(urlOptions).then(res => {
      var optionArray = [];

      for (var i = 0; i < res.data.length; i++) {
        optionArray.push(res.data[i].answer);
      }
      if (optionArray.length == 0) {
        this.setState({ isThereChoice: false });
        this.setState({ type: ['WordTree'] });
      } else {
        this.setState({ isThereChoice: true });
        this.setState({ optionArray: optionArray });
        this.setState({
          type: ['PieChart', 'Bar', 'ScatterChart', 'BarChart']
        });
      }
    });
    var urlAnswers =
      'http://localhost:3000/answers/question/' + this.state.questionId;
    Axios.get(urlAnswers).then(res => {
      var answerArray = [];

      for (var i = 0; i < res.data.length; i++) {
        answerArray.push(res.data[i].answer);
      }
      this.setState({ answerArray: answerArray });
      var values = [];
      if (this.state.isThereChoice === true) {
        for (var i = 0; i < this.state.optionArray.length; i++) {
          var count = 0;
          for (var j = 0; j < this.state.answerArray.length; j++) {
            if (this.state.optionArray[i] === this.state.answerArray[j]) {
              count++;
            }
          }
          values.push(count);
        }
        this.setState({ values: values });

        var data = [['Answer Option', 'Number of Answers']];

        for (var k = 0; k < this.state.optionArray.length; k++) {
          var setOfData = [this.state.optionArray[k], this.state.values[k]];
          data.push(setOfData);
        }
      } else {
        var data = [['Phrases']];
        for (var i = 0; i < answerArray.length; i++) {
          data.push([answerArray[i]]);
        }
      }
      this.setState({ data: data });
    });
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          id={'Cbtn' + this.state.questionId}
          onClick={this.makeChart}
        >
          {this.state.buttonText}
        </button>
        <br />
        <div id={'number' + this.state.questionId} style={{ display: 'none' }}>
          Number of people who participated in this question:{' '}
          {this.state.number}
        </div>
        <div id={'chart' + this.state.questionId}>
          {this.state.type.map(type => (
            <td>
              <Chart
                width={'600px'}
                height={'300px'}
                chartType={type}
                loader={<div>Loading Chart</div>}
                data={this.state.data}
                options={{ title: this.state.question }}
              />
            </td>
          ))}
        </div>
      </div>
    );
  }
}

export default SurveyChart;
