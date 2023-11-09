// components/RadarChart.tsx
import { useGetUserScores } from "@/services/user";
import { UserScores } from "@/types/User";
import { ArcElement, Chart, LineElement, PointElement, PolarAreaController, RadialLinearScale } from "chart.js";
import React, { useMemo } from "react";
import { Radar } from "react-chartjs-2";

Chart.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement);

const RadarChart: React.FC = () => {
  const { data: userScores } = useGetUserScores();

  const scoreData = useMemo(() => userScores?.data, [userScores]);

  const label = scoreData && scoreData.length > 0 && scoreData.map((each: UserScores) => each.dimension.short_name);

  const skillScores = useMemo(() => {
    if (scoreData && scoreData.length > 0) return scoreData.map((each: UserScores) => each.skill);
  }, [scoreData]);

  console.log(skillScores);
  const centainityScores = useMemo(() => {
    if (scoreData && scoreData.length > 0) return scoreData.map((each: UserScores) => each.certainty);
  }, [scoreData]);

  const data = {
    labels: label,
    datasets: [
      {
        label: "Skill",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(255,0,0,1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(255,0,0,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,0,0,1)",
        data: userScores,
      },

      // {
      //   label: "Certainity",
      //   backgroundColor: "rgba(0,0,255,0.2)",
      //   borderColor: "rgba(0,0,255,1)",
      //   pointBackgroundColor: "rgba(0,0,255,1)",
      //   pointBorderColor: "#fff",
      //   pointHoverBackgroundColor: "#fff",
      //   pointHoverBorderColor: "rgba(0,0,255,1)",
      //   data: centainityScores,
      // },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    scales: {
      r: {
        pointLabels: {
          display: true, // Hides the labels around the radar chart
        },
        ticks: {
          display: true, // Hides the labels in the middel (numbers)
        },
      },
    },
    scale: {
      ticks: {
        min: 0, // Minimum value for the scale
        max: 100, // Maximum value for the scale
        stepSize: 100, // Interval between ticks
      },
    },
  };

  return (
    <div className="w-full h-full flex-wrap radar-chart-container">
      <Radar data={data} options={options} className="w-full h-full font-[12px]" />
    </div>
  );
};

export default RadarChart;
