import React, { Component } from 'react'
import { Button, Icon, Progress } from 'semantic-ui-react'

class QuizResult extends Component{
  render () {
    return (
      <div className='component-container'>
        <h3 className='subtitle'>Result</h3>
        <Progress value={this.props.result.result} total='10' progress='ratio' {...this.props.result.variant}>
          You got {this.props.result.result} out of 10 answers correct
        </Progress>
        <Button className='quiz-buttons' onClick={()=>this.props.handleState('category')}><Icon className='redo icon'/>Take Quiz Again</Button>
      </div>
    )
  }
}

export default QuizResult
