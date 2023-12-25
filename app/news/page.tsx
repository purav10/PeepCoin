// pages/cryptocurrencies/index.js
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface Crypto {
  id: string;
  name: string;
  current_price: number;
}

const CryptocurrencyList = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await res.json();
      setCryptos(data);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4 lg:col-span-6 xl:col-span-4 xl:space-y-6">
            <div className="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
              <Skeleton className="h-[218px] w-full" />
              <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
                <Skeleton className="h-[218px] w-full" />
              </div>
              <div className="pt-3 sm:col-span-2 xl:pt-4">
                <Skeleton className="h-[218px] w-full" />
              </div>
            </div>
            <div className="hidden md:block">
              <Skeleton className="h-[218px] w-full" />
            </div>
            <Skeleton className="h-[218px] w-full" />
          </div>
  );
};

export default CryptocurrencyList;
