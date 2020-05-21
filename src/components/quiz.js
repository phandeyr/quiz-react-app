import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { entities } from '../common/utils.js'
import shuffle from 'shuffle-array'
import QuizHeader from './header.js'

class Quiz extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: [],
      answerOptions: [],
      isLoading: true,
      currentQuestion: 0,
      result: 0
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
    if (chosen === correct) {
      this.setState({ result: this.state.result + 1 })
    }

    if (this.state.currentQuestion !== 9) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        answerOptions: shuffle([...this.state.questions.results[this.state.currentQuestion + 1].incorrect_answers, this.state.questions.results[this.state.currentQuestion + 1].correct_answer])
      })
    } else {
      this.setState({ isLastQuestion: true })
    }
  }

  render () {
    if (this.state.isLoading) {
      return (
        <div className='category-container'>
          <QuizHeader/><br/>
          <Icon className='spinner icon' size='big'/><br/>
          <p>Loading</p>
        </div>
      )
    }

    if (this.state.isLastQuestion) {
      this.props.handleState('result', null, this.state.result)
    }

    return (
      <div className='category-container'>
        <QuizHeader/><br/>
        <div>
          <h4>{this.state.questions.results[this.state.currentQuestion].question.replace(/&#?\w+;/gi, match => entities[match])}</h4>
          <h5>{this.state.answerOptions.map((item, index) =>
              <Button className='answer-options' onClick={()=>this.handleAnswer(item, this.state.questions.results[this.state.currentQuestion].correct_answer)} key={index}>{item.replace(/&#?\w+;/gi, match => entities[match])}</Button>
            )}
          </h5>
        </div>
      </div>
    )
  }
}

export default Quiz
