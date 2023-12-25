"use client";
import React, { useState, useEffect } from 'react';
import LineChart from './components/LineChart';
import CoinSearchBar from './components/CoinSearchBar';
import TrendingCoins from './components/Trending';
import SkeletonLoader from './components/SkeletonLoader';
import DetailedCoinInfo from './components/DetailedCoinInfo';
import { Card } from '@/components/ui/card';

const GraphPage = () => {
  const [selectedCoinId, setSelectedCoinId] = useState('');
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
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'all 0.5s ease' }}>
          <CoinSearchBar onCoinSelect={handleCoinSelect} />

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', transition: 'all 0.5s ease' }}>
              <div style={{ flex: 10, display: 'flex', flexDirection: 'column', gap: '20px', transition: 'all 0.5s ease' }}>
                  {isLoading ? (
                      <SkeletonLoader />
                  ) : (
                      <>
                          {selectedCoinId && <DetailedCoinInfo coinId={selectedCoinId} />}
                          <Card style={{ transition: 'all 0.5s ease' }}>
                              <LineChart coinId={selectedCoinId} />
                          </Card>
                      </>
                  )}
              </div>

              <div style={{ flex: 1, transition: 'all 0.5s ease' }}>
                  <Card>
                      <h2 style={{padding: "0.5rem"}}>Trending</h2>
                      <TrendingCoins />
                  </Card>
              </div>
          </div>
      </div>
  );
};

export default GraphPage;

