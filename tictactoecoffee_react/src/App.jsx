import * as React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
    return <Game />;
}

export default App;

const SYMBOL_X = `☕`; // Латте
const SYMBOL_O = (
    <img
        src="https://gas-kvas.com/grafic/uploads/posts/2023-10/1696531355_gas-kvas-com-p-kartinki-nolik-2.png"
        alt="Нолик"
        className="icon"
    />
); // Нолик в виде изображения

function Game() {
    const [cells, setCells] = useState([null, null, null, null, null, null, null, null, null]);
    const [currentStep, setCurrentStep] = useState(SYMBOL_O);

    const handleCellClick = (index) => {
        if (cells[index]) {
            return;
        }
        const cellsCopy = cells.slice();
        cellsCopy[index] = currentStep;
        setCells(cellsCopy);
        setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
    };

    return (
        <div className="container">
            <h1>Кофе-Нолики</h1>
            <h2>Ход: {currentStep === SYMBOL_O ? 'Нолик' : 'Латте'}</h2>
            <div className="grid">
                {cells.map((symbol, index) => {
                    return (
                        <button className="cell" key={index} onClick={() => handleCellClick(index)}>
                            {symbol}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

