import React, { Component } from 'react'

class QuestionNumber extends Component {
  render () {
    return <h3 className='subtitle'>Question {this.props.questionNumber}/10</h3>
  }
}

export default QuestionNumber
