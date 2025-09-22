import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTicker, processUpdate } from "../redux/stockSlice";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StockTable from "../components/StockTable";
import StockChart from "../components/StockChart";
import KPIBoxes from "../components/KPIBoxes";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { bySymbol, selectedTicker } = useSelector((state) => state.stock);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [router]);

  // Seed initial dummy data
  useEffect(() => {
    if (!bySymbol || Object.keys(bySymbol).length === 0) {
      dispatch(
        processUpdate([
          { symbol: "AAPL", latestPrice: 150, changePercent: 0.5, movingAvg: 148, timestamp: new Date().toISOString() },
          { symbol: "TSLA", latestPrice: 720, changePercent: -1.2, movingAvg: 710, timestamp: new Date().toISOString() },
          { symbol: "GOOG", latestPrice: 2800, changePercent: 1.1, movingAvg: 2780, timestamp: new Date().toISOString() },
        ])
      );
    }
  }, [dispatch, bySymbol]);

  // SSE connection
  useEffect(() => {
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
      console.error("SSE error:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [dispatch]);

  const stocksArray = Object.entries(bySymbol || {}).map(([symbol, data]) => ({
    symbol,
    ...data,
  }));

  const currentStock = bySymbol[selectedTicker] || Object.values(bySymbol)[0] || null;

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeUser");
    router.push("/login");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar>
        <button
          onClick={handleLogout}
          style={{ marginLeft: "auto", padding: "8px 16px", background: "#764ba2", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          Logout
        </button>
      </Navbar>

      <header style={{ textAlign: "center", padding: "20px 0", borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>Live Stock Dashboard</h1>
      </header>

      <KPIBoxes stock={currentStock} />

      <main style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", gap: "32px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        {/* Stock Table */}
        <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", overflowX: "auto" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Company Stock Data</h2>
          <StockTable stocksData={stocksArray} selectedTicker={selectedTicker} onSelect={(s) => dispatch(setSelectedTicker(s))} />
        </div>

        {/* Stock Chart */}
        <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Stock Price Trend ({selectedTicker || "—"})</h2>
          <StockChart ticker={selectedTicker} entry={bySymbol[selectedTicker] || { history: [] }} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
