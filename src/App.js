import React, { useState, useEffect } from 'react';
import quizzeData from './quizData';
import {FirebaseApp}  from './firebase';
import { 
  getFirestore, 
  collection, 
  getDocs ,
  addDoc
} from 'firebase/firestore/lite';
import { Button, Card, Option, Spinner, Typography } from "@material-tailwind/react";

const App = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const db = getFirestore(FirebaseApp);
        const quizCollection = collection(db, 'quizzes');
        const quizSnapshot = await getDocs(quizCollection);
        const data = quizSnapshot.docs.map(doc => doc.data());
        setQuestions(data);
        setAnswers(Array(data.length).fill(null));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
    console.log("Q", questions);
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Spinner size="3xl" />
      </div>
    );

  }

  const handleAnswerSelect = (index, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex === questions.length - 1) {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].options[answers[i]].isCorrect) {
        score++;
      }
    }
    return score;
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='flex items-center justify-center'>
        <icon className='text-4xl font-bold'>🧠</icon>
        <Typography tag='h1' color='gray' className='text-4xl font-bold ml-2'>
          Quizzes
        </Typography>
      </div>
      <div className='mt-8'>
      {showResults ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Results</h1>
          <p className="text-lg">Your score: {calculateScore()} out of {questions.length}</p>
        </div>
      ) : ( 
        <div className="space-y-8 w-full max-w-md items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">{questions[currentQuestionIndex]?.question}</h1>
          <div className="space-y-4">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left ${
                  answers[currentQuestionIndex] === index ? 'bg-gray-800 text-white' : 'bg-white'
                } border border-gray-300 rounded-full p-4 focus:outline-none hover:bg-gray-100`}
                onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                disabled={answers[currentQuestionIndex] !== null}
              >
                {option.text}
              </button>
            ))}
          </div>
          <Button
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={handleNextQuestion}
            className="mt-4"
          >
            Next Question
          </Button>

        </div>
      )}
      </div>
    </div>
  );
};

export default App;
