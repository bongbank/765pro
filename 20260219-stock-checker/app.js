// Stock Price Checker - JavaScript Logic

// ============================================
// PLACEHOLDER FOR REAL-TIME API INTEGRATION
// ============================================
// To integrate a real-time stock API:
// 1. Sign up for a stock API provider (e.g., Alpha Vantage, Finnhub, Yahoo Finance API)
// 2. Get your API key
// 3. Replace the fetchStocks() function below with actual API calls
//
// Example with Alpha Vantage:
// const API_KEY = 'YOUR_API_KEY';
// async function fetchRealTimePrices() {
//   const stocks = ['TSM', 'TSLA', 'GOOGL', ...];
//   for (const ticker of stocks) {
//     const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`);
//     const data = await response.json();
//     // Parse and update prices...
//   }
// }
//
// NOTE: CORS issues may occur with client-side JavaScript.
// Solutions: Use a proxy server, or use a browser-friendly API like Finnhub.
// ============================================

const STOCKS_JSON = 'stocks.json';

/**
 * Load stock data from stocks.json and display in table
 */
async function loadStockData() {
    try {
        const response = await fetch(STOCKS_JSON);
        if (!response.ok) {
            throw new Error('Failed to load stocks.json');
        }
        const stocks = await response.json();
        displayStocks(stocks);
        updateTimestamp();
    } catch (error) {
        console.error('Error loading stock data:', error);
        document.getElementById('stock-body').innerHTML = 
            '<tr><td colspan="4" style="color: red;">Error loading stock data</td></tr>';
    }
}

/**
 * Display stocks in the table
 */
function displayStocks(stocks) {
    const tbody = document.getElementById('stock-body');
    tbody.innerHTML = '';

    stocks.forEach(stock => {
        const row = document.createElement('tr');
        
        // Determine change class for styling
        let changeClass = 'neutral';
        if (stock.change !== 'N/A' && stock.change !== undefined) {
            const changeValue = parseFloat(stock.change.replace('%', '').replace('+', ''));
            if (changeValue > 0) changeClass = 'positive';
            else if (changeValue < 0) changeClass = 'negative';
        }

        row.innerHTML = `
            <td class="ticker">${stock.ticker}</td>
            <td class="price">${stock.price || 'N/A'}</td>
            <td class="${changeClass}">${stock.change || 'N/A'}</td>
            <td class="${changeClass}">${stock.changePercent || 'N/A'}</td>
        `;
        
        tbody.appendChild(row);
    });
}

/**
 * Update the last updated timestamp
 */
function updateTimestamp() {
    const now = new Date();
    const formatted = now.toLocaleString();
    document.getElementById('last-updated').textContent = formatted;
}

/**
 * Refresh button handler
 * Currently reloads from JSON - replace with API call for real-time data
 */
function refreshPrices() {
    // TODO: Replace with actual API call for real-time prices
    // For now, this just reloads the JSON data
    loadStockData();
    console.log('Refreshing prices... (Integrate real-time API for live data)');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadStockData();
    
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshPrices);
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadStockData, displayStocks, refreshPrices };
}
