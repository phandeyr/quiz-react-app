import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { entities } from '../common/utils.js'

class Answer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.chosen !== this.props.correct) {
      return (
        <div>
          {this.props.chosen !== this.props.correct}
          <Button id='incorrect-answer' className='quiz-buttons'>{this.props.chosen.replace(/&#?\w+;/gi, match => entities[match])}</Button>
          <Button id='correct-answer' className='quiz-buttons'>{this.props.correct.replace(/&#?\w+;/gi, match => entities[match])}</Button>
        </div>
      )
    }

    return (
      <div>
        <Button id='correct-answer' className='quiz-buttons'>{this.props.correct.replace(/&#?\w+;/gi, match => entities[match])}</Button>
      </div>
    )
  }
}

export default Answer
