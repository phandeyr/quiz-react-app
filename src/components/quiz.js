import React, { Component } from 'react'
import { entities } from '../utils.js'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      answerOptions: [],
      isLoading: true,
      currentQuestion: 0,
      result: 0
    }
  }

  componentDidMount() {
    this.getQuestions()
  }

  getQuestions() {
    fetch(`https://opentdb.com/api.php?amount=10&category=${this.props.categoryNum}&type=multiple`)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.setState({
          questions: data,
          answerOptions: [...data.results[this.state.currentQuestion].incorrect_answers, data.results[this.state.currentQuestion].correct_answer],
          isLoading: false,
          isLastQuestion: false
        })
      })
      .catch(console.log)    
  }

  handleAnswer(chosen,correct) {
    if (chosen === correct) {
      this.setState({ result: this.state.result + 1 })
    }

    if (this.state.currentQuestion !== 9) {
      this.setState({ 
        currentQuestion: this.state.currentQuestion + 1,
        answerOptions: [...this.state.questions.results[this.state.currentQuestion + 1].incorrect_answers, this.state.questions.results[this.state.currentQuestion + 1].correct_answer]
      })
    } else {
      this.setState({ isLastQuestion: true })
    }
  }

  render() {
    if (this.state.isLoading) {
      return 'Quiz loading'
    }

    if (this.state.isLastQuestion) {
      this.props.handleState('result', null, this.state.result)
    }
    
    return(
      <div>
        <h4>{this.state.questions.results[this.state.currentQuestion].question.replace(/&#?\w+;/gi, match => entities[match])}</h4>
        <h5>{this.state.answerOptions.map((item, index) =>
            <li onClick={()=>this.handleAnswer(item,this.state.questions.results[this.state.currentQuestion].correct_answer)} key={index}>{item}</li>
          )}
        </h5>
      </div>
    )
  }
}

export default Quiz