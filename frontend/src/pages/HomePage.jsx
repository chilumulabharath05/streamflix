// HomePage.js - Main landing page
import React, { useState, useEffect, useCallback } from "react";
import { api } from "../api.js";
import HeroBanner from "../components/HeroBanner.jsx";
import MovieCard from "../components/MovieCard.jsx";
import GenreFilter from "../components/GenreFilter.jsx";
import "./HomePage.css";

export default function HomePage({ searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [genres, setGenres] = useState(["All"]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch movies whenever search or genre changes
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getMovies(searchQuery || "", selectedGenre);
      setMovies(data);
    } catch (e) {
      setError("Failed to load movies. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre]);

  // Fetch genres and featured once on mount
  useEffect(() => {
    api.getGenres().then(setGenres).catch(() => {});
    api.getFeatured().then(setFeatured).catch(() => {});
  }, []);

  useEffect(() => { fetchMovies(); }, [fetchMovies]);

  const showHero = !searchQuery && selectedGenre === "All" && featured.length > 0;

  return (
    <div className="page home-page">
      {/* Hero banner (only on home, no filters active) */}
      {showHero && <HeroBanner movies={featured} />}

      <div className="home-content">
        {/* Title */}
        <h2 className="section-title">
          {searchQuery
            ? `Results for "${searchQuery}"`
            : selectedGenre !== "All"
            ? `${selectedGenre} Movies`
            : "All Movies"}
        </h2>

        {/* Genre filter */}
        <GenreFilter
          genres={genres}
          selected={selectedGenre}
          onSelect={(g) => setSelectedGenre(g)}
        />

        {/* Loading */}
        {loading && (
          <div className="spinner-wrap"><div className="spinner" /></div>
        )}

        {/* Error */}
        {error && <div className="error-box">{error}</div>}

        {/* Empty */}
        {!loading && !error && movies.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🎬</span>
            <p>No movies found. Try a different search.</p>
          </div>
        )}

        {/* Movie grid */}
        {!loading && !error && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
