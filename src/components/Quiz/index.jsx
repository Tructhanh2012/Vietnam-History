// const QuizzPage = () => {
//   return <>quizz page ne</>;
// };

// export default QuizzPage;

import "./quizz.scss";

import React, { useState, useEffect } from "react";

const QuizzApp = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(-1));
  const [score, setScore] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const questions = [
    {
      questionText: "Which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correctAnswer: 2,
    },
    {
      questionText: "Who was the first President of the United States?",
      options: [
        "George Washington",
        "Thomas Jefferson",
        "Abraham Lincoln",
        "John F. Kennedy",
      ],
      correctAnswer: 0,
    },
    {
      questionText: "In which year did the Vietnam War end?",
      options: ["1968", "1973", "1975", "1980"],
      correctAnswer: 2,
    },
    {
      questionText: "Who painted the Mona Lisa?",
      options: [
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Claude Monet",
      ],
      correctAnswer: 2,
    },
    // Include the remaining questions here...
  ];

  useEffect(() => {
    let timer = null;

    if (timeRemaining > 0 && !quizSubmitted) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !quizSubmitted) {
      handleSubmitQuiz();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining, quizSubmitted]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleSubmitQuiz = () => {
    let totalCorrect = 0;

    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correctAnswer) {
        totalCorrect++;
      }
    }

    const percentageScore = totalCorrect + "/" + questions.length;
    setScore(percentageScore);
    setQuizSubmitted(true);
  };

  const handleTryAgain = () => {
    setSelectedAnswers(Array(10).fill(-1));
    setScore(null);
    setTimeRemaining(20 * 60);
    setQuizSubmitted(false);
  };

  return (
    <div className="quiz">
      <h1>Quiz App</h1>
      {!quizSubmitted && (
        <div className="time-quiz">
          <p>
            Thời gian còn lại: {Math.floor(timeRemaining / 60)}:
            {timeRemaining % 60 < 10 ? "0" : ""}
            {timeRemaining % 60}
          </p>
        </div>
      )}
      {quizSubmitted ? (
        <>
          <h2>Hoàn Thành</h2>
          <p>Your score: {score}</p>
          <button onClick={handleTryAgain}>Làm lại</button>
        </>
      ) : (
        <>
          {questions.map((question, index) => (
            <div key={index}>
              {/* <h2>Question {index + 1}</h2> */}
              <div className="question-quiz">
                <p>
                  Câu {index + 1}: {question.questionText}
                </p>
              </div>
              <div className="answer-options">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={selectedAnswers[index] === optionIndex}
                      onChange={() => handleAnswerSelect(index, optionIndex)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="button-submit-quiz">
            <button onClick={handleSubmitQuiz}>Nộp bài</button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizzApp;
