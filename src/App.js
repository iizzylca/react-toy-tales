import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    api: [],
    display: false  
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/toys')
      .then(r => r.json())
      .then(toys => {
        this.setState({
          api: toys
        })
      })
  }
  
  addNewToyHandler = (newToy) => {
    // console.log('test', newToy)
    newToy.likes = 0
    fetch('http://localhost:3000/toys', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(r => r.json())
    .then(newToyObj => {
      this.setState({api: [...this.state.api, newToyObj]})
      // console.log('test', newToyObj )

    })
  }

  updateLike = (id) => {
    let toyLikes = this.state.api.find(toy => toy.id === id).likes
    // console.log(toyLikes.likes)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({likes: toyLikes + 1 })
    })
    .then(r => r.json())
    .then(newLikes => {
      // console.log(newLikes)
      const newArray = [...this.state.api]
      const idx = this.state.api.findIndex(toy => toy.id === newLikes.id)
      newArray[idx] = newLikes
      this.setState({
        api: newArray
      })
      // console.log(newArray)
    })
  }

  deleteToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE", 
      headers: {
        'Content-Type':'application/json',
        'Accepts':'application/json'
      }
    })
    .then(r => r.json())
    .then(() => {
      const newToyArray = this.state.api.filter(toy => toy.id !== id )
      this.setState({
        api: newToyArray
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addNewToyHandler}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer updateLike={this.updateLike} deleteToy={this.deleteToy} toyObj={this.state.api}/>
      </>
    );
  }

}

export default App;
