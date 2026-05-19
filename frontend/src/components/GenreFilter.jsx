// GenreFilter.js - Genre filter pill buttons
import React from "react";
import "./GenreFilter.css";

export default function GenreFilter({ genres, selected, onSelect }) {
  return (
    <div className="genre-filter" role="group" aria-label="Filter by genre">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`genre-pill ${selected === genre ? "active" : ""}`}
          onClick={() => onSelect(genre)}
          aria-pressed={selected === genre}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
