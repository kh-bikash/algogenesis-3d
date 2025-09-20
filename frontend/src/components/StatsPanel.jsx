// In: src/components/StatsPanel.jsx

import React from 'react';
import { BarChart2, Repeat, GitCompareArrows } from 'lucide-react';

const StatItem = ({ icon, label, value, color }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg bg-${color}-500/10 text-${color}-500`}>
    {icon}
    <div>
      <div className="text-sm font-medium text-primary-500 dark:text-primary-400">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);

const StatsPanel = ({ stats }) => {
  if (!stats) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-primary-900 rounded-lg shadow-lg border border-primary-200 dark:border-primary-700 p-4">
      <div className="flex items-center gap-3 mb-4">
        <BarChart2 className="text-primary-500 dark:text-primary-400" />
        <h3 className="text-lg font-semibold">Execution Statistics</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stats.comparisons !== undefined && (
          <StatItem 
            icon={<GitCompareArrows size={24} />} 
            label="Comparisons" 
            value={stats.comparisons}
            color="yellow"
          />
        )}
        {stats.swaps !== undefined && (
          <StatItem 
            icon={<Repeat size={24} />} 
            label="Swaps" 
            value={stats.swaps}
            color="red"
          />
        )}
        {stats.overwrites !== undefined && (
            <StatItem 
                icon={<Repeat size={24} />} 
                label="Overwrites" 
                value={stats.overwrites}
                color="green"
            />
        )}
      </div>
    </div>
  );
};

export default StatsPanel;