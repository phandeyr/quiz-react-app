import React, { Component } from 'react'

class QuestionNumber extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <h3>Question {this.props.questionNumber}/10</h3>
  }
}

export default QuestionNumber
