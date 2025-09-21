import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processUpdate, setSelectedTicker } from "../redux/stockSlice";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StockTable from "../components/StockTable";
import StockChart from "../components/StockChart";
import TickerSelector from "../components/TickerSelector";

export default function Home() {
  const dispatch = useDispatch();
  const { bySymbol, selectedTicker } = useSelector((state) => state.stock);

  useEffect(() => {
    if (typeof window === "undefined") return;
const eventSource = new EventSource("http://localhost:8080/stocks/stream");

    eventSource.onmessage = (event) => {
      try {
        const updates = JSON.parse(event.data);
        dispatch(processUpdate(updates));
      } catch (err) {
        console.error("Failed to parse SSE data", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [dispatch]);

  const stocks = useMemo(
    () => Object.keys(bySymbol).map((s) => ({ symbol: s, ...bySymbol[s] })),
    [bySymbol]
  );

  // ✅ Loading fallback
  if (!stocks.length) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>📊 Stock Dashboard</h1>
        <p>Loading live stock data… ⏳</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="dashboard-main" style={{ padding: "2rem" }}>
        <h1 className="page-title">📊 Stock Dashboard</h1>

        <TickerSelector
          tickers={Object.keys(bySymbol)}
          selected={selectedTicker}
          onChange={(t) => dispatch(setSelectedTicker(t))}
        />

        <div
          className="dashboard-grid"
          style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}
        >
          <div className="left-col" style={{ flex: 1 }}>
            <StockTable
              stocks={stocks}
              selectedTicker={selectedTicker}
              onSelect={(s) => dispatch(setSelectedTicker(s))}
            />
          </div>

          <div className="right-col" style={{ flex: 2 }}>
            {selectedTicker && bySymbol[selectedTicker] && (
              <StockChart
                ticker={selectedTicker}
                entry={bySymbol[selectedTicker]}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
