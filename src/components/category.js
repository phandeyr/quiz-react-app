import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import QuizHeader from './header.js'

class Category extends Component {
  render () {
    return (
      <div className='container'>
        <QuizHeader/><br/>
        <div className='category'>
          <h4>Select a category</h4>
          <Button className='quiz-buttons' onClick={()=>this.props.handleState('quiz', 11)}><Icon className='film icon' size='large'/>Film</Button><p></p>
          <Button className='quiz-buttons' onClick={()=>this.props.handleState('quiz', 22)}><Icon className='world icon' size='large'/>Geography</Button>
        </div>
      </div>
    )
  }
}

export default Category
