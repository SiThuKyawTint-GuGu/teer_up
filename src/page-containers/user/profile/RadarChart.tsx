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

  const label = useMemo(() => {
    if (scoreData && scoreData.length > 0) return scoreData.map((each: UserScores) => each.dimension.short_name);
  }, [scoreData]);
  const skillScores = useMemo(() => {
    if (scoreData && scoreData.length > 0) return scoreData.map((each: UserScores) => each.skill);
  }, [scoreData]);
  // const centainityScores = useMemo(() => {
  //   if (scoreData && scoreData.length > 0) return scoreData.map((each: UserScores) => each.certainty);
  // }, [scoreData]);

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
        data: skillScores,
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
    legend: {
      display: false,
    },
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 100,
      },
    },

    tooltip: {
      usePointStyle: true,
    },
  };

  return (
    <div className="w-full h-full flex-wrap radar-chart-container">
      <Radar data={data} options={options} className="w-full h-full font-[12px]" />
    </div>
  );
};

export default RadarChart;
