import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as Chartjs, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chartjs.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

export default function RatingPercentage() {
  const { oneStar, twoStar, threeStar, fourStar, fiveStar } = useSelector(
    (state) => state.quanLySoLieuSlice
  );

  const barChartData = {
    labels: ["5⭐", "4⭐", "3⭐", "2⭐", "1⭐"],
    datasets: [
      {
        label: "Số bình chọn",
        data: [
          fiveStar.length,
          fourStar.length,
          threeStar.length,
          twoStar.length,
          oneStar.length,
        ],
        backgroundColor: ["red", "blue", "orange", "green", "black"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Rating",
      },
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        color: "white",
        anchor: "center",
        align: "middle",
        font: { size: 10 },
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
      },
    },
  };
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Pie data={barChartData} options={options} />;
    </div>
  );
}
