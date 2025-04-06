import React from "react";

const QuestionCard = ({ question, answers, currentIndex, total, onAnswer }) => {
  // Function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const decodedQuestion = decodeHTML(question);

  // Calculate progress percentage
  const progressPercentage = ((currentIndex + 1) / total) * 100;

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Question {currentIndex + 1} of {total}
          </span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        {decodedQuestion}
      </h2>

      <div className="space-y-3">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className="w-full py-3 px-4 bg-white border-2 border-gray-200 text-gray-800 font-medium rounded-lg shadow-sm hover:bg-indigo-50 hover:border-indigo-300 hover:shadow transform hover:-translate-y-0.5 transition-all duration-200 text-left"
          >
            {decodeHTML(answer)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
