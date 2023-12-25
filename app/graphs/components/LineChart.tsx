import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment'; 
import { useEffect, useRef, useState } from 'react';

Chart.register(...registerables);
export const fetchCoinData = async (coinId = 'bitcoin') => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`);
  const data = await response.json();
  return data;
};


Chart.register(...registerables);

const LineChart = ({ coinId = 'bitcoin' }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [prices, setPrices] = useState<Array<[number, number]>>([]);

  useEffect(() => {
      const fetchAndSetData = async () => {
          const data = await fetchCoinData(coinId);
          setPrices(data.prices);
      };

      if (coinId) {
          fetchAndSetData();
      }
  }, [coinId]);

  useEffect(() => {
    if (ref.current && prices.length > 0) {
      const ctx = ref.current.getContext('2d');
      if (ctx) {
        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Coin Price',
                    data: prices.map(([time, price]) => ({ x: time, y: price })),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                  }]
            },
            options: {
              scales: {
                x: {
                  type: 'time', 
                  time: {
                    unit: 'day' 
                  }
                }
              }
            }
          });
          ;

        return () => {
          chartInstance.destroy();
        };
      }
    }
  }, [prices]);

  return (
    <div style={{ height: "100%", width: "100%"}}>
      <canvas ref={ref}></canvas>
    </div>
  );
};

export default LineChart;
