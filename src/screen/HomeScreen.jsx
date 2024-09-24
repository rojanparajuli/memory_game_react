import React, { useEffect, useState } from 'react';
import '../css/home_css.css'; // Ensure this path is correct

const icons = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', 
    '🐻', '🐼', '🦁', '🐯', '🦌', '🦆'
];

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [firstCardIndex, setFirstCardIndex] = useState(null);
    const [secondCardIndex, setSecondCardIndex] = useState(null);
    const [lockBoard, setLockBoard] = useState(false);
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        createBoard();
    }, []);

    const shuffleCards = () => {
        const shuffledCards = [...icons, ...icons]
            .map((icon) => ({ icon, flipped: false, matched: false }))
            .sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
    };

    const createBoard = () => {
        shuffleCards();
        showAllCardsTemporarily();
    };

    const flipCard = (index) => {
        if (lockBoard || cards[index].flipped || cards[index].matched) return;

        const updatedCards = [...cards];
        updatedCards[index].flipped = true;
        setCards(updatedCards);

        if (firstCardIndex === null) {
            setFirstCardIndex(index);
        } else {
            setSecondCardIndex(index);
            checkForMatch(index);
        }
    };

    const checkForMatch = (secondCardIndex) => {
        const firstCardValue = cards[firstCardIndex].icon;
        const secondCardValue = cards[secondCardIndex].icon;

        if (firstCardValue === secondCardValue) {
            setCorrectGuesses(correctGuesses + 1);
            disableCards();
        } else {
            setLockBoard(true);
            setTimeout(() => {
                flipBackCards();
            }, 1000);
        }
    };

    const disableCards = () => {
        const updatedCards = [...cards];
        updatedCards[firstCardIndex].matched = true;
        updatedCards[secondCardIndex].matched = true;
        setCards(updatedCards);
        resetBoard();

        // Check if all pairs are matched
        if (correctGuesses + 1 === icons.length) {
            setMessage('Congratulations! You matched all pairs!');
            setLockBoard(true);
        }
    };

    const flipBackCards = () => {
        const updatedCards = [...cards];
        updatedCards[firstCardIndex].flipped = false;
        updatedCards[secondCardIndex].flipped = false;
        setCards(updatedCards);
        resetBoard();
    };

    const resetBoard = () => {
        setFirstCardIndex(null);
        setSecondCardIndex(null);
        setLockBoard(false);
    };

    const showAllCardsTemporarily = () => {
        const tempCards = cards.map(card => ({ ...card, flipped: true }));
        setCards(tempCards);

        const timeout = setTimeout(() => {
            const resetCards = cards.map(card => ({ ...card, flipped: false }));
            setCards(resetCards);
        }, 10000);
    };

    const restartGame = () => {
        resetBoard();
        setMessage('');
        createBoard();
    };

    return (
        <div className="game-container">
            <div className="header">
                <h1>Memory Card Game</h1>
            </div>
            {message && <div className="result-message">{message}</div>}
            <div className="game-grid">
                {cards.map((card, index) => (
                    <div 
                        key={index} 
                        className={`card ${card.flipped ? 'flip' : ''}`} 
                        onClick={() => flipCard(index)}
                    >
                        <div className="card-inner">
                            <div className="card-front"></div>
                            <div className="card-back">{card.icon}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button className="restart-button" onClick={restartGame}>
                    Restart Game
                </button>
            </div>
        </div>
    );
};

export default MemoryGame;
