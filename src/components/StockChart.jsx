import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function StockChart({ ticker, entry }) {
  if (!entry || !entry.history) return null;

  // Use a more descriptive moving average, e.g., 5-period MA
  const MA_PERIOD = 5;

  const chartData = entry.history.map((h) => ({
    timestamp: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: h.price,
  }));

  // Calculate moving average within the data mapping for cleaner merge
  const mergedData = chartData.map((d, i, arr) => {
    const subset = arr.slice(Math.max(0, i - MA_PERIOD + 1), i + 1);
    const avg = subset.reduce((sum, p) => sum + p.price, 0) / subset.length;
    return {
      timestamp: d.timestamp,
      price: d.price,
      ma: +avg.toFixed(2),
    };
  });

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Time: ${label}`}</p>
          <p className="price" style={{ color: '#007bff' }}>{`Price: ${payload[0].value.toFixed(2)}`}</p>
          {payload[1] && <p className="ma" style={{ color: '#28a745' }}>{`MA (${MA_PERIOD}): ${payload[1].value.toFixed(2)}`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 350 }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Stock Price Trend ({ticker})</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mergedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="timestamp" minTickGap={30} tickFormatter={(tick) => tick.slice(0, 5)} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#007bff" // A professional blue for price
            strokeWidth={2}
            dot={false}
            name="Price"
          />
          <Line
            type="monotone"
            dataKey="ma"
            stroke="#28a745" // A professional green for moving average
            strokeWidth={2}
            dot={false}
            name={`MA (${MA_PERIOD})`}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* Removed the extra price/change/avg display as it's redundant with cards */}
    </div>
  );
}