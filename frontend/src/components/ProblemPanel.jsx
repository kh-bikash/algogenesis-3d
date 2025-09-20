// In: src/components/ProblemPanel.jsx
import React from 'react';

const ProblemPanel = ({ problems, onSelectProblem, selectedProblemId }) => {
  return (
    <div className="bg-white dark:bg-primary-900 rounded-lg shadow-lg border border-primary-200 dark:border-primary-700 h-full flex flex-col">
      <div className="p-4 border-b border-primary-200 dark:border-primary-700">
        <h2 className="text-lg font-semibold">Challenges</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {(!problems || problems.length === 0) ? (
            <p className="text-primary-500 dark:text-primary-400 text-sm">No challenges available for this data structure yet.</p>
        ) : (
            <ul className="space-y-2">
            {problems.map(problem => (
                <li key={problem.id}>
                <button
                    onClick={() => onSelectProblem(problem)}
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${selectedProblemId === problem.id ? 'bg-secondary-600 text-white shadow-md' : 'bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700'}`}
                >
                    <h3 className="font-semibold">{problem.title}</h3>
                    <p className={`text-xs mt-1 ${selectedProblemId === problem.id ? 'text-secondary-200' : 'text-primary-600 dark:text-primary-400'}`}>
                    {problem.description.substring(0, 70)}...
                    </p>
                </button>
                </li>
            ))}
            </ul>
        )}
      </div>
    </div>
  );
};

export default ProblemPanel;