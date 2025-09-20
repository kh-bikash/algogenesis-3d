// In: src/components/OperationsPanel.jsx

import React from 'react';
import { Play, XCircle, Plus, Minus, Search, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const OperationsPanel = ({ 
  dataType, 
  inputValue, 
  onInputChange, 
  onOperation, 
  onClear, 
  currentProblem,
  onExplain, // New prop
}) => {

  const renderProblemView = () => (
    <>
      <div>
        <h3 className="font-semibold text-lg">{currentProblem.title}</h3>
        <p className="text-sm text-primary-600 dark:text-primary-400 mt-2">{currentProblem.description}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-700">
        <div className="flex flex-col gap-2">
            <label htmlFor="problem-input" className="text-sm font-medium">
              {dataType === 'array' ? 'Custom Array Input' : 'Value'}
            </label>
            <input
              id="problem-input"
              type="text"
              value={inputValue}
              onChange={onInputChange}
              className="bg-primary-100 dark:bg-primary-700/50 border border-primary-300 dark:border-primary-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
        </div>
      </div>
      <div className="mt-auto pt-4 grid grid-cols-2 gap-3">
        <button onClick={onExplain} className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 transition-colors px-4 py-2 rounded-md font-medium text-white shadow-lg shadow-teal-500/20">
            <Sparkles size={16} /> Explain
        </button>
        <button onClick={() => onOperation(currentProblem.algorithmKey)} className="flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 transition-colors px-4 py-2 rounded-md font-medium text-white shadow-lg shadow-secondary-500/20">
            <Play size={16} /> Run Code
        </button>
      </div>
    </>
  );

  const renderSandboxView = () => {
    let controls;
    switch(dataType) {
      case 'linkedList':
        controls = (
          <>
            <button onClick={() => onOperation('insertAtHead')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"><Plus size={16}/> Insert</button>
            <button onClick={() => onOperation('deleteByValue')} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"><Minus size={16}/> Delete</button>
          </>
        );
        break;
      case 'stack':
        controls = (
          <>
            <button onClick={() => onOperation('push')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"><ArrowRight size={16}/> Push</button>
            <button onClick={() => onOperation('pop')} className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"><ArrowLeft size={16}/> Pop</button>
          </>
        );
        break;
       case 'bst':
        controls = (
          <>
            <button onClick={() => onOperation('insert')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"><Plus size={16}/> Insert</button>
            <button onClick={() => onOperation('search')} className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"><Search size={16}/> Search</button>
          </>
        );
        break;
      default:
        controls = null;
    }

    return (
       <>
         <h3 className="font-semibold text-lg">Sandbox Mode</h3>
         <p className="text-sm text-primary-600 dark:text-primary-400 mt-2">Perform operations on the data structure.</p>
         <div className="my-4 pt-4 border-t border-primary-200 dark:border-primary-700">
           <div className="flex flex-col gap-2">
              <label htmlFor="sandbox-input" className="text-sm font-medium">Value</label>
              <input
                id="sandbox-input"
                type="text"
                value={inputValue}
                onChange={onInputChange}
                className="bg-primary-100 dark:bg-primary-700/50 border border-primary-300 dark:border-primary-600 rounded-md px-3 py-2"
              />
           </div>
         </div>
         <div className="grid grid-cols-2 gap-3 mt-auto">
            {controls}
         </div>
         <div className="mt-4">
             <button onClick={onClear} className="w-full flex items-center justify-center gap-2 bg-red-800/80 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                <XCircle size={16} /> Clear Structure
            </button>
         </div>
      </>
    );
  };
  
  return (
    <div className="bg-white dark:bg-primary-900 rounded-lg shadow-lg border border-primary-200 dark:border-primary-700 p-4 flex flex-col h-full">
      {currentProblem ? renderProblemView() : renderSandboxView()}
    </div>
  );
};

export default OperationsPanel;