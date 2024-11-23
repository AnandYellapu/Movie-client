import React from "react";
import { Link } from "react-router-dom";


const MovieCard = ({ movie, removeFavorite }) => {
  const handleRemove = () => {
    if (removeFavorite) removeFavorite(movie.imdbID);
  };

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
        {removeFavorite ? (
          <button className="remove-btn" onClick={handleRemove}>
            Remove
          </button>
        ) : (
          <Link to={`/movie/${movie.imdbID}`} className="details-link">
            Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
