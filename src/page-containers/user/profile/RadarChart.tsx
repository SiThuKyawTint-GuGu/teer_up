// components/RadarChart.tsx
import Spinner from "@/components/ui/Spinner";
import { useGetUserScores } from "@/services/user";
import { UserScores } from "@/types/User";
import { Flex } from "@radix-ui/themes";
import { ArcElement, Chart, LineElement, PointElement, PolarAreaController, RadialLinearScale } from "chart.js";
import React, { useMemo } from "react";
import { Radar } from "react-chartjs-2";

Chart.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement);

const RadarChart: React.FC = () => {
  const { data: userScores, isLoading } = useGetUserScores();

  const scoreData = useMemo(() => userScores?.data, [userScores]);

  const label = scoreData && scoreData.length > 0 && scoreData.map((each: UserScores) => each.dimension.short_name);

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

      {
        label: "Certainity",
        backgroundColor: "transparent",
        borderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "transparent",
        pointHoverBorderColor: "transparent",
        data: [0, 100],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      r: {
        pointLabels: {
          display: true, // Hides the labels around the radar chart
        },
        ticks: {
          display: false, // Hides the labels in the middel (numbers)
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
    <div className="w-full h-64 flex-wrap radar-chart-container my-5">
      {isLoading ? (
        <Flex justify="center" align="center" className="w-full h-full">
          <Spinner color="#DA291C" />
        </Flex>
      ) : (
        <Radar data={data} options={options} className="w-full h-full font-[12px]" />
      )}
    </div>
  );
};

export default RadarChart;
