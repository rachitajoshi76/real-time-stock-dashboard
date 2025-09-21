// src/redux/stockSlice.js
import { createSlice } from "@reduxjs/toolkit";

const HISTORY_LIMIT = 60;

const initialState = {
  bySymbol: {},
  selectedTicker: "AAPL",
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    processUpdate(state, action) {
      const updates = action.payload;

      updates.forEach(({ symbol, latestPrice, changePercent, movingAvg, timestamp }) => {
        const price = Number(latestPrice); // ✅ backend sends latestPrice
        timestamp = timestamp || new Date().toISOString();

        if (!state.bySymbol[symbol]) {
          // Initialize if first time
          state.bySymbol[symbol] = {
            history: [],
            latestPrice: price,
            changePercent,
            movingAvg,
            timestamp,   // ✅ keep same name that UI expects
          };
        }

        const entry = state.bySymbol[symbol];
        entry.latestPrice = price;
        entry.changePercent = changePercent;
        entry.movingAvg = movingAvg;
        entry.timestamp = timestamp; // ✅ align with StockTable

        // Maintain history for chart
        entry.history.push({ price, timestamp });
        if (entry.history.length > HISTORY_LIMIT) {
          entry.history.shift();
        }
      });
    },
    setSelectedTicker(state, action) {
      state.selectedTicker = action.payload;
    },
    reset(state) {
      state.bySymbol = {};
      state.selectedTicker = "AAPL";
    },
  },
});

export const { processUpdate, setSelectedTicker, reset } = stockSlice.actions;
export default stockSlice.reducer;
