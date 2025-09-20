const express = require('express');
const app = express();
const PORT = 8080; // Use 4000 because Next.js uses 3000
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
// Fixed tickers
const tickers = ['AAPL', 'GOOG', 'TSLA', 'BTC-USD'];

// Generate random base prices for each ticker
function generateRandomBasePrice(ticker) {
  switch(ticker) {
    case 'AAPL': return +(100 + Math.random() * 100).toFixed(2);
    case 'GOOG': return +(2000 + Math.random() * 1000).toFixed(2);
    case 'TSLA': return +(400 + Math.random() * 400).toFixed(2);
    case 'BTC-USD': return +(30000 + Math.random() * 30000).toFixed(2);
    default: return +(100 + Math.random() * 100).toFixed(2);
  }
}

const basePrices = {};
tickers.forEach(ticker => {
  basePrices[ticker] = generateRandomBasePrice(ticker);
});

// Utility: generate a random price around a base
function randomPrice(base) {
  const volatility = 0.02; // 2%
  const changePercent = (Math.random() * volatility * 2) - volatility;
  return +(base * (1 + changePercent)).toFixed(2);
}

// Store SSE clients
let clients = [];

// SSE endpoint
app.get('/stocks/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.flushHeaders();

  // Keep connection alive
  const keepAlive = setInterval(() => {
    res.write(':keep-alive\n\n');
  }, 15000);

  // Add client
  clients.push(res);

  req.on('close', () => {
    clearInterval(keepAlive);
    clients = clients.filter(c => c !== res);
  });
});

// Broadcast stock updates every 1s
setInterval(() => {
  const stockUpdate = tickers.map(ticker => ({
    symbol: ticker,
    price: randomPrice(basePrices[ticker]),
    timestamp: new Date().toISOString(),
  }));

  const data = `data: ${JSON.stringify(stockUpdate)}\n\n`;
  clients.forEach(client => client.write(data));
}, 1000);

app.listen(PORT, () => {
  console.log(`Stock price SSE server running on http://localhost:${PORT}`);
});
