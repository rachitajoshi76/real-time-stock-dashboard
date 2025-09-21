// src/components/Navbar.jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setDarkMode(savedTheme === "dark");
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  return (
    <header className="navbar">
      <div className="logo" onClick={() => router.push("/dashboard")}>
        StockDash
      </div>
      <div className="nav-right">
        <button onClick={handleLogout}>Logout</button>
        {/* The theme toggle button has been removed from here */}
      </div>
    </header>
  );
}