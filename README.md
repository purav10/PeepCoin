<p align="center">
    <img src="https://0x0.st/HEar.png" alt="PeepCoin Logo">
	<h1 align="center">PeepCoin : Crypto Aggregator</h1>
</p>

## Features

- **Line Chart**: Visual representation of cryptocurrency prices over time.
- **Coin Search Bar**: Allows users to search for specific cryptocoins.
- **Trending Coins**: Displays a list of currently trending cryptocurrencies.
- **Detailed Coin Information**: Shows detailed information about each selected coin.
- **News Feed**: Provides the latest news related to the cryptocurrency market.

## Components

- `LineChart`: 
	- Renders a line chart using Chart.js for a specified cryptocurrency.
	- API used : https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}
- `CoinSearchBar`: 
	- A search bar component for finding cryptocurrencies.
	- API used : https://api.coingecko.com/api/v3/search?query=${query}
- `TrendingCoins`: 
	- Displays a list of trending cryptocurrencies, fetched from the CoinGecko API.
	- API used : https://api.coingecko.com/api/v3/search/trending
- `DetailedCoinInfo`: 
	- Shows detailed information about a selected cryptocurrency, including market cap, price, and other relevant data.
	- API used : https://api.coingecko.com/api/v3/coins/${coinId}
- `NewsFeed`: 
	- Displays the latest news related to cryptocurrency.
	- API used : https://newsapi.org/v2/everything?q=${coinId}&apiKey="YOUR_API_KEY"
	- The developer mode of news API only enables CORS on localhost that is why the newsAPI doesn't work on deployed Vercel App.
- `CoinTicker`:
	- Shows ticker information about a selected cryptocurrency.
	- API used : https://api.coingecko.com/api/v3/coins/${coinId}/tickers
- `SkeletonLoaders` (`LineChartSkeleton`, `DetailedCoinInfoSkeleton`, `CoinTickerSkeleton`): Placeholder components displayed while data is being loaded.

## APIs

- **CoinGecko API**: Used in several components to fetch data:
    - `fetchCoinData` in `LineChart` fetches historical price data for a specific coin.
    - `TrendingCoins` fetches data about currently trending coins.
    - `DetailedCoinInfo` fetches detailed data about a specific coin.
- **NewsAPI** : Fetches the latest news articles related to the query.

## Setup and Local Development

### Prerequisites

- Node.js (preferably the latest stable version)
- npm (usually comes with Node.js)

### Installation

1. **Clone the Repository:**
    
    ```
  	git clone https://github.com/purav10/PeepCoin
    cd PeepCoin
     ```
    
2. **Install Dependencies:**
    
    `npm install --force`
    
3. **Environment Variables:**
    
    - If the application requires any environment variables (The newsAPI key), set them up in a `.env` file in the root directory.
4. **Start the Development Server:**
    
    `npm run dev`
    
    This will run the app in development mode. Open http://localhost:3000 to view it in the browser. The page will reload if you make edits.

### This project is deployed on vercel app (https://peepcoin.vercel.app/)
