'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-chart-financial';
import 'chartjs-adapter-moment';
Chart.register(...registerables);
import { CandlestickElement, CandlestickController} from 'chartjs-chart-financial';
Chart.register(CandlestickElement, CandlestickController);

const fetchCoinData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1');
  const data = await response.json();
  return data.prices;
};


// Function to transform data to a format suitable for a candlestick chart
const transformToCandlestickData = (prices: Array<[number, number]>): Array<any> => {
  return prices.map((price, index) => {
    const [time, close] = price;
    const open = index > 0 ? prices[index - 1][1] : close; // Previous close as open
    const high = close * 1.02; // Example: 2% above the close
    const low = close * 0.98;  // Example: 2% below the close

    return {
      t: time, // time
      o: open, // open
      h: high, // high
      l: low,  // low
      c: close // close
    };
  });
};

const CandlestickChart: React.FC = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [prices, setPrices] = useState<Array<[number, number]>>([]);

  // Fetch and set data
  useEffect(() => {
    const fetchAndSetData = async () => {
      const data = await fetchCoinData();
      setPrices(data);
    };

    fetchAndSetData();
  }, []);

  // Create chart with candlestick data
  useEffect(() => {
    if (ref.current && prices.length > 0) {
      const ctx = ref.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'candlestick',
          data: {
            datasets: [{
              label: 'Bitcoin Price',
              data: transformToCandlestickData(prices)
            }]
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'minute'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Price (USD)'
                }
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
  }, [prices]);

  return <canvas ref={ref}></canvas>;
};
