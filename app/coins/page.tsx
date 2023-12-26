"use client";
import React, { useState, useEffect } from 'react';
import LineChart from './components/LineChart';
import CoinSearchBar from './components/CoinSearchBar';
import TrendingCoins from './components/Trending';
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
  color: #1E2B3A; 
  background: #F2F3F5;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap; // Allow items to wrap in smaller screens

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  flex: 1;
  min-width: 250px; // Ensure sidebar has a reasonable minimum width
  transition: all 0.5s ease;

  @media screen and (max-width: 768px) {
    width: 100%;
    order: 2; // Reorder sidebar below the main content on small screens
  }
`;

const MainContent = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
    order: 1; // Ensure main content is at the top on small screens
  }
`;

const CardStyled = styled(Card)`
  width: 100%;
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
              <CardStyled>
                <CardHeader>Coin Market Chart</CardHeader>
                <LineChart coinId={selectedCoinId} />
              </CardStyled>
            </>
          )}
        </MainContent>
        <Sidebar>
          <CardStyled>
            <TrendingCoins onTrendingCoinSelect={handleCoinSelect} />
          </CardStyled>
          <CardStyled style={{ marginTop: '20px' }}>
            {isLoading ? <CoinTickerSkeleton /> : selectedCoinId && <CoinTicker coinId={selectedCoinId} />}
          </CardStyled>
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
