import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LineChartSkeleton from './LineChartSkeleton';
import styled from 'styled-components';

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }
  }
  .tabs-container, .select-container {
    flex-grow: 1;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;


Chart.register(...registerables);
interface DataCache {
  [key: string]: any;
}
const dataCache : DataCache = {};

const fetchCoinData = async (coinId: string, days = '1', currency = 'usd') => {
  const cacheKey = `${coinId}-${days}-${currency}`;
  if (dataCache[cacheKey]) {
    return dataCache[cacheKey];
  }
  
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`);
  const data = await response.json();
  
  dataCache[cacheKey] = data;
  return data;
};



const LineChart = ({ coinId = 'bitcoin' }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [prices, setPrices] = useState<Array<[number, number]>>([]);
  const [selectedDays, setSelectedDays] = useState('1');
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAndSetData = async () => {
      setLoading(true);
      const data = await fetchCoinData(coinId, selectedDays, selectedCurrency);
      setPrices(data.prices);
      setLoading(false);
    };

    if (coinId) {
      fetchAndSetData();
    }
  }, [coinId, selectedDays, selectedCurrency]);

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
  
  if (loading) {
    return <LineChartSkeleton />;
  }

  return (
    <ChartContainer>
    <div className="controls">
      <div className="tabs-container">
        <Tabs value={selectedDays} onValueChange={setSelectedDays}>
          <TabsList>
            <TabsTrigger value="1">1 Day</TabsTrigger>
            <TabsTrigger value="14">14 Days</TabsTrigger>
            <TabsTrigger value="30">30 Days</TabsTrigger>
            <TabsTrigger value="max">Max</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="select-container">
        <Select onValueChange={setSelectedCurrency} defaultValue={selectedCurrency}>
          <SelectTrigger>
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="jpy">JPY</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="inr">INR</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <canvas ref={ref}></canvas>
  </ChartContainer>
  );
}

export default LineChart;
