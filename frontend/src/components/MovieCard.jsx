// MovieCard.js - Individual movie card shown in grid
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/movie/${movie.id}`);

  return (
    <div className="movie-card" onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}>
      
      {/* Poster */}
      <div className="card-poster-wrap">
        <img
          src={movie.poster}
          alt={movie.title}
          className="card-poster"
          loading="lazy"
          onError={(e) => { e.target.src = "https://via.placeholder.com/300x450/111118/888?text=No+Image"; }}
        />
        {/* Hover overlay */}
        <div className="card-overlay">
          <button className="play-btn" aria-label="Play">▶</button>
        </div>
        {/* Genre badge */}
        <span className="card-genre-badge">{movie.genre[0]}</span>
      </div>

      {/* Info */}
      <div className="card-info">
        <h3 className="card-title">{movie.title}</h3>
        <div className="card-meta">
          <span className="rating">⭐ {movie.rating}</span>
          <span className="card-year">{movie.year}</span>
        </div>
      </div>
    </div>
  );
}
