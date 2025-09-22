# Real-time Stock Ticker Dashboard (Next.js + SSE)

A live streaming stock dashboard with KPI cards, a data table, and interactive charts.  
Built with *Next.js* (frontend) + *Express (backend)* using *Server-Sent Events (SSE)*.

---

## 🚀 Features
- 📈 *Real-time Stock Data* via SSE (auto updates every second).  
- 🧾 *KPI Boxes* for quick insights.  
- 📋 *Stock Table* with live values.  
- 📊 *Interactive Charts* powered by chart libraries.  
- ⚡ *Single Server* (Express + Next.js combined).  

---

## 📦 Requirements
Make sure you have the following installed:

- *Node.js*: v20.17.0  
- *npm*: 10.8.2  

Check your versions with:
bash
node --version
npm --version

📦 Installation & Setup
1️⃣ Clone / Download the Project
git clone https://github.com/rachitajoshi76/real-time-stock-dashboard.git
cd real-time-stock-dashboard

2️⃣ Install Dependencies
npm install


This will install:

express (backend server)

next (frontend framework)

react and react-dom

redux-toolkit and chart libraries

3️⃣ Build the Application
npm run build

4️⃣ Run the Application
node server.js


Open your browser:
👉 http://localhost:8080

The page should show your Stock Dashboard updating every second.

✅ You do not need npm run dev or next dev because server.js already handles Next.js.

⚙️ How it Works
Backend (Express + SSE)

Express server runs at /stocks/stream.

Generates random stock updates every second.

Broadcasts updates via Server-Sent Events (SSE).

Frontend (Next.js + Redux)

Next.js pages connect to the SSE stream.

Redux store manages live stock data.

Components render:

📌 KPI Boxes

📌 Stock Table

📌 Interactive Charts

👩‍💻 Author

Rachita Joshi
📅 Submission Date: 22-06-2025
📩 Submitted to: Ansh Mishra
🎯 For the Role: Frontend Engineer

