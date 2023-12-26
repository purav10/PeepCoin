import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import DetailedCoinInfoSkeleton from './DetailedCoinInfoSkeleton';
import styled from 'styled-components';

const CoinDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column; // Stack elements vertically on smaller screens
  }
`;

interface DataCache {
  [key: string]: any;
}
const dataCache : DataCache = {};

interface CoinDetails {
    id: string;
    name: string;
    symbol: string;
    hashing_algorithm: string;
    description: { en: string };
    market_data: {
        market_cap: { usd: number };
        current_price: { usd: number };
    };
    image: { large: string };
    links: { homepage: string[] };
}

interface DetailedCoinInfoProps {
    coinId: string;
}

const retryFetch = async (fn: () => Promise<any>, retries: number = 3, delay: number = 1000): Promise<any> => {
    try {
      return await fn();
    } catch (error) {
      if (retries === 1) throw error;
      await new Promise(r => setTimeout(r, delay));
      return retryFetch(fn, retries - 1, delay);
    }
  };

const DetailedCoinInfo: React.FC<DetailedCoinInfoProps> = ({ coinId }) => {
    const [coinData, setCoinData] = useState<CoinDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCoinData = async () => {
          setIsLoading(true);
          const cacheKey = `${coinId}`;
          if (dataCache[cacheKey]) {
            return dataCache[cacheKey];
          }
          try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
            const data = await response.json();
            dataCache[cacheKey] = data;
            
            setCoinData(data);
          } catch (error) {
            console.error('Error fetching coin data:', error);
          }
          setIsLoading(false);
        };
    
        if (coinId) {
          fetchCoinData();
        }
      }, [coinId]);

    if (!coinData) return (
    <Card style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px' }}>
        <DetailedCoinInfoSkeleton/>
    </Card>);

    return (
        <Card>
        <CoinDetailsContainer>
          {/* Card for Image, Name, Symbol, and Key Statistics */}
          <Card style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', margin: '10px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
  <img src={coinData.image.large} alt={coinData.name} style={{ width: '100px', height: '100px', marginBottom: '10px' }}/>
  <CardHeader style={{ marginBottom: '5px' }}>{coinData.name} ({coinData.symbol.toUpperCase()})</CardHeader>
  {coinData.hashing_algorithm && (
    <CardDescription style={{ marginBottom: '5px' }}>
      Algorithm: {coinData.hashing_algorithm}
    </CardDescription>
  )}
  <CardContent style={{ marginBottom: '5px' }}>
    Market Cap: ${coinData.market_data.market_cap.usd.toLocaleString()}
  </CardContent>
  <CardContent style={{ marginBottom: '10px' }}>
    Current Price: ${coinData.market_data.current_price.usd.toLocaleString()}
  </CardContent>
  <a 
    href={coinData.links.homepage[0]} 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ 
      marginTop: '10px', 
      textDecoration: 'underline', 
      color:'blue' 
    }}
  >
    Homepage
  </a>
</Card>

          <Card style={{ flexGrow: 1, padding: '20px' }}>
        <CardDescription dangerouslySetInnerHTML={{ __html: coinData.description.en }} style={{ textAlign: 'justify', overflowY: 'auto' }}></CardDescription>
      </Card>
      </CoinDetailsContainer>
        </Card>
    );
};

export default DetailedCoinInfo;
