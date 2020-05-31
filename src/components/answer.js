import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class Answer extends Component {
  render () {
    if (this.props.chosen !== this.props.correct) {
      return (
        <div>
          {this.props.chosen !== this.props.correct}
          <Button id='incorrect-answer' className='quiz-buttons'>{this.props.chosen}</Button><p></p>
          <Button id='correct-answer' className='quiz-buttons'>{this.props.correct}</Button>
        </div>
      )
    }

    return (
      <div>
        <Button id='correct-answer' className='quiz-buttons'>{this.props.correct}</Button>
      </div>
    )
  }
}

export default Answer
