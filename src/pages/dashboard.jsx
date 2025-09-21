import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StockTable from "../components/StockTable";
import StockChart from "../components/StockChart";
import { processUpdate, setSelectedTicker } from "../redux/stockSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const bySymbol = useSelector((state) => state.stock.bySymbol);
  const selectedTicker = useSelector((state) => state.stock.selectedTicker);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const eventSource = new EventSource("http://localhost:8080/stocks/stream");

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        dispatch(processUpdate(data));
      } catch (err) {
        console.error("SSE parse error", err);
      }
    };

    eventSource.onerror = (err) => console.error("SSE error", err);

    return () => eventSource.close();
  }, [dispatch, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const stocksArray = Object.keys(bySymbol).map((sym) => ({ symbol: sym, ...bySymbol[sym] }));

  if (!stocksArray.length)
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-blue-600">Live Stock Dashboard</h1>
        <p className="text-gray-500 mt-2">Loading…</p>
      </div>
    );

  const currentStock = selectedTicker ? bySymbol[selectedTicker] : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar logout={handleLogout} />

      {/* Header */}
      <header className="bg-blue-600 text-white text-center py-6 shadow-md">
        <h1 className="text-3xl font-bold">Live Stock Dashboard</h1>
      </header>

      <main className="flex-1 p-6 space-y-8">
        {/* Stat Cards */}
        {currentStock && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Latest Price</p>
              <p className="text-2xl font-bold text-green-600">
                {currentStock.latestPrice?.toFixed(2) || "--"}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Change</p>
              <p className={`text-2xl font-bold ${currentStock.changePercent >= 0 ? "text-green-600" : "text-red-500"}`}>
                {currentStock.changePercent?.toFixed(2) || "--"}%
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Moving Avg</p>
              <p className="text-2xl font-bold text-blue-600">
                {currentStock.movingAvg?.toFixed(2) || "--"}
              </p>
            </div>
          </div>
        )}

        {/* Table + Chart Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Company Stock Data</h2>
            <StockTable
              stocks={stocksArray}
              selectedTicker={selectedTicker}
              onSelect={(s) => dispatch(setSelectedTicker(s))}
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Stock Price Trend ({selectedTicker || "—"})
            </h2>
            <StockChart
              ticker={selectedTicker}
              entry={bySymbol[selectedTicker] || { history: [] }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
