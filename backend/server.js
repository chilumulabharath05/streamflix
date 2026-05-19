// server.js - Express backend using TMDB API
const express = require("express");
const cors    = require("cors");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");

const app        = express();
const PORT       = 5000;
const JWT_SECRET = "streamflix_jwt_secret_2024";

// ── Your TMDB API Key ─────────────────────────────────────────────────────────
// Get a free key at: https://www.themoviedb.org/settings/api
const TMDB_KEY  = process.env.TMDB_API_KEY || "YOUR_TMDB_API_KEY_HERE";
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE  = "https://image.tmdb.org/t/p";

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── TMDB helper ───────────────────────────────────────────────────────────────
async function tmdb(path, params = {}) {
  const url = new URL(TMDB_BASE + path);
  url.searchParams.set("api_key", TMDB_KEY);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

// Map TMDB genre IDs to names
const GENRE_MAP = {
  28:"Action", 12:"Adventure", 16:"Animation", 35:"Comedy",
  80:"Crime", 99:"Documentary", 18:"Drama", 10751:"Family",
  14:"Fantasy", 36:"History", 27:"Horror", 10402:"Music",
  9648:"Mystery", 10749:"Romance", 878:"Sci-Fi", 10770:"TV Movie",
  53:"Thriller", 10752:"War", 37:"Western"
};

// Shape a TMDB movie into our app format
function shapeMovie(m, videos = []) {
  const trailer = videos.find(v => v.type === "Trailer" && v.site === "YouTube");
  return {
    id:          String(m.id),
    title:       m.title || m.name || "Untitled",
    genre:       (m.genre_ids || m.genres?.map(g => g.id) || [])
                   .map(id => GENRE_MAP[id] || "Other").filter(Boolean),
    rating:      m.vote_average?.toFixed(1) ?? "N/A",
    year:        m.release_date?.slice(0, 4) || "—",
    duration:    m.runtime ? `${Math.floor(m.runtime/60)}h ${m.runtime%60}m` : null,
    description: m.overview || "",
    poster:      m.poster_path   ? `${IMG_BASE}/w500${m.poster_path}`   : null,
    backdrop:    m.backdrop_path ? `${IMG_BASE}/w1280${m.backdrop_path}`: null,
    trailer:     trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
    videoUrl:    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    cast:        m.credits?.cast?.slice(0, 6).map(c => c.name) || [],
    director:    m.credits?.crew?.find(c => c.job === "Director")?.name || null,
    featured:    (m.vote_average || 0) >= 7.5 && !!m.backdrop_path,
  };
}

// ── In-memory users ───────────────────────────────────────────────────────────
const users = [];

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); }
  catch { res.status(401).json({ message: "Invalid token" }); }
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
app.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });
  if (users.find(u => u.email === email))
    return res.status(409).json({ message: "Email already registered" });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), name, email, password: hashed };
  users.push(user);
  const token = jwt.sign({ id: user.id, name, email }, JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token, user: { id: user.id, name, email } });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!await bcrypt.compare(password, user.password))
    return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, name: user.name, email }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, name: user.name, email } });
});

// ── MOVIES ────────────────────────────────────────────────────────────────────

// GET /movies/genres - must come before /movies/:id
app.get("/movies/genres", async (req, res) => {
  try {
    const data = await tmdb("/genre/movie/list");
    res.json(["All", ...data.genres.map(g => g.name)]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET /movies/featured
app.get("/movies/featured", async (req, res) => {
  try {
    const data = await tmdb("/movie/popular", { page: 1 });
    const movies = data.results
      .filter(m => m.backdrop_path && m.vote_average >= 7)
      .slice(0, 5)
      .map(m => shapeMovie(m));
    res.json(movies);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET /movies?search=X&genre=X&page=1
app.get("/movies", async (req, res) => {
  try {
    const { search, genre, page = 1 } = req.query;
    let data;
    if (search) {
      data = await tmdb("/search/movie", { query: search, page });
    } else if (genre && genre !== "All") {
      const genreList = await tmdb("/genre/movie/list");
      const found = genreList.genres.find(g => g.name === genre);
      data = found
        ? await tmdb("/discover/movie", { with_genres: found.id, sort_by: "popularity.desc", page })
        : await tmdb("/movie/popular", { page });
    } else {
      data = await tmdb("/movie/popular", { page });
    }
    res.json(data.results.filter(m => m.poster_path).map(m => shapeMovie(m)));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET /movies/:id
app.get("/movies/:id", async (req, res) => {
  try {
    const [movie, videos] = await Promise.all([
      tmdb(`/movie/${req.params.id}`, { append_to_response: "credits" }),
      tmdb(`/movie/${req.params.id}/videos`),
    ]);
    res.json(shapeMovie(movie, videos.results || []));
  } catch (e) {
    res.status(404).json({ message: "Movie not found" });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ status: "StreamFlix API running" }));

app.listen(PORT, () => {
  console.log(`\n🎬 StreamFlix backend → http://localhost:${PORT}`);
  if (TMDB_KEY === "YOUR_TMDB_API_KEY_HERE") {
    console.warn("\n⚠️  TMDB_API_KEY not set!");
    console.warn("   1. Get a free key at https://www.themoviedb.org/settings/api");
    console.warn("   2. Windows: set TMDB_API_KEY=your_key && node server.js");
    console.warn("   3. Mac/Linux: TMDB_API_KEY=your_key node server.js\n");
  }
});
