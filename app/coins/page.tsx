"use client";
import React, { useState, useEffect } from 'react';
import LineChart from './components/LineChart';
import CoinSearchBar from './components/CoinSearchBar';
import TrendingCoins from './components/Trending';
import SkeletonLoader from './components/SkeletonLoader';
import DetailedCoinInfo from './components/DetailedCoinInfo';
import { Card, CardHeader } from '@/components/ui/card';
import NewsFeed from './components/NewsFeed';
import CoinTicker from './components/CoinTicker';
import styled from 'styled-components';
import LineChartSkeleton from './components/LineChartSkeleton';
import DetailedCoinInfoSkeleton from './components/DetailedCoinInfoSkeleton';
import CoinTickerSkeleton from './components/CoinTickerSkeleton';


const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.5s ease;
  color: #1E2B3A; 
  background: #F2F3F5;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  transition: all 0.5s ease;
`;

const MainContent = styled.div`
  flex: 10;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.5s ease;
`;

const Sidebar = styled.div`
  flex: 1;
  transition: all 0.5s ease;
  gap: 20px;
`;

const NewsSection = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.5s ease;

`;
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  background-color: #1E2B3A; 
  color: #fff;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


const HeaderTitle = styled.h1`
  font-size: 1.75rem; 
  font-weight: bold;
`;

const HeaderSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;


const GraphPage = () => {
  const [selectedCoinId, setSelectedCoinId] = useState('bitcoin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleCoinSelect = (coinId: string) => {
    setIsLoading(true);
    setSelectedCoinId(coinId);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <HeaderContent>
          <HeaderTitle>Crypto Dashboard</HeaderTitle>
          <HeaderSubtitle>Explore Cryptocurrency Trends and News</HeaderSubtitle>
        </HeaderContent>
      </HeaderContainer>

      <FlexRow>
        <MainContent>
          <CoinSearchBar onCoinSelect={handleCoinSelect} />
          {isLoading ? (
            <>
              <DetailedCoinInfoSkeleton />
              <LineChartSkeleton />
            </>
          ) : (
            <>
              {selectedCoinId && <DetailedCoinInfo coinId={selectedCoinId} />}
              <Card>
                <CardHeader>Coin Market Chart</CardHeader>
                <LineChart coinId={selectedCoinId} />
              </Card>
            </>
          )}
        </MainContent>

        <Sidebar>
          <Card style={{ width: '500px' }}>
            <TrendingCoins onTrendingCoinSelect={handleCoinSelect} />
          </Card>
          <Card style={{ width: '500px', marginTop: '20px' }}>
            <div>
              {isLoading ? <CoinTickerSkeleton /> : selectedCoinId && <CoinTicker coinId={selectedCoinId} />}
            </div>
          </Card>
        </Sidebar>
      </FlexRow>

      {selectedCoinId && (
        <NewsSection>
          <CardHeader style={{padding: "0.5rem"}}>Latest Crypto News</CardHeader>
          <NewsFeed coinId={selectedCoinId} />
        </NewsSection>
      )}
    </PageContainer>
  );
};

export default GraphPage;
