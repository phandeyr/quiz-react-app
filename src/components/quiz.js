import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { entities } from '../common/utils.js'
import shuffle from 'shuffle-array'
import QuizHeader from './header.js'
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
    }, 3000)
  }

  render () {
    console.log(this.state.answerOptions)
    if (this.state.isLoading) {
      return (
        <div className='container'>
          <QuizHeader/><br/>
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
        <div className='container'>
          <QuizHeader/>
          <h4>{this.state.questions.results[this.state.currentQuestion].question.replace(/&#?\w+;/gi, match => entities[match])}</h4>
          <Answer
                chosen={this.state.chosen}
                correct={this.state.correct} />
        </div>
      )
    }

    return (
      <div className='container'>
        <QuizHeader/><br/>
        <div>
          <h4>{this.state.questions.results[this.state.currentQuestion].question.replace(/&#?\w+;/gi, match => entities[match])}</h4>
            {this.state.answerOptions.map((item, index) =>
              <Button className='quiz-buttons' onClick={()=>this.handleAnswer(item, this.state.questions.results[this.state.currentQuestion].correct_answer)} key={index}>{item.replace(/&#?\w+;/gi, match => entities[match])}</Button>
            )}
        </div>
      </div>
    )
  }
}

export default Quiz
