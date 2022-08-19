import React, { useState } from 'react'
//
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let x = null;
    let y = null;
    if (index < 3) {
      x = index + 1
      y = 1;
    }
    else if (index > 2 && index < 6) {
      x = index - 2;
      y = 2;
    }
    else if (index > 5) {
      x = index - 5;
      y = 3;
    }
    return [x, y]
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const coords = getXY()
    return `(${coords[0]}, ${coords[1]})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let newIndex = null
    if (direction === 'up') {
      console.log(`Attempting UP. currentIndex: ${index}.`)
      if (index > 2) {
        newIndex = index - 3
        setIndex(newIndex)
        setSteps(steps + 1)
        console.log(`UP SUCCESS. newIndex: ${newIndex} steps: ${steps}`)
      }
      else {
        console.log('UP FAILED')
        setMessage(`You can't go up`)
      }
    }

    if (direction === 'down') {
      console.log(`Attempting DOWN. current index: ${index}.`)
      if (index < 6) {
        newIndex = index + 3
        setIndex(newIndex)
        setSteps(steps + 1)
        console.log(`DOWN SUCCESS. newIndex: ${newIndex} steps: ${steps}`)
      }
      else {
        console.log('DOWN FAILED')
        setMessage(`You can't go down`)
      }
    }

    if (direction === 'left') {
      console.log(`Attempting LEFT. current index: ${index}.`)
      if (index === 0 || index === 3 || index === 6) {
        console.log('LEFT FAILED')
        setMessage(`You can't go left`)
      }
      else {
        newIndex = index - 1
        setIndex(newIndex)
        setSteps(steps + 1)
        console.log(`LEFT SUCCESS. newIndex: ${newIndex} steps: ${steps}`)
      }
    }
    
    if (direction === 'right') {
      console.log(`Attempting RIGHT. current index: ${index}.`)
      if (index === 2 || index === 5 || index === 8) {
        console.log('RIGHT FAILED')
        setMessage(`You can't go right`)
      }
      else {
        newIndex = index + 1
        setIndex(newIndex)
        setSteps(steps + 1)
        console.log(`RIGHT SUCCESS. newIndex ${newIndex} steps: ${steps}`)
      }
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    console.log('moving moving moving!')
    getNextIndex(evt.target.id)
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    console.log('changing something')
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    console.log('submitting something')
    console.log('you pressed submit!')
    //  `{ "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" }`:
    const payload = {
      x: 2,
      y: 2,
      steps: steps,
      email: email
    }
    axios.put(URL, payload)
      .then(resp => 
        console.log(resp)

      )
      .catch(err => 
        console.log(err)
      )
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={move} id="reset">reset</button>
      </div>
      <form>
        <input onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input onSubmit={onSubmit} id="submit" type="submit"></input>
      </form>
    </div>
  )
}
