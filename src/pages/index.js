import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Connect to your SSE server
    const eventSource = new EventSource("http://localhost:8080/stocks/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStocks(data);
    };

    return () => eventSource.close();
  }, []);

  return (
    <>
      <Head>
        <title>Live Stock Prices</title>
        <meta name="description" content="Live stock prices using SSE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Live Stock Prices</h1>
          <ul>
            {stocks.map((s) => (
              <li key={s.symbol}>
                {s.symbol}: ${s.price} ({s.timestamp})
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
