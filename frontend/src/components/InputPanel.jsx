// In: src/components/InputPanel.jsx
import React from 'react';
import { Play, XCircle } from 'lucide-react';

const InputPanel = ({ 
  dataType, 
  inputValue, 
  onInputChange, 
  onVisualize, 
  onClear, 
  currentProblem,
  visualizeButtonText,
}) => {
  if (!currentProblem && (dataType === 'linkedList' || dataType === 'stack')) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-4 h-full">
         <h3 className="font-semibold text-lg">Operations</h3>
         <div className="flex flex-col gap-2">
            <label htmlFor="custom-input" className="text-sm font-medium text-gray-600 dark:text-gray-300">Value</label>
            <input
              id="custom-input"
              type="text"
              value={inputValue}
              onChange={onInputChange}
              placeholder="Enter a value"
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
            />
         </div>
         <div className="grid grid-cols-2 gap-3 mt-auto">
            <button onClick={onClear} className="flex items-center justify-center gap-2 bg-red-600/80 hover:bg-red-500 transition-colors px-4 py-2 rounded-md font-medium text-white">
                <XCircle size={16} /> Clear
            </button>
            <button onClick={onVisualize} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-md font-medium text-white">
              <Play size={16} /> {visualizeButtonText}
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col h-full">
      {currentProblem ? (
        <>
          <div>
            <h3 className="font-semibold text-lg">{currentProblem.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{currentProblem.description}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-2">Operation</h4>
            <div className="flex flex-col gap-2">
                <label htmlFor="problem-input" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {dataType === 'array' ? 'Custom Array Input' : 'Value'}
                </label>
                <input
                  id="problem-input"
                  type="text"
                  value={inputValue}
                  onChange={onInputChange}
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
                />
            </div>
          </div>
          <div className="mt-auto pt-4 grid grid-cols-1 gap-3">
            <button onClick={onVisualize} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md font-medium text-white">
                <Play size={16} /> {visualizeButtonText}
              </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">Select a problem to begin.</p>
        </div>
      )}
    </div>
  );
};

export default InputPanel;