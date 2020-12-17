import React, { Component } from 'react';

class ToyCard extends Component {


  handleDestroy = () => {
    // console.log('test', this.props)

    this.props.deleteToy(this.props.toyObj.id)
  }
  
  handleUpdate = () => {
    this.props.updateLike(this.props.toyObj.id)
  }

  render() {
    // console.log('test', this.props)
    return (
      <div className="card">
        <h2>{this.props.toyObj.name}</h2>
        <img src={this.props.toyObj.image} alt={this.props.toyObj.name} className="toy-avatar" />
        <p>{this.props.toyObj.likes} Likes </p>
        <button className="like-btn" onClick={this.handleUpdate} >Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDestroy}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
