import { useState } from "react";

import "./StudyCard.css";





const cardSet = {
    title: " Learning Python",
    description: "10 cards to help you learn Python",
    cards: [
        { question: "What function do you use to display output in Python?", answer: "print()"},
        { question: "What are the 3 basic numeric data types in Python?", answer: "int,float,complex"},
        { question: "How do you create a variable in Python?", answer: "Assign a value: name = 'Alice', age = 25 "},
        { question: "What is the difference between a list and a tuple?", answer: "Lists are mutable (changeable): [1, 2, 3]. Tuples are immutable (unable to be changed): (1, 2, 3)."},
        { question: "How do you write a comment in Python?",answer: "Use the # symbol" },
        { question: "What keyword starts a conditional statement in Python?", answer: "if"},
        { question: "How do you write a for loop in Python?", answer: "for i in range(5): print(i) - i being the loop variable and range(5) generating numbers from 0 to 4."},
        { question: "How do you define a function in Python?", answer: "Use the def 'keyword': def greet(name)"},
        { question: "What is a dictionary in Python?", answer: "a built-in data structure that stores data in mutable, ordered collections of key-value pairs, where each unique key maps directly to a specific value.{'name': Damaris, 'age': 25}"},
        { question: "How do you get input from the user in Python?", answer: "Use input() ex. -- > input(Enter your name:)"},
    ]
};



function MyComponent() {
    //tracks current card shown
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    //tracks whether card is flipped
    const [isFlipped, setIsFlipped] = useState(false);

    //tracks user guess
    const [guess, setGuess] = useState("");

    // tracks feedback after user guess
    const [feedback, setFeedback] = useState(null);


    //current card based on index
    const currentCard = cardSet.cards[currentCardIndex];

    const isFirst = currentCardIndex === 0;
    const isLast = currentCardIndex === cardSet.cards.length - 1;

    const resetCard = () => {
        setIsFlipped(false);
        setGuess("");
        setFeedback(null);
    };

    //toggles the card between question and answer
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handlePrevious = () => {
        if (!isFirst) {
            setCurrentCardIndex(currentCardIndex - 1);
            resetCard();
        }
    };

    const handleNext = () => {
        if (!isLast) {
            setCurrentCardIndex(currentCardIndex + 1);
            resetCard();
        }
    };

    const handleRandom = () => {
        const otherIndexes = cardSet.cards.map((_, index) => index).filter((index) => index !== currentCardIndex);
        
        const randomIndex = otherIndexes[Math.floor(Math.random() * otherIndexes.length)];
        setCurrentCardIndex(randomIndex);
        resetCard();
    };

    // compares user guess to answer and gives feedback

    const handleGuess = () => {
        if (guess.trim()  === "")
            // do nothing if input is empty
             return; 

             const isCorrect = guess.trim().toLowerCase() === currentCard.answer.trim().toLowerCase();
             setFeedback(isCorrect ? "correct" : "incorrect");
             // reveal answer after guess
             setIsFlipped(true); 
    };


    return (
        <div className="container">
            {/* Card set information*/}

            <h1 className="title">{cardSet.title}</h1>
            <p className="description">{cardSet.description}</p>
            <p className="count">Total cards: {cardSet.cards.length}</p>
            <p className="counter">Card {currentCardIndex + 1}</p>



            <div className="card" onClick={handleFlip}>
                {isFlipped ? (
                    <div>
                        <p className="card-label">Answer</p>
                        <p className="card-text">{currentCard.answer}</p>
            </div>
                ) : (
                    <div>
                        <p className="card-label">Question</p>
                        <p className="card-text">{currentCard.question}</p>
                    </div>
                )}
                <p className="hint">Click to flip</p>
            </div>
            {/* Guess input and feedback section */}

            <div className="guess-section">
                <label className="guess-label" htmlFor="guess-input">
                Your Guess:
                    </label>
                    <input
                    id="guess-input"
                    className="guess-input"
                    type="text"
                    placeholder="Type your answer here..."
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                  />  <button className="submit-button" onClick={handleGuess}>
                        Submit Guess
                    </button>
            </div>
            




{/* Feedback message after submitting a guess */}
{feedback && (
    <div className={`feedback ${feedback}`}>
        {feedback === "correct" ? "Correct!" : "Incorrect. Try again!"}
    </div>
)}

<div className="button-group">
    <button className="button" 
    onClick={handlePrevious} disabled={isFirst}>
        Previous Card
    </button>

    <button className="button"
     onClick={handleNext}
     disabled={isLast}>
        Next card
    </button>

    <button className="random-button" onClick={handleRandom}>
        Random Card
    </button>
</div>
        </div>
    );
}

export default MyComponent;