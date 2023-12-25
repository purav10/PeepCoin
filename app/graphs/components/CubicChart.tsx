import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';

Chart.register(...registerables);



const dataPoints = Array.from({ length: 21 }, (_, i) => {
  const x = i - 10; // Generates values from -10 to 10
  return { x: x, y: Math.pow(x, 3) };
});

const CubicChart: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      if (ctx) {
        // Destroy the previous instance of the chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create a new chart instance
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [{
              label: 'y = x^3',
              data: dataPoints,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom'
              }
            }
          }
        });
      }
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={ref}></canvas>;
};

export default CubicChart;

