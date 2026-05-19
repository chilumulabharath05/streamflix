// MovieDetailPage.js - Full movie details, trailer, and video player
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api.js";
import VideoPlayer from "../components/VideoPlayer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./MovieDetailPage.css";

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setLoading(true);
    setShowPlayer(false);
    api.getMovie(id)
      .then(setMovie)
      .catch(() => setError("Movie not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page spinner-wrap"><div className="spinner" /></div>;
  if (error || !movie) return (
    <div className="page detail-error">
      <p className="error-box">{error || "Movie not found"}</p>
      <button className="btn btn-ghost" onClick={() => navigate("/")}>← Back</button>
    </div>
  );

  const handleWatch = () => {
    if (!user) { navigate("/login"); return; }
    setShowPlayer(true);
    setTimeout(() => document.getElementById("player-section")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="page detail-page">
      {/* Backdrop */}
      <div className="detail-backdrop">
        <img src={movie.backdrop || movie.poster} alt="" />
        <div className="detail-backdrop-gradient" />
      </div>

      <div className="detail-content">
        {/* Back button */}
        <button className="btn btn-ghost back-btn" onClick={() => navigate("/")}>
          ← Home
        </button>

        <div className="detail-main">
          {/* Poster */}
          <img src={movie.poster} alt={movie.title} className="detail-poster"
            onError={(e) => { e.target.src = "https://via.placeholder.com/300x450/111118/888?text=No+Image"; }} />

          {/* Info */}
          <div className="detail-info">
            <div className="detail-genres">
              {movie.genre.map((g) => (
                <span key={g} className="hero-genre-tag">{g}</span>
              ))}
            </div>
            <h1 className="detail-title">{movie.title}</h1>
            <div className="detail-meta">
              <span className="rating">⭐ {movie.rating}</span>
              <span>{movie.year}</span>
              {movie.duration && <span>{movie.duration}</span>}
              {movie.director && <span>Dir: {movie.director}</span>}
            </div>
            <p className="detail-desc">{movie.description}</p>

            {/* Cast */}
            {movie.cast?.length > 0 && (
              <div className="detail-cast">
                <h3 className="cast-label">Cast</h3>
                <div className="cast-list">
                  {movie.cast.map((actor) => (
                    <span key={actor} className="cast-chip">{actor}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="detail-actions">
              <button className="btn btn-primary" onClick={handleWatch}>
                ▶ {user ? "Watch Now" : "Sign In to Watch"}
              </button>
            </div>

            {!user && (
              <p className="detail-login-hint">
                <button className="link-btn" onClick={() => navigate("/login")}>Sign in</button>
                {" "}or{" "}
                <button className="link-btn" onClick={() => navigate("/signup")}>create an account</button>
                {" "}to watch full movies.
              </p>
            )}
          </div>
        </div>

        {/* Video Player */}
        {showPlayer && (
          <div id="player-section" className="player-section">
            <h2 className="section-title">Now Playing</h2>
            <VideoPlayer
              src={movie.videoUrl}
              poster={movie.poster}
              title={movie.title}
            />
          </div>
        )}

        {/* Trailer */}
        {movie.trailer && (
          <div className="trailer-section">
            <h2 className="section-title">Trailer</h2>
            <div className="trailer-wrap">
              <iframe
                src={movie.trailer}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
