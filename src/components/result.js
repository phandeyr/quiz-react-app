import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class QuizResult extends Component{
  render () {
    return (
      <div>
        <h3>{`Quiz Result: ${this.props.result}/10`}</h3>
        <Button className='quiz-buttons' onClick={()=>this.props.handleState('category')}><Icon className='redo icon'/>Take Quiz Again</Button>
      </div>
    )
  }
}

export default QuizResult
