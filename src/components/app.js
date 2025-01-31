import React, { Component } from 'react'
import Category from './category.js'
import Quiz from './quiz.js'
import QuizResult from './result.js'
import QuizHeader from './header.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { display: 'category' }
    this.handleState = this.handleState.bind(this)
  }

  handleState (display, categoryNum, result) {
    this.setState({
      display: display,
      categoryNum: categoryNum,
      result: result
    })
  }

  render () {
    if (this.state.display === 'category' ) {
      return (
        <div className='container'>
          <QuizHeader/><br/>
          <Category handleState={this.handleState}/>
        </div>
      )
    }

    if (this.state.display === 'quiz') {
      return (
        <div className='container'>
          <QuizHeader/><br/>
          <Quiz handleState={this.handleState} categoryNum={this.state.categoryNum}/>
        </div>
      )
    }

    if (this.state.display === 'result') {
      const result = {
        result: this.state.result
      }
      if (this.state.result <= 2) {
        result.variant = { error: 'error' }
      } else if (this.state.result <= 5) {
        result.variant = { warning: 'warning' }
      } else {
        result.variant = { success: 'success' }
      }

      return (
        <div className='container'>
          <QuizHeader/><br/>
          <QuizResult handleState={this.handleState} result={result}/>
        </div>
      )
    }
  }
}

export default App
