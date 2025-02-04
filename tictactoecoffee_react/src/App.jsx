/*import { useState } from 'react'*/
import * as React from 'react';
import './App.css'
import { useState } from 'react';

function App() {

  return (
      <Game/>
  )
}

export default App

const SYMBOL_X = `☕`;
const SYMBOL_O = `O`

function Game() {
    const [cells, setCells ] = useState([null, null, null, null, null, null, null, null, null]);
    const [currentStep, setCurrentStep ] = useState(SYMBOL_O);

    const handleCellClick = (index) => {
        if (cells[index]) {
            return;
        }
        const cellsCopy = cells.slice();
        cellsCopy[index] = currentStep;
        setCells(cellsCopy);
        setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
    }

    return <div className="container">
        <h1>Кофе-Нолики</h1>
        <h2>Ход: {currentStep }</h2>
        <div className="grid">
            {cells.map((symbol, index )=> {
                return <button className="cell" key={index} onClick={() => handleCellClick(index) }>{symbol} </button>
            })}
        </div>
    </div>
}
