// src/components/StockTable.jsx
import React from "react";

export default function StockTable({ stocksData = [], selectedTicker, onSelect }) {
  return (
    <div className="stock-table-card">
      <table className="stock-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>% Change</th>
            <th>Moving Avg</th>
            <th>Last</th>
          </tr>
        </thead>
        <tbody>
          {stocksData.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-400">
                No stock data available
              </td>
            </tr>
          ) : (
            stocksData.map((s) => (
              <tr
                key={s.symbol}
                onClick={() => onSelect(s.symbol)}
                className={selectedTicker === s.symbol ? "selected" : ""}
              >
                <td>{s.symbol}</td>
                <td className={s.latestPrice >= 0 ? "positive" : "negative"}>
                  {s.latestPrice != null ? s.latestPrice.toFixed(2) : "--"}
                </td>
                <td className={s.changePercent >= 0 ? "positive" : "negative"}>
                  {s.changePercent != null ? s.changePercent.toFixed(2) + "%" : "--"}
                </td>
                <td>{s.movingAvg != null ? s.movingAvg.toFixed(2) : "--"}</td>
                <td>
                  {s.timestamp
                    ? new Date(s.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "--"}
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot className="stock-table-footer">
          <tr>
            <td colSpan={5}>
              <span>Real-time stock dashboard</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
