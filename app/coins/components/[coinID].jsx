import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LineChart from '../../components/LineChart';
import DetailedCoinInfo from '../../components/DetailedCoinInfo';
import NewsFeed from '../../components/NewsFeed';
import CoinTicker from '../../components/CoinTicker';

const CoinPage = () => {
  const router = useRouter();
  const { coinId } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (coinId) {
      setIsLoading(false);
    }
  }, [coinId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DetailedCoinInfo coinId={coinId} />
      <LineChart coinId={coinId} />
      <CoinTicker coinId={coinId} />
      <NewsFeed coinId={coinId} />
    </div>
  );
};

export default CoinPage;
