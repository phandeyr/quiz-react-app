import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import formatString from '../common/utils.js'
import shuffle from 'shuffle-array'
import QuestionNumber from './question_number.js'

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
        const arr = []
        const options = shuffle([...data.results[this.state.currentQuestion].incorrect_answers, data.results[this.state.currentQuestion].correct_answer])
        options.map(item => {
          arr.push({ option: item, answer: (item === data.results[this.state.currentQuestion].correct_answer) })
        })
        this.setState({
          questions: data,
          answerOptions: arr,
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
        const arr = []
        const options = shuffle([...this.state.questions.results[this.state.currentQuestion + 1].incorrect_answers, this.state.questions.results[this.state.currentQuestion + 1].correct_answer])
        options.map(item => {
          arr.push({ option: item, answer: (item === this.state.questions.results[this.state.currentQuestion + 1].correct_answer) })
        })
        this.setState({
          currentQuestion: this.state.currentQuestion + 1,
          answerOptions: arr,
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
      this.state.answerOptions = this.state.answerOptions.map(item => {
        if (this.state.chosen === item.option) {
          return { ...item, answerCssId: (item.answer) ? 'correct-answer' : 'incorrect-answer' }
        } else if (item.option === this.state.correct) {
          return { ...item, answerCssId: 'correct-answer' }
        } else {
          return { ...item }
        }
      })

      return (
        <div className='component-container'>
          <QuestionNumber
            questionNumber={this.state.currentQuestion + 1} />
          <h4>{formatString(this.state.questions.results[this.state.currentQuestion].question)}</h4>
          <div className='component-grid'>
            {this.state.answerOptions.map((item, index) =>
              <Button className='quiz-buttons' id={item.answerCssId} key={index}>{formatString(item.option)}</Button>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className='component-container'>
        <QuestionNumber
          questionNumber={this.state.currentQuestion + 1} />
        <h4>{formatString(this.state.questions.results[this.state.currentQuestion].question)}</h4>
        <div className='component-grid'>
          {this.state.answerOptions.map((item, index) =>
            <Button className='quiz-buttons' onClick={()=>this.handleAnswer(formatString(item.option), formatString(this.state.questions.results[this.state.currentQuestion].correct_answer))} key={index}>{formatString(item.option)}</Button>
          )}
        </div>
      </div>
    )
  }
}

export default Quiz
