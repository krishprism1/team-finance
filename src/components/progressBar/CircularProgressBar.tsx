import React from 'react';

interface CircularProgressBarProps {
    progress: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
    const radius = 46; // The radius of the circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg
            className="CircularProgressbar"
            viewBox="0 0 100 100"
            data-test-id="CircularProgressbar"
        >
            <path
                className="circle-path-background"
                d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
                strokeWidth="8"
                fillOpacity="0"
                style={{ stroke: '#e6e6e6' }} // Optional: background circle color
            />
            <path
                className="circle-path-progress"
                d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
                strokeWidth="8"
                fillOpacity="0"
                style={{
                    stroke: 'green', // Change progress circle color to green
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset: offset,
                    transition: 'stroke-dashoffset 0.5s ease-in-out', // Smooth transition for progress
                }}
            />
             <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                fontSize="18"
                fill="#ffff" 
            >
                {`${progress}%`}
            </text>
        </svg>
    );
};

export default CircularProgressBar;
