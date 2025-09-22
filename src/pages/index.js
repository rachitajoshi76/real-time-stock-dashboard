// src/pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login on page load
    router.replace("/login");
  }, [router]);

  // Render a minimal component while redirecting
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Inter, sans-serif",
        fontSize: 16,
        color: "#333",
      }}
    >
      Redirecting to login… ⏳
    </div>
  );
}
