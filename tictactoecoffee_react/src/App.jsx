/* eslint-disable react/prop-types */
import * as React from 'react';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
    return <Game />;
}

export default App;

const MODES = {
    coffeeMilk: {
        X: `☕`,
        O: `🥛`,
        className: 'coffee-milk',
    },
    starPlanet: {
        X: `⭐`,
        O: `🌍`,
        className: 'star-planet',
    },
    catDog: {
        X: `🐱`,
        O: `🐶`,
        className: 'cat-dog',
    },
    fireWater: {
        X: `🔥`,
        O: `💧`,
        className: 'fire-water',
    },
    sunMoon: {
        X: `🌞`,
        O: `🌙`,
        className: 'sun-moon',
    },
    appleOrange: {
        X: `🍎`,
        O: `🍊`,
        className: 'apple-orange',
    },
    robotHuman: {
        X: `🤖`,
        O: `👤`,
        className: 'robot-human',
    },
    dragonUnicorn: {
        X: `🐉`,
        O: `🦄`,
        className: 'dragon-unicorn',
    },
    birdFish: {
        X: `🐦`,
        O: `🐟`,
        className: 'bird-fish',
    },
    bookComputer: {
        X: `📚`,
        O: `💻`,
        className: 'book-computer',
    },
};

function Game() {
    const [gameMode, setGameMode] = useState('coffeeMilk'); // Режим игры (по умолчанию "Кофе против Молока")
    const {
        cells,
        currentStep,
        winnerSequence,
        handleCellClick,
        handleResetClick,
        winnerSymbol,
        isDraw,
    } = useGameState(MODES[gameMode]);

    // Меняем стиль страницы при смене режима
    useEffect(() => {
        document.body.className = MODES[gameMode].className;
    }, [gameMode]);

    return (
        <div className="container">
            <h1>Кофе-Нолики</h1>
            <GameModeSelector gameMode={gameMode} setGameMode={setGameMode} onReset={handleResetClick} />
            <GameInfo isDraw={isDraw} currentStep={currentStep} winnerSymbol={winnerSymbol} />
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
            <button onClick={() => handleResetClick(MODES[gameMode])}>Сброс</button>
        </div>
    );
}

function GameModeSelector({ gameMode, setGameMode, onReset }) {
    const handleModeChange = (e) => {
        const newMode = MODES[e.target.value]; // Получаем новый режим
        setGameMode(e.target.value); // Обновляем состояние режима
        onReset(newMode); // Сбрасываем игру с учётом нового режима
    };

    return (
        <div className="game-mode-selector">
            <label htmlFor="game-mode">Выберите режим: </label>
            <select id="game-mode" value={gameMode} onChange={handleModeChange}>
                <option value="coffeeMilk">Кофе против Молока</option>
                <option value="starPlanet">Звезда против Планеты</option>
                <option value="catDog">Кот против Собаки</option>
                <option value="fireWater">Огонь против Воды</option>
                <option value="sunMoon">Солнце против Луны</option>
                <option value="appleOrange">Яблоко против Апельсина</option>
                <option value="robotHuman">Робот против Человека</option>
                <option value="dragonUnicorn">Дракон против Единорога</option>
                <option value="birdFish">Птица против Рыбы</option>
                <option value="bookComputer">Книга против Компьютера</option>
            </select>
        </div>
    );
}



function GameInfo({ isDraw, currentStep, winnerSymbol }) {
    if (isDraw) {
        return (
            <div>
                <h2>Ничья :(</h2>
            </div>
        );
    }
    if (winnerSymbol) {
        return (
            <div>
                <h2>Победитель: {winnerSymbol}</h2>
            </div>
        );
    }
    return (
        <div>
            <h2>Ход: {currentStep}</h2>
        </div>
    );
}

function checkWinner(cells) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return combination;
        }
    }
    return null;
}

function useGameState(mode) {
    const [cells, setCells] = useState([null, null, null, null, null, null, null, null, null]);
    const [currentStep, setCurrentStep] = useState(Math.random() > 0.5 ? mode.X : mode.O);
    const [winnerSequence, setWinnerSequence] = useState(null);
    const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;
    const isDraw = !winnerSequence && cells.every((c) => c);

    const handleCellClick = (index) => {
        if (cells[index] || winnerSequence) {
            return;
        }
        const cellsCopy = cells.slice();
        cellsCopy[index] = currentStep;
        const winner = checkWinner(cellsCopy);

        setCells(cellsCopy);
        setCurrentStep(currentStep === mode.O ? mode.X : mode.O);
        setWinnerSequence(winner);
    };

    const handleResetClick = (newMode = mode) => {
        setCells(Array.from({ length: 9 }, () => null));
        setCurrentStep(Math.random() > 0.5 ? newMode.X : newMode.O);
        setWinnerSequence(null);
    };

    return {
        cells,
        currentStep,
        winnerSequence,
        handleCellClick,
        handleResetClick,
        winnerSymbol,
        isDraw,
    };
}
