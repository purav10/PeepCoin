import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import './CoinSearch.css'; // Import the CSS file for styling

interface Coin {
    id: string;
    name: string;
}

interface CoinSearchProps {
    onSelectCoin: (coinId: string) => void;
}

const fetchCoinsList = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    const data = await response.json();
    return data as Coin[];
};

const CoinSearch: React.FC<CoinSearchProps> = ({ onSelectCoin }) => {
    const [inputValue, setInputValue] = useState('');
    const [coins, setCoins] = useState<Coin[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);

    useEffect(() => {
        const loadCoins = async () => {
            const coinsList = await fetchCoinsList();
            setCoins(coinsList);
        };
        loadCoins();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (event.target.value) {
            const filtered = coins.filter(coin =>
                coin.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setFilteredCoins(filtered);
        } else {
            setFilteredCoins([]);
        }
    };

    return (
        <div className="coin-search">
            <Input 
                className="coin-search-input"
                type="text" 
                placeholder="Search Coin" 
                value={inputValue} 
                onChange={handleInputChange}
            />
            {filteredCoins.length > 0 && (
                <div className="coin-search-dropdown">
                    {filteredCoins.map((coin) => (
                        <div 
                            className="coin-search-item"
                            key={coin.id} 
                            onClick={() => onSelectCoin(coin.id)}
                        >
                            {coin.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoinSearch;
