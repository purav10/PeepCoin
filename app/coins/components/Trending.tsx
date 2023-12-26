import React, { useEffect, useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

interface CoinData {
    price: string;
    market_cap: string;
}

interface CoinItem {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    large: string;
    data: CoinData;
}

interface TrendingCoin {
    item: CoinItem;
}

interface TrendingCoinsProps {
    onTrendingCoinSelect: (coinId: string) => void; // Define the prop for handling coin selection
  }
  
  const TrendingCoins = ({ onTrendingCoinSelect }: TrendingCoinsProps) => {
    const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
    
    useEffect(() => {
      const fetchTrendingCoins = async () => {
        try {
          const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
          const data = await response.json();
          setTrendingCoins(data.coins);
        } catch (error) {
          console.error("Error fetching trending coins:", error);
        }
      };
      
      fetchTrendingCoins();
    }, []);
  
    // Function to handle coin click and pass the selected coin's id to the parent component
    const handleCoinClick = (coinId: string) => {
      onTrendingCoinSelect(coinId);
    };
  
    return (
        <div style={{ display: 'flex', justifyContent: 'right', padding: '20px' }}>
          <ScrollAreaPrimitive.Root className="ScrollAreaRoot" style={{ width: 500, height: 685, overflow: 'hidden' }}>
            <ScrollAreaPrimitive.Viewport style={{ width: '100%', height: '100%' }}>
              <Card className="w-500px h-400px overflow-auto">
                <CardHeader>Trending</CardHeader>
                <Table className="bg-background text-foreground">
                  <TableHeader className="text-center">
                    <TableRow>
                      <TableHead>Coin</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Market Cap Rank</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trendingCoins.map(coin => (
                      <TableRow
                        key={coin.item.id}
                        onClick={() => handleCoinClick(coin.item.id)}
                        className="trending-row" // Add a class for styling
                      >
                        <TableCell>
                          <img src={coin.item.large} alt={coin.item.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                        </TableCell>
                        <TableCell>{coin.item.name}</TableCell>
                        <TableCell>{coin.item.symbol.toUpperCase()}</TableCell>
                        <TableCell>{coin.item.market_cap_rank}</TableCell>
                        <TableCell>{coin.item.data.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </ScrollAreaPrimitive.Viewport>
    
            <ScrollAreaPrimitive.Scrollbar orientation="vertical">
              <ScrollAreaPrimitive.Thumb />
            </ScrollAreaPrimitive.Scrollbar>
    
            <ScrollAreaPrimitive.Scrollbar orientation="horizontal">
              <ScrollAreaPrimitive.Thumb />
            </ScrollAreaPrimitive.Scrollbar>
    
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root>
        </div>
      );
    };
    
    export default TrendingCoins;