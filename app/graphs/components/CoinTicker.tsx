import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Ticker {
        base: string;
        target: string;
        last: number;
        volume: number;
        is_anomaly: boolean;
        is_stale: boolean;
}

const CoinTicker = ({ coinId }: { coinId: string }) => {
    const [tickers, setTickers] = useState<Ticker[]>([]); // Provide type for tickers state variable
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!coinId) return;

        const fetchTickers = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/tickers`);
                if (!response.ok) throw new Error('Failed to fetch tickers');
                const data = await response.json();
                setTickers(data.tickers.slice(0, 10)); // Limit to first 10 tickers
            } catch (error) {
                console.error('Error fetching tickers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTickers();
    }, [coinId]);

    return (
        <Card>
          <CardHeader>Ticker Information</CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <tr>
                    <TableHead>Base/Target</TableHead>
                    <TableHead>Last Price</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Status</TableHead>
                  </tr>
                </TableHeader>
                <tbody>
                  {tickers.map((ticker, index) => (
                    <TableRow key={index} style={ticker.is_anomaly || ticker.is_stale ? { backgroundColor: '#ffeded' } : {}}>
                      <TableCell>{ticker.base}/{ticker.target}</TableCell>
                      <TableCell>{ticker.last}</TableCell>
                      <TableCell>{ticker.volume}</TableCell>
                      <TableCell>
                        {ticker.is_anomaly ? 'Anomaly' : ticker.is_stale ? 'Stale' : 'Normal'}
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            )}
          </CardContent>
        </Card>
      );
    };
    
    export default CoinTicker;
