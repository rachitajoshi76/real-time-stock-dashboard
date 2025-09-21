# 📈 Real-Time Stock Dashboard

A professional **Next.js + Redux** powered dashboard that displays **real-time stock prices** using a **Node.js Server-Sent Events (SSE) backend**.  
The app allows users to sign up, log in, view live stock updates, monitor KPIs, and analyze price trends through interactive charts.

---

## 🚀 Features
- **Authentication** (Signup, Login, Logout) with localStorage persistence  
- **Real-time stock updates** via SSE from a custom backend  
- **KPI Cards** for quick insights (Latest Price, % Change, Moving Average, Timestamp)  
- **Stock Table** with all tracked companies  
- **Interactive Charts** (Recharts) for stock price history  
- **Clean UI** with responsive layout and professional styling  

---

## 🛠️ Tech Stack
### Frontend
- [Next.js](https://nextjs.org/) (React framework)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Recharts](https://recharts.org/en-US/) for data visualization
- TailwindCSS + custom CSS for styling

### Backend
- Node.js + Express
- Server-Sent Events (SSE) for live data streaming

---

## 📂 Project Structure
📦 stock-dashboard
├── backend/ # Node.js SSE server
│ └── server.js
├── frontend/ # Next.js frontend
│ ├── components/ # Reusable components (Navbar, Footer, KPIBoxes, etc.)
│ ├── pages/ # Next.js pages (login, signup, dashboard)
│ ├── redux/ # Redux slice (stockSlice.js, authSlice.js)
│ └── styles/ # Global styles
├── package.json
└── README.md

⚙️ Setup and Run Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/stock-dashboard.git
cd stock-dashboard

2️⃣ Start the Backend (SSE Server)

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Start the server:

node server.js


The backend will run at:

http://localhost:8080

3️⃣ Start the Frontend (Next.js App)

Open a new terminal and navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Run the development server:

npm run dev


Open your browser and visit:

http://localhost:3000

4️⃣ Login & Dashboard Usage

Go to /signup and create a new account.

Login with the same credentials at /login.

Access the Dashboard at /dashboard.

Stocks will update in real-time via SSE.

5️⃣ Stopping the App

To stop the backend: Press CTRL + C in the terminal running node server.js.

To stop the frontend: Press CTRL + C in the terminal running npm run dev.