import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import formatString from '../common/utils.js'
import shuffle from 'shuffle-array'
import Answer from './answer.js'

class Quiz extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: [],
      answerOptions: [],
      isLoading: true,
      currentQuestion: 0,
      result: 0,
      isSelected: false,
      chosen: '',
      correct: ''
    }
  }

  componentDidMount () {
    this.getQuestions()
  }

  getQuestions () {
    fetch(`https://opentdb.com/api.php?amount=10&category=${this.props.categoryNum}&type=multiple`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          questions: data,
          answerOptions: shuffle([...data.results[this.state.currentQuestion].incorrect_answers, data.results[this.state.currentQuestion].correct_answer]),
          isLoading: false,
          isLastQuestion: false
        })
      })
      .catch(console.log)
  }

  handleAnswer (chosen, correct) {
    this.setState({ isSelected: true, chosen: chosen, correct: correct })
    if (chosen === correct) {
      this.setState({ result: this.state.result + 1 })
    }

    setTimeout(() => {
     if (this.state.currentQuestion !== 9) {
        this.setState({
         currentQuestion: this.state.currentQuestion + 1,
          answerOptions: shuffle([...this.state.questions.results[this.state.currentQuestion + 1].incorrect_answers, this.state.questions.results[this.state.currentQuestion + 1].correct_answer]),
          isSelected: false
        })
      } else {
        this.setState({ isLastQuestion: true })
      }
    }, 2500)
  }

  render () {
    if (this.state.isLoading) {
      return (
        <div>
          <Icon className='spinner icon' size='big'/><br/>
          <p>Loading</p>
        </div>
      )
    }

    if (this.state.isLastQuestion) {
      this.props.handleState('result', null, this.state.result)
    }

    if (this.state.isSelected) {
      return (
        <div>
          <h4>{formatString(this.state.questions.results[this.state.currentQuestion].question)}</h4>
          <Answer
                chosen={this.state.chosen}
                correct={this.state.correct} />
        </div>
      )
    }

    return (
      <div>
        <h4>{formatString(this.state.questions.results[this.state.currentQuestion].question)}</h4>
          {this.state.answerOptions.map((item, index) =>
            <div>
              <div>
                <Button className='quiz-buttons' onClick={()=>this.handleAnswer(formatString(item), formatString(this.state.questions.results[this.state.currentQuestion].correct_answer))} key={index}>{formatString(item)}</Button>
              </div>
              <br/>
            </div>
          )}
      </div>
    )
  }
}

export default Quiz
