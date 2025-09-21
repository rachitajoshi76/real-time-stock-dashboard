
export default function TickerSelector({ tickers, selected, onChange }) {
  if (!tickers || tickers.length === 0) return null;

  return (
    <div style={{ marginTop: "12px", marginBottom: "20px" }}>
      <label style={{ fontWeight: 600, marginRight: "8px" }}>
        Select Ticker:
      </label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      >
        {tickers.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
