import React, { useEffect, useState } from "react";

interface CircleProgressProps {
  totalQuestions: number;
  passedQuestions: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({ totalQuestions, passedQuestions }) => {
  const [percentage, setPercentage] = useState<number>(0);
  const [strokeDasharray, setStrokeDasharray] = useState<string | null>(null);

  useEffect(() => {
    const calculatePercentage = (): void => {
      if (totalQuestions === 0) return;
      const newPercentage = Math.floor((passedQuestions / totalQuestions) * 100);
      setPercentage(newPercentage);
      setStrokeDasharray(`${newPercentage * 2.83} 283`); // Tailwind-friendly circumference calculation
    };

    calculatePercentage();
  }, [totalQuestions, passedQuestions]);

  return (
    <div className="relative flex items-center justify-center w-9 h-9">
      <svg viewBox="0 0 100 100">
        <circle className="text-gray-200 stroke-gray-200 fill-none stroke-[11px]" cx="50" cy="50" r="45" />
        <circle
          className="stroke-red-500 fill-none stroke-[11px]"
          cx="50"
          cy="50"
          r="45"
          stroke-dasharray={strokeDasharray}
          stroke-dashoffset="0"
        />
        <text
          className="absolute text-center text-xl font-bold"
          dominantBaseline="middle"
          textAnchor="middle"
          x="50"
          y="50"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircleProgress;
