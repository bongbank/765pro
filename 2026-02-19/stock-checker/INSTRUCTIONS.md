# Stock Price Checker - Setup Instructions

## Overview

This is a simple single-page application for checking stock prices. It displays a list of stock tickers with their current prices and changes.

## Supported Tickers

- TSM (Taiwan Semiconductor)
- TSLA (Tesla)
- GOOGL (Alphabet/Google)
- NVDA (NVIDIA)
- QQQI (Invesco Nasdaq Next)
- AMZN (Amazon)
- AMD (Advanced Micro Devices)
- SLV (iShares Silver Trust)
- EOSE (Eos Energy Enterprises)
- PLTR (Palantir Technologies)
- ONDS (ON Semiconductor)
- OKLO (Oklo Inc.)

## Setup

### Option 1: Local File (No Server Required)

Since this uses `fetch()` to load `stocks.json`, you'll need a simple HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: VS Code Live Server

If using VS Code, install the "Live Server" extension and click "Go Live" on the `index.html` file.

## Manually Updating Prices

To manually update stock prices, edit the `stocks.json` file:

```json
{
    "ticker": "TSLA",
    "price": "$245.50",
    "change": "+5.25",
    "changePercent": "+2.19%"
}
```

Fields:
- `ticker`: Stock symbol
- `price`: Current price (e.g., "$245.50")
- `change`: Absolute change (e.g., "+5.25" or "-3.10")
- `changePercent`: Percentage change (e.g., "+2.19%" or "-1.25%")

## Integrating a Real-Time Stock API

### Why API Integration?

The current version uses static JSON data. For real-time prices, you need to integrate a stock market API.

### Recommended APIs

1. **Alpha Vantage** (free tier available)
   - https://www.alphavantage.co/
   - 25 requests/day (free)

2. **Finnhub** (free tier available)
   - https://finnhub.io/
   - 60 requests/minute (free)
   - Better CORS support for browser

3. **Yahoo Finance** (via RapidAPI)
   - https://rapidapi.com/yahoo-finance127
   - More requests but requires RapidAPI key

### API Integration Steps

1. **Sign up** for an API provider
2. **Get your API key**
3. **Update `app.js`** to make API calls

Example with Finnhub:
```javascript
const API_KEY = 'YOUR_FINNHUB_API_KEY';

async function fetchRealTimePrices() {
    const tickers = ['TSM', 'TSLA', 'GOOGL', 'NVDA', 'QQQI', 'AMZN', 'AMD', 'SLV', 'EOSE', 'PLTR', 'ONDS', 'OKLO'];
    
    for (const ticker of tickers) {
        try {
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`);
            const data = await response.json();
            
            // Calculate change
            const change = data.c - data.pc;
            const changePercent = (change / data.pc) * 100;
            
            // Update UI...
        } catch (error) {
            console.error(`Error fetching ${ticker}:`, error);
        }
    }
}
```

### Important: CORS Issues

**Problem:** Browsers block JavaScript from making requests to different domains (CORS).

**Solutions:**

1. **Use a CORS-friendly API** (like Finnhub)
2. **Use a CORS proxy** (for development only):
   ```javascript
   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
   const apiUrl = 'https://api.example.com/stock';
   ```
3. **Set up a backend server** to proxy requests
4. **Use browser extensions** (for development only)

### Security Note

Never expose your API key in client-side JavaScript in production. Consider:
- Using a backend server to hide the key
- Using environment variables
- Implementing rate limiting on your server

## File Structure

```
stock-checker/
├── index.html      # Main HTML structure
├── styles.css      # Styling
├── app.js          # JavaScript logic
├── stocks.json     # Stock data (editable)
└── INSTRUCTIONS.md # This file
```

## License

MIT License
