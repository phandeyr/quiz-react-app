import React, { Component } from 'react'

class Category extends Component {
  render() {
    return (
      <div>
        <p onClick={()=>this.props.handleState('quiz', 11)}>Film</p>
        <p onClick={()=>this.props.handleState('quiz', 22)}>Geography</p>
      </div>
    )
  }
}

export default Category