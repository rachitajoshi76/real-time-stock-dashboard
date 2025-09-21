export default function StockTable({ stocks, selectedTicker, onSelect }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Symbol</th>
          <th className="p-2">Price</th>
          <th className="p-2">% Change</th>
          <th className="p-2">Moving Avg</th>
          <th className="p-2">Last</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((s) => (
          <tr
            key={s.symbol}
            onClick={() => onSelect(s.symbol)}
            className={`cursor-pointer hover:bg-blue-50 ${
              selectedTicker === s.symbol ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            <td className="p-2">{s.symbol}</td>
            <td className="p-2 text-green-600">
              {s.latestPrice != null ? s.latestPrice.toFixed(2) : "--"}
            </td>
            <td
              className={`p-2 ${
                s.changePercent != null
                  ? s.changePercent >= 0
                    ? "text-green-600"
                    : "text-red-500"
                  : ""
              }`}
            >
              {s.changePercent != null ? s.changePercent.toFixed(2) + "%" : "--"}
            </td>
            <td className="p-2 text-blue-600">
              {s.movingAvg != null ? s.movingAvg.toFixed(2) : "--"}
            </td>
            <td className="p-2 text-gray-500">
              {s.timestamp
                ? new Date(s.timestamp).toLocaleTimeString()
                : "--"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
