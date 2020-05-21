import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import QuizHeader from './header.js'

class Category extends Component {
  render () {
    return (
      <div className='category-container'>
        <QuizHeader/><br/>
        <div className='category'>
          <h4>Select a category</h4>
          <Button onClick={()=>this.props.handleState('quiz', 11)}><Icon className='film icon'/>Film</Button><p></p>
          <Button onClick={()=>this.props.handleState('quiz', 22)}><Icon className='world icon'/>Geography</Button>
        </div>
      </div>
    )
  }
}

export default Category
