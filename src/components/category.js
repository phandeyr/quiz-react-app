import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class Category extends Component {
  render () {
    return (
      <div className='component-container'>
        <h4 className='subtitle'>Select a category</h4>
        <div className='component-grid'>
          <Button className='quiz-buttons' onClick={()=>this.props.handleState('quiz', 11)}><Icon className='film icon' size='large'/>Film</Button>
          <Button className='quiz-buttons' onClick={()=>this.props.handleState('quiz', 22)}><Icon className='world icon' size='large'/>Geography</Button>
          <Button className='quiz-buttons' onClick={()=>this.props.handleState('quiz', 14)}><Icon className='television icon' size='large'/>Television</Button>
        </div>
      </div>
    )
  }
}

export default Category
