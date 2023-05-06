import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface Props {
  data: number[];
  labels: string[];
}

const DoughnutChart: React.FC<Props> = ({ data, labels }) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"doughnut"> | null>(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");

      if (ctx) {
        if (!chartInstance.current) {
          chartInstance.current = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels,
              datasets: [
                {
                  label: "Data",
                  data,
                  backgroundColor: ["#00bfdc", "orange"],
                  borderWidth: 0,
                },
              ],
            },
            options: {
              cutout: "80%",
              plugins: {
                legend: { display: false },
              },
            },
          });
        } else {
          chartInstance.current.data.labels = labels;
          chartInstance.current.data.datasets[0].data = data;
          chartInstance.current.update();
        }
      }
    }
  }, [data, labels]);

  return (
    <>
      <canvas ref={chartContainer} />
      <div className="boxLegends1">
        {" "}
        <img src="coinBitcoin.png"></img>
        <p>
          <b>{((data[1] / (data[0] + data[1])) * 100).toFixed(0)}%</b>
        </p>
      </div>
      <div className="boxLegends2">
        <img src="coinAutomining.png"></img>
        <b>
          <p>{((data[0] / (data[0] + data[1])) * 100).toFixed(0)}%</p>
        </b>
      </div>
    </>
  );
};

export default DoughnutChart;
