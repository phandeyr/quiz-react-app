import React, { Component } from 'react'
import Category from './components/category.js'
import Quiz from './components/quiz.js'
import QuizResult from './components/result.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { display: 'category' }
    this.handleState = this.handleState.bind(this)
  }

  handleState(display, categoryNum, result) {
    this.setState({ 
      display: display,
      categoryNum: categoryNum, 
      result: result
    })
  }

  render() {
    if (this.state.display === 'category' ) {
      return <Category handleState={this.handleState}/>
    }
    
    if (this.state.display === 'quiz') {
      return <Quiz handleState={this.handleState} categoryNum={this.state.categoryNum}/>
    }

    if (this.state.display === 'result') {
      return <QuizResult handleState={this.handleState} result={this.state.result}/>
    }
  }

}

export default App