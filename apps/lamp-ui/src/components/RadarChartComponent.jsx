// src/components/RadarChartComponent.jsx
import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart.jsに必要なパーツを登録
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels
);

const RadarChartComponent = ({ score }) => {
  if (!score) return null;

  // スコアを正規化（/65.5*100）
  const normalize = (val) => (val / 65.5) * 100;

  const normalizedScore = {
    kyomei: normalize(score.kyomei),
    hyougen: normalize(score.hyougen),
    tankyu: normalize(score.tankyu),
    chosen: normalize(score.chosen),
    taiken: normalize(score.taiken),
  };

  const chartData = {
    labels: ["共鳴", "表現", "探求", "挑戦", "体験"],
    datasets: [
      {
        label: {display: false,},
        data: [
          score.kyomei,
          score.hyougen,
          score.tankyu,
          score.chosen,
          score.taiken,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: { font: { size: 14 } },
        ticks: { stepSize: 20, display: false },
      },
    },
    plugins: {
        legend: {
          display: false,
        },
      datalabels: {
        color: "#fff",
        font: { weight: "bold" },
      },
    },
  };

  return (
    <section className="chart">
      <Radar data={chartData} options={chartOptions} />
    </section>
  );
};

export default RadarChartComponent;
