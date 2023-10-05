import React from 'react';
import ReactDOM from 'react-dom/client';

//get root div and make it a react root with reactdom
const elem = document.getElementById('root')
const root = ReactDOM.createRoot(elem)

//creates app component
function App() {
  const name = 'jada'

  //react can render a boolean
  //const isHeads = Math.Random() > 0.5
  
  const isHeads = false
  let coin = 'tails'
  let flip = Math.random()
  if(flip > 0.5){
    coin = 'heads'
  }

  return (
    <>
  <h1>Hello World!</h1>
  <p1> Hello my name is: {name} </p1>
  <p> coin flip: {coin}</p>
  <p> coin flip better: {Math.random() > 0.5 ? 'heads': 'tails'}</p>
  </>
  )
}
// redner it in our react rooot/ root div element from index.html
root.render(<App />)


