// HeroBanner.js - Full-width hero with featured movie
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroBanner.css";

export default function HeroBanner({ movies }) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const movie = movies[current];

  // Auto-rotate every 6s
  useEffect(() => {
    if (movies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (!movie) return null;

  return (
    <div className="hero">
      {/* Backdrop image */}
      <div className="hero-backdrop">
        <img src={movie.backdrop || movie.poster} alt="" />
        <div className="hero-gradient" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-genres">
          {movie.genre.map((g) => (
            <span key={g} className="hero-genre-tag">{g}</span>
          ))}
        </div>
        <h1 className="hero-title">{movie.title}</h1>
        <div className="hero-meta">
          <span className="rating">⭐ {movie.rating}</span>
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
        </div>
        <p className="hero-desc">{movie.description.slice(0, 160)}…</p>
        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            ▶ Watch Now
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            ℹ More Info
          </button>
        </div>
      </div>

      {/* Dots */}
      {movies.length > 1 && (
        <div className="hero-dots">
          {movies.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
