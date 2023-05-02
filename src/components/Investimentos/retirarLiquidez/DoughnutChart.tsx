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
                legend: { display: true },
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

  return <canvas ref={chartContainer} />;
};

export default DoughnutChart;
