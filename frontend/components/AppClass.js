import axios from 'axios'
import React from 'react'
//
// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const URL = 'http://localhost:9000/api/result';



export default class AppClass extends React.Component {
  
  state = {
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
  };


  getXY = () => {
    let x = null;
    let y = null;
    if (this.state.index < 3) {
      x = this.state.index + 1
      y = 1;
    }
    else if (this.state.index > 2 && this.state.index < 6) {
      x = this.state.index - 2;
      y = 2;
    }
    else if (this.state.index > 5) {
      x = this.state.index - 5;
      y = 3;
    }
    return [x, y]
  }

  getXYMessage = () => {
    const coords = this.getXY()
    console.log(coords)
    
    return `(${coords[0]}, ${coords[1]})`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    })
    console.log('RESET!')
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    //console.log(`getNextIndex was successfully called with the direction ${direction}`)
    let newIndex = null
    if (direction === 'up') {
      console.log(`Attempting UP. currentIndex: ${this.state.index}.`)
      if (this.state.index > 2) {
        newIndex = this.state.index - 3
        this.setState({
          index: newIndex,
          steps: this.state.steps + 1
        })
        console.log(`UP SUCCESS. newIndex: ${newIndex} steps: ${this.state.steps}`)
      }
      else {
        console.log('UP FAILED')
        this.setState({
          message: `You can't go up`
        })
      }
    }
    
    if (direction === 'down') {
      console.log(`Attempting DOWN. current index: ${this.state.index}.`)
      if (this.state.index < 6) {
        newIndex = this.state.index + 3
        this.setState({
          index: newIndex, 
          steps: this.state.steps + 1
        })
        console.log(`DOWN SUCCESS. newIndex: ${newIndex} steps: ${this.state.steps}`)
      }
      else {
        console.log('DOWN FAILED')
        this.setState({
          message: `You can't go down`
        })
      }
    }
    
    if (direction === 'left') {
      console.log(`Attempting LEFT. current index: ${this.state.index}.`)
      if (this.state.index === 0 || this.state.index === 3 || this.state.index === 6) {
        console.log('LEFT FAILED')
        this.setState({
          message: `You can't go left`
        })
      }
      else {
        newIndex = this.state.index - 1
        this.setState({
          index: newIndex,
          steps: this.state.steps + 1

        })
        console.log(`LEFT SUCCESS. newIndex: ${newIndex} steps: ${this.state.steps}`)
      }
    }
    
    if (direction === 'right') {
      console.log(`Attempting RIGHT. current index: ${this.state.index}.`)
      if (this.state.index === 2 || this.state.index === 5 || this.state.index === 8) {
        console.log('RIGHT FAILED')
        this.setState({
          message: `You can't go right`
        })
      }
      else {
        newIndex = this.state.index + 1
        this.setState({
          index: newIndex,
          steps: this.state.steps + 1
        })
        console.log(`RIGHT SUCCESS. newIndex ${newIndex} steps: ${this.state.steps}`)
      }
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div onClick={this.testState} className="info">
          <h3 id="coordinates">Coordinates {this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input onSubmit={this.onSubmit} id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
