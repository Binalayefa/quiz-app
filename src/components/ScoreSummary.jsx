import React from "react";

const ScoreSummary = ({ score, total, onRestart }) => {
  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold">Quiz Complete!</h2>
      <p className="mt-4 text-lg">
        You scored {score} out of {total}
      </p>
      <button
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded transition duration-200"
        onClick={onRestart}
      >
        Try Again
      </button>
    </div>
  );
};

export default ScoreSummary;
