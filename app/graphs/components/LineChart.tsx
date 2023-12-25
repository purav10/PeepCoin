import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

Chart.register(...registerables);

const fetchCoinData = async (coinId: string, days = '1', currency = 'usd') => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`);
  const data = await response.json();
  return data;
};

const LineChart = ({ coinId = 'bitcoin' }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [prices, setPrices] = useState<Array<[number, number]>>([]);
  const [selectedDays, setSelectedDays] = useState('1');
  const [selectedCurrency, setSelectedCurrency] = useState('usd');

  useEffect(() => {
    const fetchAndSetData = async () => {
      const data = await fetchCoinData(coinId, selectedDays, selectedCurrency);
      setPrices(data.prices);
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

  return (
    <div style={{ height: "100%", width: "100%", padding: "20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Tabs defaultValue="1" onValueChange={setSelectedDays} style={{ flexGrow: 1, marginRight: '50px' }}>
          <TabsList>
            <TabsTrigger value="1">1 Day</TabsTrigger>
            <TabsTrigger value="14">14 Days</TabsTrigger>
            <TabsTrigger value="30">30 Days</TabsTrigger>
            <TabsTrigger value="max">Max</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select onValueChange={setSelectedCurrency} defaultValue={selectedCurrency}>
          <SelectTrigger>
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="jpy">JPY</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <canvas ref={ref}></canvas>
    </div>
  );
}

export default LineChart;
