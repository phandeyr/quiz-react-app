import React, { Component } from 'react'

class QuizResult extends Component{
  render () {
    return (
      <div>
        <p>{`Quiz Result: ${this.props.result}/10`}</p>
        <p onClick={()=>this.props.handleState('category')}>Take Quiz Again</p>
      </div>
    )
  }
}

export default QuizResult
