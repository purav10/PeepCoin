import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

// TypeScript Interfaces
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

const DetailedCoinInfo: React.FC<DetailedCoinInfoProps> = ({ coinId }) => {
    const [coinData, setCoinData] = useState<CoinDetails | null>(null);

    useEffect(() => {
        if (coinId) {
            fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
                .then(response => response.json())
                .then(data => setCoinData(data));
        }
    }, [coinId]);

    if (!coinData) return <div>Loading...</div>;

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
                {/* Card for Image, Name, Symbol, and Key Statistics */}
                <Card style={{ flex: '1', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={coinData.image.large} alt={coinData.name} style={{ width: '100px', height: '100px' }} />
                    <CardHeader>{coinData.name} ({coinData.symbol.toUpperCase()})</CardHeader>
                    {coinData.hashing_algorithm && <CardDescription>Algorithm: {coinData.hashing_algorithm}</CardDescription>}
                    <CardContent>Market Cap: ${coinData.market_data.market_cap.usd.toLocaleString()}</CardContent>
                    <CardContent>Current Price: ${coinData.market_data.current_price.usd.toLocaleString()}</CardContent>
                    <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px', textDecoration: 'underline', color:'blue'}}>Site</a>
                </Card>

                {/* Card for Description */}
                <Card style={{ flexGrow: '1', padding: '20px' }}>
                    <CardDescription dangerouslySetInnerHTML={{ __html: coinData.description.en }} style={{ textAlign: 'justify', overflowY: 'auto' }}></CardDescription>
                </Card>
            </div>
        </Card>
    );
};

export default DetailedCoinInfo;
