// src/pages/login.jsx
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    let savedUsers = [];
    try {
      const users = localStorage.getItem("users");
      savedUsers = users ? JSON.parse(users) : [];
      if (!Array.isArray(savedUsers)) savedUsers = [];
    } catch {
      savedUsers = [];
    }

    const user = savedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("token", "demo-token");
      router.push("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      fontFamily: "Inter, sans-serif",
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "40px 36px",
          borderRadius: 12,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          width: 400,
          textAlign: "center",
          transition: "transform 0.2s",
        }}
      >
        <h2 style={{ marginBottom: 24, color: "#764ba2", fontWeight: 700 }}>Welcome Back</h2>

        {error && (
          <div style={{
            marginBottom: 20,
            color: "#dc2626",
            fontWeight: 500,
            background: "#ffe5e5",
            padding: "8px 12px",
            borderRadius: 6
          }}>
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: 16,
            borderRadius: 8,
            border: "1px solid #dcdde1",
            fontSize: 14,
            transition: "0.2s",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: 24,
            borderRadius: 8,
            border: "1px solid #dcdde1",
            fontSize: 14,
            transition: "0.2s",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px 0",
            background: "#764ba2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#667eea"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#764ba2"}
        >
          Login
        </button>

        <div style={{ marginTop: 20, fontSize: 14 }}>
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            style={{ color: "#667eea", cursor: "pointer", fontWeight: 500 }}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
}
