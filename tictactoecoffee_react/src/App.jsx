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
    const [winnerSequence, setWinnerSequence] = useState(null);
    console.log(cells);

    const handleCellClick = (index) => {
        if (cells[index] || winnerSequence) {
            return;
        }
        const cellsCopy = cells.slice();
        cellsCopy[index] = currentStep;  //Записываем текущий ход
        const winner = checkWinner(cellsCopy); //Проверяем, есть ли победитель

        setCells(cellsCopy);
        setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
        setWinnerSequence(winner); //Устонавливаем победителя с помощью useState
    };
    const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;

    return (
        <div className="container">
            <h1>Кофе-Нолики</h1>
            <h2>{winnerSequence ? "Победитель" : "Ход" }: {winnerSymbol ?? currentStep}</h2>
            <div className="grid">
                {cells.map((symbol, index) => {
                    const isWinner = winnerSequence?.includes(index);
                    return (
                        <button className={isWinner ? `cell-winn` : `cell`} key={index} onClick={() => handleCellClick(index)}>
                            {symbol}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function checkWinner(cells) {
    // Возможные выигрышные комбинации
    const winningCombinations = [
        [0, 1, 2], // Горизонтальная линия сверху
        [3, 4, 5], // Горизонтальная линия в середине
        [6, 7, 8], // Горизонтальная линия снизу
        [0, 3, 6], // Вертикальная линия слева
        [1, 4, 7], // Вертикальная линия в центре
        [2, 5, 8], // Вертикальная линия справа
        [0, 4, 8], // Диагональ слева сверху направо вниз
        [2, 4, 6], // Диагональ справа сверху налево вниз
    ];

    // Проверяем каждую выигрышную комбинацию
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        // Если все три клетки заполнены одним символом и не пусты
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return combination; // Возвращаем массив индексов выигрышной комбинации
        }
    }

    // Если победителя нет, возвращаем null
    return null;
}

