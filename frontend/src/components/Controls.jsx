// In: src/components/Controls.jsx
import React from 'react';
import { Play, Pause, StepBack, StepForward, Camera } from 'lucide-react';

const Controls = ({ onPlayPause, onStepForward, onStepBackward, onSpeedChange, isPlaying, onResetCamera }) => {
  const iconSize = 20;

  return (
    <div className="w-full h-full bg-white dark:bg-primary-900 rounded-lg shadow-lg border border-primary-200 dark:border-primary-700 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onStepBackward} className="p-2 rounded-full bg-primary-200 dark:bg-primary-700 hover:bg-primary-300 dark:hover:bg-primary-600 transition-colors">
          <StepBack size={iconSize} />
        </button>
        <button onClick={onPlayPause} className="p-3 rounded-full bg-secondary-600 hover:bg-secondary-500 transition-colors text-white shadow-lg shadow-secondary-500/30">
          {isPlaying ? <Pause size={iconSize + 4} /> : <Play size={iconSize + 4} />}
        </button>
        <button onClick={onStepForward} className="p-2 rounded-full bg-primary-200 dark:bg-primary-700 hover:bg-primary-300 dark:hover:bg-primary-600 transition-colors">
          <StepForward size={iconSize} />
        </button>
        <button onClick={onResetCamera} className="p-2 rounded-full bg-primary-200 dark:bg-primary-700 hover:bg-primary-300 dark:hover:bg-primary-600 transition-colors">
          <Camera size={iconSize} />
        </button>
      </div>
      <div className="flex items-center gap-3 w-48">
        <span className="text-sm font-medium text-primary-500 dark:text-primary-400">Speed</span>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.1"
          defaultValue="1"
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-primary-200 dark:bg-primary-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Controls;