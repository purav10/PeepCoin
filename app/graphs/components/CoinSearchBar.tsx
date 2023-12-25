import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface Coin {
    id: string;
    name: string;
    thumb: string;
}

interface CoinSearchBarProps {
    onCoinSelect: (coinId: string) => void;
}

const CoinSearchBar: React.FC<CoinSearchBarProps> = ({ onCoinSelect }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Coin[]>([]);

    useEffect(() => {
        if (query) {
            fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data.coins.slice(0, 5)); // Limit to 5 results
                });
        } else {
            setSearchResults([]);
        }
    }, [query]);

    const handleSelect = (coinId: string) => {
        onCoinSelect(coinId);
        setQuery(''); // Reset query
        setSearchResults([]); // Clear results
    };

    return (
        <div className="coin-search-bar" style={{ position: 'relative', width: '100%' }}>
            <Input
                type="text"
                placeholder="Search Coin"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', fontSize: '16px' }}
            />
            {searchResults.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'absolute', width: '100%', backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    {searchResults.map(coin => (
                        <li key={coin.id} onClick={() => handleSelect(coin.id)} style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                            <img src={coin.thumb} alt={coin.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            <span>{coin.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CoinSearchBar;
