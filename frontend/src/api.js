// api.js - All backend API calls in one place
// Vite proxy forwards /movies and /auth → http://localhost:5000

const BASE = ""

async function request(path, options = {}) {
  const token = localStorage.getItem("ott_token")
  const res = await fetch(BASE + path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Request failed")
  return data
}

export const api = {
  getMovies: (search = "", genre = "") =>
    request(`/movies?search=${encodeURIComponent(search)}&genre=${encodeURIComponent(genre)}`),
  getMovie:    (id)    => request(`/movies/${id}`),
  getFeatured: ()      => request("/movies/featured"),
  getGenres:   ()      => request("/movies/genres"),
  addMovie:    (movie) => request("/movies", { method: "POST", body: JSON.stringify(movie) }),
  signup: (data) => request("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
  login:  (data) => request("/auth/login",  { method: "POST", body: JSON.stringify(data) }),
}
