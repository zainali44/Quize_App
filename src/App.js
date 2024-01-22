import React, { useState, useEffect } from 'react';
import quizzeData from './quizData';
import './App.css';
import './remainingTime';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizClosed, setQuizClosed] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizzeData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    const closeTime = new Date('July 9, 2023 2:10:00').getTime();
    const currentTime = new Date();

    if (currentTime > closeTime) {
      setQuizClosed(true);
    }
  }, []);

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {quizzeData.length}
          {document.getElementById("quiz-closed").style.display = "none"}
          {document.getElementById("footer").style.display = "none"}
        </div>
      ) : quizClosed ? (
        <div className="quiz-closed">The quiz is now closed.</div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{quizzeData.length}
            </div>
            <div className="question-text">
              {quizzeData[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {quizzeData[currentQuestion].options.map((option) => (
              <label key={option.text}>
                <input
                  type="radio"
                  name="answer"
                  value={option.isCorrect}
                  onChange={() => handleAnswerOptionClick(option.isCorrect)}
                />
                {option.text}
              </label>
            ))}
          </div>
        </>
      )}

    <div id="quiz-closed" className="Remaining-time">
            <span>Remaining time: </span>
            <span id="countdown"></span>
        </div>
        <footer id="footer"> 
        <p>Created by: <a href="https://www.linkedin.com/in/zaindev/">ZAIN</a></p>
    </footer>
    </div>
  );
};

export default App;
