import React, { useEffect, useState } from "react";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.trivia_categories) {
          setCategories(data.trivia_categories);
        } else {
          console.error("Invalid category data:", data);
        }
        setIsLoadingCategories(false);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
        setIsLoadingCategories(false);
      });
  }, []);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const startQuiz = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const difficulty = e.target.difficulty.value;
    const amount = e.target.amount.value;

    fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((q) => ({
          ...q,
          answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuizData(questions);
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
      })
      .catch((error) => {
        console.error("Failed to fetch quiz questions:", error);
      });
  };

  const handleAnswer = (answer) => {
    const correct = quizData[currentQuestion].correct_answer;
    if (answer === correct) setScore(score + 1);
    const next = currentQuestion + 1;
    if (next < quizData.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setQuizData([]);
    setShowScore(false);
  };

  return (
    <div className="flex items-center w-full mx-auto justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 m-4 border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            Quiz Master
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-2 rounded-full"></div>
        </div>

        {!quizData.length && (
          <QuizStart
            categories={categories}
            isLoading={isLoadingCategories}
            onStart={startQuiz}
          />
        )}
        {!!quizData.length && !showScore && (
          <QuestionCard
            question={quizData[currentQuestion].question}
            answers={quizData[currentQuestion].answers}
            currentIndex={currentQuestion}
            total={quizData.length}
            onAnswer={handleAnswer}
          />
        )}
        {showScore && (
          <ScoreSummary
            score={score}
            total={quizData.length}
            onRestart={restartQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default App;
