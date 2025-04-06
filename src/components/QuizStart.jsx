import React from "react";

const QuizStart = ({ categories, isLoading, onStart }) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Configure Your Quiz
      </h2>

      <form onSubmit={onStart} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            disabled={isLoading}
            defaultValue=""
            required
          >
            <option value="" disabled>
              {isLoading ? "Loading categories..." : "Select a category"}
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            name="difficulty"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Number of Questions
          </label>
          <input
            type="number"
            name="amount"
            min="1"
            max="50"
            defaultValue="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          disabled={isLoading}
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizStart;
