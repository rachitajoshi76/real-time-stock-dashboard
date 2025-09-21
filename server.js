const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 8080;

// Tickers
const tickers = ['AAPL', 'GOOG', 'TSLA', 'BTC-USD', 'AMZN', 'MSFT', 'META', 'VIX'];
const basePrices = {};
const history = {}; // track last 50 prices per ticker

// Initialize base prices & history
tickers.forEach(t => {
  switch (t) {
    case 'AAPL': basePrices[t] = 100 + Math.random() * 100; break;
    case 'GOOG': basePrices[t] = 2000 + Math.random() * 1000; break;
    case 'TSLA': basePrices[t] = 400 + Math.random() * 400; break;
    case 'BTC-USD': basePrices[t] = 30000 + Math.random() * 30000; break;
    case 'AMZN': basePrices[t] = 120 + Math.random() * 50; break;
    case 'MSFT': basePrices[t] = 250 + Math.random() * 150; break;
    case 'META': basePrices[t] = 300 + Math.random() * 200; break;
    case 'VIX': basePrices[t] = 15 + Math.random() * 15; break;
    default: basePrices[t] = 100 + Math.random() * 100;
  }
  history[t] = [];
});

// Random price generator
function randomPrice(base) {
  const volatility = 0.02;
  const changePercent = (Math.random() * volatility * 2) - volatility;
  return +(base * (1 + changePercent)).toFixed(2);
}

// Compute stats for each ticker
function getStats(symbol, newPrice) {
  const arr = history[symbol];
  const prevPrice = arr.length ? arr[arr.length - 1] : newPrice;
  arr.push(newPrice);
  if (arr.length > 50) arr.shift();

  const movingAvg = arr.reduce((a, b) => a + b, 0) / arr.length;
  const changePercent = prevPrice !== 0 ? ((newPrice - prevPrice) / prevPrice) * 100 : 0;

  return {
    latestPrice: newPrice,
    changePercent: +changePercent.toFixed(2),
    movingAvg: +movingAvg.toFixed(2),
    timestamp: new Date().toISOString(),
  };
}

let clients = [];

app.prepare().then(() => {
  const server = express();

  // SSE endpoint
  server.get('/stocks/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    res.write('retry: 10000\n\n');

    const keepAlive = setInterval(() => res.write(':keep-alive\n\n'), 15000);
    clients.push(res);

    req.on('close', () => {
      clearInterval(keepAlive);
      clients = clients.filter(c => c !== res);
    });
  });

  // Broadcast updates every 1s
  setInterval(() => {
    const stockUpdate = tickers.map(t => {
      const price = randomPrice(basePrices[t]);
      return { symbol: t, ...getStats(t, price) };
    });

    const data = `data: ${JSON.stringify(stockUpdate)}\n\n`;
    clients.forEach(c => c.write(data));
  }, 1000);

  // Next.js pages
  server.all('*', (req, res) => handle(req, res));

  server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
