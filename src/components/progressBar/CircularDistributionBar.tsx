import React from 'react';

interface CircularDistributionBarProps {
  inProgress: number;
  upcoming: number;
  ended: number;
}

const CircularDistributionBar: React.FC<CircularDistributionBarProps> = ({ inProgress, upcoming, ended }) => {
  const total = inProgress + upcoming + ended;

  const calculateDashArray = (value: number): string => {
    const circumference = 2 * Math.PI * 44; // Assuming radius 44 (52 - stroke width/2)
    const dashArray = (value / total) * circumference;
    return `${dashArray} ${circumference - dashArray}`;
  };

  return (
    <div style={{ paddingRight: '80px' }}>
      <svg width="112" height="112" viewBox="0 0 112 112">
        <circle
          cx="56"
          cy="56"
          r="44"
          fill="none"
          stroke="#8ACBF0"
          strokeWidth="12"
          strokeDasharray={calculateDashArray(ended)}
          strokeDashoffset="0"
        />
        <circle
          cx="56"
          cy="56"
          r="44"
          fill="none"
          stroke="blue"
          strokeWidth="12"
          strokeDasharray={calculateDashArray(upcoming)}
          strokeDashoffset={`-${calculateDashArray(ended).split(' ')[0]}`}
        />
        <circle
          cx="56"
          cy="56"
          r="44"
          fill="none"
          stroke="#37298D"
          strokeWidth="12"
          strokeDasharray={calculateDashArray(inProgress)}
          strokeDashoffset={`-${(parseFloat(calculateDashArray(ended).split(' ')[0]) + parseFloat(calculateDashArray(upcoming).split(' ')[0])).toFixed(2)}`}
        />
      </svg>
    </div>
  );
};

export default CircularDistributionBar;
