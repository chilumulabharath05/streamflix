# 🎬 StreamFlix — OTT Movie Streaming App

Built with **React 18 + Vite** (frontend) and **Node.js + Express + TMDB API** (backend).
Zero vulnerabilities.

---

## 🔑 Step 1 — Get Your Free TMDB API Key

1. Create a free account at https://www.themoviedb.org
2. Go to https://www.themoviedb.org/settings/api
3. Click "Create" → Developer → fill the form
4. Copy your **API Key (v3 auth)**

---

## 🚀 Step 2 — Run Locally

### Backend (Terminal 1)

Windows:
  cd streamflix\backend
  npm install
  set TMDB_API_KEY=your_key_here
  node server.js

Mac/Linux:
  cd streamflix/backend
  npm install
  TMDB_API_KEY=your_key_here node server.js

Test at: http://localhost:5000/movies

### Frontend (Terminal 2)

  cd streamflix/frontend
  npm install
  npm run dev

Open: http://localhost:3000

---

## ☁️ Deploy — Render (backend) + Vercel (frontend)

### Render (backend)
1. Push backend/ to GitHub
2. render.com → New Web Service → connect repo
3. Build Command: npm install | Start Command: node server.js
4. Environment Variables: TMDB_API_KEY = your_key
5. Copy your Render URL

### Vercel (frontend)
1. Push frontend/ to GitHub
2. vercel.com → New Project → import
3. Framework: Vite | Root: frontend | Output: dist
4. Environment Variable: VITE_API_URL = https://your-render-url.onrender.com
5. Update frontend/src/api.js line 4:
   const BASE = import.meta.env.VITE_API_URL || ""
6. Update backend/server.js CORS:
   app.use(cors({ origin: "https://your-app.vercel.app" }))

---

## 🌐 API Endpoints

GET  /movies             - Popular movies from TMDB
GET  /movies?search=X    - Search by title
GET  /movies?genre=X     - Filter by genre
GET  /movies/featured    - Hero banner movies
GET  /movies/genres      - All genres
GET  /movies/:id         - Full details + trailer + cast
POST /auth/signup        - Register
POST /auth/login         - Login (returns JWT)

## Live
https://streamflix-beta-five.vercel.app/
