// src/components/KPIBoxes.jsx
export default function KPIBoxes({ stock }) {
  if (!stock) return null;

  const kpis = [
    { label: "Latest Price", value: stock.latestPrice?.toFixed(2), bg: "#16a34a" },
    { label: "Change %", value: stock.changePercent?.toFixed(2) + "%", bg: stock.changePercent >= 0 ? "#16a34a" : "#ef4444" },
    { label: "Moving Avg", value: stock.movingAvg?.toFixed(2), bg: "#3b82f6" },
  ];

  return (
    <div style={{ display: "flex", gap: "1rem", margin: "24px 0", flexWrap: "wrap" }}>
      {kpis.map(kpi => (
        <div
          key={kpi.label}
          style={{
            flex: "1",
            minWidth: "150px",
            backgroundColor: kpi.bg,
            color: "white",
            padding: "1rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
        >
          <p style={{ margin: 0, fontSize: "14px" }}>{kpi.label}</p>
          <p style={{ margin: 0, fontSize: "24px", fontWeight: 600 }}>{kpi.value}</p>
        </div>
      ))}
    </div>
  );
}
