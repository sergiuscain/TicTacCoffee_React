/*import { useState } from 'react'*/
import './App.css'

function App() {

  return (
      <Game/>
  )
}

export default App

const SYMBOL_X = `☕`;
const SYMBOL_O = `O`
function Game() {
    const cells = [null, null, null, SYMBOL_O,SYMBOL_X, SYMBOL_O, null, null, SYMBOL_X];
    const currentStep = SYMBOL_O;

    return <div className="container">
        <h1>Кофе-Нолики</h1>
        <h2>Ход: {currentStep }</h2>
        <div className="grid">
            {cells.map((symbol, index )=> {
                return <button className="cell" key={index}>{symbol} </button>
            })}
        </div>
    </div>
}
