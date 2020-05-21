import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import QuizHeader from './header.js'

class QuizResult extends Component{
  render () {
    return (
      <div className='category-container'>
        <QuizHeader/><br/>
        <div>
          <p>{`Quiz Result: ${this.props.result}/10`}</p>
          <Button onClick={()=>this.props.handleState('category')}><Icon className='redo icon'/>Take Quiz Again</Button>
        </div>
      </div>
    )
  }
}

export default QuizResult
